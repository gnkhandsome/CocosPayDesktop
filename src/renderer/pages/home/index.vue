<template>
  <section>
    <app-header @refresh="refreshAccount"/>
    <div slot="content" class="content">
      <section class="left">
        <p>{{$t('label.assert')}}</p>
        <div class="total">¥0.00</div>
        <section id="perfect-scroll">
          <section class="coins" v-for="(item,index) in accountList" :key="index">
            <section class="coin">
              <img src="../../assets/img/cocos2.png" alt>
              <!-- <div class="img" v-else></div> -->
              <span>
                {{item[0]}}
                <span class="test-coin">({{$t('title.test')}})</span>
              </span>
            </section>
            <span class="num">{{item[1]}}</span>
          </section>
        </section>
      </section>
      <section class="right">
        <el-button
          type="primary"
          class="position refresh"
          @click="loadData"
        >{{$t('button.refresh')}}</el-button>
        <el-button
          class="position transfer"
          @click="$router.push({name:'transfer'})"
          type="primary"
        >{{$t('button.transfer')}}</el-button>
        <p>{{$t('title.history')}}</p>
        <action :tranfers="tranfers" :refresh="refresh"/>
      </section>
    </div>
  </section>
</template>
<script>
import AppHeader from "@/components/app-header";
import Action from "@/components/action";
import Navigation from "@/components/navigation";
import { mapState, mapMutations, mapActions } from "vuex";
import utils from "@/utils/utils";
import Cocos from "@/models/cocos";
import SocketService from "@/services/socketService";
import PerfectScrollbar from "perfect-scrollbar";
import { remote, ipcRenderer } from "electron";
export default {
  name: "home",
  components: {
    AppHeader,
    Action,
    Navigation
  },
  data() {
    return {
      accountKey: false,
      nameVisible: false,
      transactions: [],
      transactionsAll: [],
      total: 0,
      noResult: false,
      currentAccountPrivateKey: "",
      cocosInfo: {},
      tranfers: [],
      totalTx: [],
      endId: "",
      lastId: "",
      firstId: "",
      accountList: [],
      myInterval: null,
      refresh: false,
      coinsScroller: null
    };
  },
  computed: {
    ...mapState("account", ["balance", "assets"]),
    ...mapState("wallet", ["accounts", "pwdhash"]),
    ...mapState("trans", ["tranferList"]),
    ...mapState([
      "cocosCount",
      "lockedTime",
      "currentAccount",
      "cocos",
      "firstLanguage",
      "curLng"
    ])
  },
  watch: {
    "currentAccount"() {
      console.log("currentAccount",this.currentAccount)
      this.loadData();
    }
  },
  async mounted() {
    this.UpdateVersion().then(res => {
      if (remote.app.loadCocosDesktop) {
        this.setUpdate(res);
        ipcRenderer.send("updateCocos", false);
      }
    });
    this.loadData();
    this.nodeLists();
    if (!this.firstLanguage) {
      this.$i18n.locale =
        remote.app.localLanguage === "zh_CN" ||
        remote.app.localLanguage === "zh_TW"
          ? "ZH"
          : "EN";
      this.setCurLng(this.$i18n.locale);
    }
    this.coinsScroller = new PerfectScrollbar("#perfect-scroll", {
      minScrollbarLength: 40,
      maxScrollbarLength: 40
    });
  },
  destroyed() {
    clearInterval(this.myInterval);
  },
  methods: {
    ...mapMutations([
      "setCocosCount",
      "setIsLocked",
      "setCocos",
      "setAccountType",
      "setUpdate",
      "setCurLng",
      "setLogin"
    ]),
    ...mapMutations("trans", ["setTranferList"]),
    ...mapMutations("wallet", ["addAccount", "updateAccount", "deleteWallet","getAccounts"]),
    ...mapActions(["lockCount", "nodeLists", "UpdateVersion"]),
    ...mapActions("account", [
      "getAccountInfo",
      "queryAccountBalances",
      "OutPutKey",
      "logoutBCXAccount"
    ]),
    ...mapActions("wallet", ["getAccounts"]),
    ...mapActions("trans", ["queryTranferList"]),
    handleCurrentChange(e) {
      this.tranfers = this.totalTx[e - 1];
    },

    loadData() {
    this.totalTx = [];
    this.total = 1;
    console.info("isLocked===",this.isLocked);
    if (!this.currentAccount){
          this.setLogin(false);
          this.$router.replace({ name: "initAccount" });
          return
       }
      this.listShow();
      this.lockAccount();
      this.getAccountInfo().then(res => {
         console.info("getAccountInfo===",res);
      });
      this.getAccounts().then(res => {
         console.info("getAccounts===",res);
      });
      console.info("isLocked===",this.isLocked);
    },

    listShow() {
        this.transferList();
        clearInterval(this.myInterval);
        this.myInterval = setInterval(() => {
          this.transferList();
        }, 20000);

        this.queryBalance();
        clearInterval(this.accountBalancesInterval);
        this.accountBalancesInterval = setInterval(() => {
        this.queryBalance();
       }, 1000);
     
    },

    prevPage(e) {
      this.tranfers = this.totalTx[e + 1];
    },
    nextPage(e) {
      this.tranfers = this.totalTx[e - 1];
    },
    lockAccount() {
      clearTimeout(pageTimer);
      const time = this.lockedTime ? this.lockedTime : 30;
      pageTimer = setTimeout(async () => {
        await this.lockCount();
      }, time * 60000);
    },
    transferList() {
      this.setTranferList({
        limit: 50,
        startId: "1.11.0",
        endId: "1.11.0"
      });
      this.queryTranferList().then(res => {
        this.tranfers = res;
        return;
      });
    },
    closedAccountDialog() {
      this.accountKey = false;
    },
    copyError() {
      this.$kalert({
        message: this.$i18n.t("alert.copyFail")
      });
    },

    queryBalance(){
        this.queryAccountBalances().then(res => {
              console.info("listShow res",res);
              this.accountList = Object.entries(res.data);
              if (res.code === 1) {
              clearInterval(this.accountBalancesInterval);
              this.setCocosCount(res.data.COCOS);
              }
          });
    },

    async refreshAccount() {
      SocketService.initialize();
      this.refresh = true;
      this.loadData();
      if (!this.cocos) {
        const cocos = Cocos.placeholder();
        this.setCocos(cocos);
      } else if (!(this.cocos instanceof Cocos)) {
        let sfj = JSON.parse(JSON.stringify(this.cocos));
        const cocos = Cocos.fromJson(sfj);
        this.setCocos(cocos);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../theme/v1/variable";
@import "../../styles/home.scss";
</style>
