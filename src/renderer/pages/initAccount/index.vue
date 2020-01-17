<template>
  <section id="init">
    <header>
      <img src="../../assets/img/logo.png" @click="logoutBCXAccount" alt />
    </header>
    <section class="des-center" @click="logoutBCXAccount()">{{$t('title.title')}}</section>
    <section class="introduction">{{$t('message.intro')}}</section>
    <section class="app-container text-center">
      <el-button type="primary" @click="RegisterAccount">{{$t('button.createAccount')}}</el-button>
      <el-button type="primary" @click="importAccount">{{$t('button.importAccount')}}</el-button>
    </section>
  </section>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { remote, ipcRenderer } from "electron";
  import Storage from "./../../utils/storage.js";

export default {
  data() {
    return {
      currentCreateVisible: false,
      lang: "",
      lockTime: "",
      langs: [
        { name: "简体中文", value: "ZH" },
        { name: "English", value: "EN" }
      ]
    };
  },
  computed: {
    ...mapState("common", ["registerWallet"]),
    ...mapState([ "firstLanguage", "curLng","currentAccount","isLocked"]),
    ...mapMutations([
      "setIsLocked",
    ]),
  },
  created() {
    //todo 链接节点：如果无当前选中节点则默认链接主节点
    this.jumpHome();
    this.nodeLists().then(res => {
      if (!Array.isArray(res)) return;
      var initNode = Storage.get("choose_node");
      if(initNode){
        initNode.connect = true;
      }else {
        initNode = res[0];
        initNode.connect = true;
      }
      this.apiConfig(initNode).then(() => {
        this.init({
                    real_sub:true,
                    subscribeToRpcConnectionStatusCallback:res=>{
                        console.info("subscribeToRpcConnectionStatusCallback res",res);
                    }
                }).then(res => {
                     console.info("init res",res);
                });
        });
      });
  },
  mounted() {
    console.log(this.firstLanguage);
    console.log(this.curLng);

    if (!this.firstLanguage) {
      this.$i18n.locale =
        remote.app.localLanguage === "zh_CN" ||
        remote.app.localLanguage === "zh_TW"
          ? "ZH"
          : "EN";
      this.setCurLng(this.$i18n.locale);
      this.lang = this.$i18n.locale;
    } else {
      this.lang = this.curLng;
    }
    this.UpdateVersion().then(res => {
      if (remote.app.loadCocosDesktop) {
        this.setUpdate(res);
        ipcRenderer.send("updateCocos", false);
      }
    });
  },
  methods: {
    ...mapMutations([
      "setAccountType",
      "setLogin",
      "setCurLng",
      "setUpdate",
      "setFirstLanguage"
    ]),

    ...mapActions("wallet", ["getAccounts"]),
    ...mapActions([
      "nodeLists",
      "apiConfig",
      "switchAPINode",
      "init",
      "UpdateVersion",
      "IndexedDBQuery"
    ]),
    ...mapActions("account", ["logoutBCXAccount"]),
    ...mapMutations("common", [
      "WalletRegister",
      "AccountLogin"
    ]),
    changeLanguage(e) {
      this.setFirstLanguage(true);
      this.$i18n.locale = this.lang;
      this.setCurLng(this.lang);
    },
    RegisterAccount() {
      this.WalletRegister(true);
    },
    importAccount() {
      this.AccountLogin(true);
    },
    jumpHome(){
      if (!this.currentAccount){
            return
         }
         if (this.isLocked) {
            this.$router.replace({ name: "unlock" });
            return
         }
        this.setIsLocked(false)
        this.setLogin(true);
        this.$router.replace({ name: "home" });
    }
  }
};

</script>
<style lang="scss" scoped>
@import "../../theme/v1/variable";
#init {
  header {
    position: relative;
    height: 216px;
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(
      90deg,
      rgba(48, 191, 253, 1) 0%,
      rgba(58, 123, 255, 1) 100%
    );
    span {
      font-size: 20px;
      padding-left: 10px;
    }
    img {
      // height: 125px;
      width: 134px;
    }
    .select-lang {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 60px !important;
      .language-select {
        background: none !important;
        width: 120px !important;
        .el-input__inner {
          background: none !important;
          border-bottom: none !important;
        }
        input {
          text-align: center !important;
          background-color: transparent !important;
        }
      }
    }
  }
}

.privateKey-area {
  background-color: $bg-shallow;
  font-size: 12px;
  border-radius: 8px;
  padding: 10px;
  margin: 10px 0;
}
.des-center {
  margin-top: 110px;
  width: 100%;
  text-align: center;
  font-size: 26px;
  font-weight: 500;
  color: rgba(45, 45, 48, 1);
  line-height: 37px;
}
.introduction {
  margin: 20px 12% 0;
  font-size: 16px;
  color: rgba(96, 97, 101, 1);
  line-height: 24px;
}
button {
  height: 56px;
  width: 210px;
  font-size: 20px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  margin: 10% 5% 0;
}
</style>
