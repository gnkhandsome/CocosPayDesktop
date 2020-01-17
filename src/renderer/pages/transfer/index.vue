<template>
  <section>
    <app-header @refresh="refresh"/>
    <navigation/>
    <section class="tranfer-contain">
      <p>{{$t('button.transfer')}}</p>
      <el-form ref="form" :model="formData" :rules="formRules" label-position="top">
        <section class="count">
          <el-form-item :label="$t('label.ownerAccount')" prop="from">
            <el-input class="no-border" v-model="formData.from" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item :label="$t('label.toAddress')" prop="to">
            <el-input class="no-border" :placeholder="$t('label.toAddress')" v-model="formData.to"></el-input>
          </el-form-item>
        </section>
        <section class="count">
          <el-form-item :label="$t('label.amount')" prop="amount">
            <el-input class="no-border" v-model="formData.amount" type="text"></el-input>
          </el-form-item>
          <el-form-item :label="$t('label.coin') + $t('title.test1')" prop="coin">
            <el-select v-model="coin" @change="changeCoin">
              <el-option
                v-for="item in coins"
                :key="item.coin"
                :label="item.coin"
                :value="item.coin"
              ></el-option>
            </el-select>
          </el-form-item>
        </section>
        <el-form-item :label="$t('label.memo')" prop="memo">
          <el-input class="no-border" v-model="formData.memo" type="text"></el-input>
        </el-form-item>
        <!-- <label class="label">{{$t('label.charge')}}</label> -->
        <!-- <div class="num">
          {{fee}} COCOS
          <span class="test-coin">({{$t('title.test')}})</span>
        </div>-->
        <el-form-item class="btns">
          <el-button type="primary" @click="onSubmit('form')">{{$t('button.send')}}</el-button>
          <el-button class="ml40" @click="$router.go(-1)">{{$t('button.cancel')}}</el-button>
        </el-form-item>
      </el-form>
    </section>
    <el-dialog
      center
      :title="$t('title.sendDetail')"
      :visible.sync="popup"
      width="700px"
      :close-on-click-modal="false"
      @close="popup = false"
      v-if="popup"
    >
      <transfer
        @cancelDialog="cancelDialog"
        :currentAccount="this.currentAccount"
        :coin="coin"
        :formData="formData"
      />
    </el-dialog>
  </section>
</template>
<script>
import AppHeader from "@/components/app-header";
import Navigation from "@/components/navigation";
import Transfer from "./dialog";
import { mapState, mapMutations, mapActions } from "vuex";
import { setTimeout } from "timers";
export default {
  components: {
    Navigation,
    AppHeader,
    Transfer
  },
  data() {
    const toValidator = (rule, value, callback) => {
      if (value === "") {
        this.$kalert({
          message: this.$i18n.t("verify.toAddressNull")
        });
        callback(new Error());
      } else if (value === this.currentAccount) {
        this.$kalert({
          message: this.$i18n.t("message.ownerError")
        });
        callback(new Error());
      } else {
        callback();
      }
    };

    const amountValidator = (rule, value, callback) => {
      if (value < 0) {
        this.$kalert({
          message: this.$i18n.t("verify.noZero")
        });
        callback(new Error());
      } else if (!/^(-?\d+)(\.\d+)?$/.test(value)) {
        this.$kalert({
          message: this.$i18n.t("verify.number")
        });
        callback(new Error());
      } else if (
        value.toString().split(".")[1] &&
        value.toString().split(".")[1].length > this.precision
      ) {
        this.$kalert({
          message: this.$i18n.t("verify.minimum") + this.precision
        });
        callback(new Error());
        // callback(new Error(this.$i18n.t("verify.numberGtZero")));
      } else if (parseFloat(value) >= 100000000) {
        this.$kalert({
          message: this.$i18n.t("verify.max")
        });
        callback(new Error());
        // callback(new Error(this.$i18n.t("verify.numberGtZero")));
      } else {
        callback();
      }
    };
    return {
      popup: false,
      coin: "COCOS",
      precision: 5,
      formData: {
        from: "",
        to: "",
        // token: "",
        amount: 0,
        memo: ""
      },
      formRules: {
        // from: { validator: frommValidator, trigger: "blur" },
        to: { validator: toValidator, trigger: "blur" },
        // token: { validator: tokenValidator, trigger: "blur" },
        amount: { validator: amountValidator, trigger: "blur" }
      },
      tokens: [],
      assetKey: this.$route.params.assetKey ? this.$route.params.assetKey : "",
      coins: [],
    };
  },
  computed: {
    ...mapState(["currentAccount", "cocosCount", "accountType"]),
    ...mapState("wallet", ["accounts"]),
    ...mapState("trans", ["tranferInfo"]),
    payName() {
      let account = this.accounts.find(
        ele => ele.address === this.formData.from
      );
      if (account) {
        return account.name;
      } else {
        return "";
      }
    }
  },
  mounted() {
    this.loading();
    // if (this.accountType === "wallet") {
    //   this.OutPutKey().then(key => {
    //     if (
    //       !key.data.active_private_keys ||
    //       !key.data.active_private_keys.length
    //     ) {
    //       this.owner = true;
    //     }
    //   });
    // }
    // this.loadTokens()
  },
  methods: {
    ...mapMutations("trans", ["setTranferInfo"]),
    ...mapActions("trans", [
      "tranferBCX",
      "queryAsset",
    ]),
    ...mapActions("account", ["queryAccountBalances", "OutPutKey"]),
    async changeCoin() {
      await this.queryAsset({ assetId: this.coin }).then(res => {
        this.precision = res.precision;
      });
    },
    refresh() {
      this.loading();
    },
    async loading() {
      this.formData.from = this.currentAccount;
      await this.queryAccountBalances().then(res => {
        if (res.code === 1) {
          if (Array.isArray(res.data)) {
            this.coins = res.data;
          } else {
            this.coins = [];
            for (let [key, value] of Object.entries(res.data)) {
              console.log("key："+key+"value: "+value);
              if (key != "GAS") {
                this.coins.push({
                coin: key,
                amount: value
               });
              }
            }
          }
        }
      });
      this.changeCoin();
    },
    onSubmit(formName) {
      console.info("submit transfer info");
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.info("setTranferInfo");
          this.setTranferInfo({
            toAccount: this.formData.to,
            coin: this.coin,
            amount: this.formData.amount,
            memo: this.formData.memo
          });
        this.popup = true;
        }
      });
    },
    cancelDialog() {
      this.popup = false;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../theme/v1/variable";
@import "../../components/dialog/index.scss";
.tranfer-contain {
  padding: 20px 34px;

  p {
    font-size: 22px;
    font-weight: 500;
    color: rgba(45, 45, 48, 1);
    line-height: 30px;
  }
  .count {
    justify-content: space-between;
    display: flex;
    .el-form-item {
      width: 50% !important;
      &:nth-of-type(2) {
        margin-left: 8%;
      }
    }
    &.one {
      .el-form-item {
        width: 46% !important;
      }
    }
  }
  .label {
    color: #606266;
    font-size: 14px;
  }
  .num {
    margin-top: 14px;
    font-size: 18px;
    font-weight: 500;
    color: rgba(45, 45, 48, 1);
    line-height: 25px;
  }
  .btns {
    margin-top: 16px;
    button {
      width: 210px !important;
    }
  }
}
</style>
