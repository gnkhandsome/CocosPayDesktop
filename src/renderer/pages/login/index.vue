<template>
  <section class="app-container">
    <section class="type" @click="$router.push({name:'initAccount'})">{{$t('label.login')}}</section>
    <section class="radio-groups">
      <el-radio-group v-model="radio" @change="changeType()">
        <el-radio :label="'wallet'">{{$t('title.walletType')}}</el-radio>
        <el-radio v-if="!accountAdd" :label="'account'">{{$t('title.accountType')}}</el-radio>
        <el-radio
          v-if="!accountAdd"
          :label="'file'"
        >{{$t('label.keyFile')}}({{$t('title.walletType')}})</el-radio>
      </el-radio-group>
    </section>
    <el-form
      ref="form"
      :model="formData"
      :rules="formRules"
      class="mt40"
      :validate-on-rule-change="false"
      v-if="radio === 'account'"
    >
      <el-form-item prop="account">
        <section class="type">{{$t('label.account')}}</section>
        <el-input
          class="no-border"
          v-model="formData.account"
          type="text"
          @focus="setChangeRadio(false)"
          :placeholder="$t('verify.accountType')"
        ></el-input>
        <input type="text" value style="display: none;">
      </el-form-item>
      <el-form-item prop="password">
        <section class="type">{{$t('label.password')}}</section>
        <el-input
          class="no-border"
          v-model="formData.password"
          type="password"
          @focus="setChangeRadio(false)"
          :placeholder="$t('verify.passwordType')"
        ></el-input>
        <input type="text" value style="display: none;">
      </el-form-item>
      <el-checkbox
        class="remember"
        v-model="remember"
        @change="rememberCount"
      >{{$t('label.remember')}}</el-checkbox>
      <el-form-item class="mt40">
        <el-button
          class="full-btn"
          type="primary"
          @click="LoginAccount('form')"
        >{{$t('title.login')}}</el-button>
      </el-form-item>
    </el-form>
    <el-form
      ref="formwallet"
      :model="formDataWallet"
      :rules="WalletRules"
      :validate-on-rule-change="false"
      class="mt40"
      v-if="radio === 'wallet'"
    >
      <el-form-item prop="account">
        <section class="type">{{$t('title.privateKey')}}</section>
        <el-input
          class="no-border"
          v-model="formDataWallet.keys"
          @focus="setChangeRadio(false)"
          type="text"
          :placeholder="$t('placeholder.privateKey')"
        ></el-input>
        <input type="text" value style="display: none;">
      </el-form-item>
      <el-form-item prop="password">
        <section class="type">{{$t('title.tempassword')}}</section>
        <el-input
          class="no-border"
          v-model="formDataWallet.password"
          @focus="setChangeRadio(false)"
          type="password"
          :placeholder="$t('placeholder.temporary')"
        ></el-input>
        <input type="text" value style="display: none;">
      </el-form-item>
      <el-form-item class="mt80">
        <el-button
          class="full-btn"
          type="primary"
          @click="LoginAccount('formwallet')"
        >{{$t('title.login')}}</el-button>
      </el-form-item>
    </el-form>
    <el-form v-if="radio === 'file'" class="keyfile">
      <el-form-item class="upload">
        <section class="type">{{$t('label.keyFile')}}(.bin)</section>
        <section class="box">
          <div>{{file ? file.name : $t('label.restoreKeyFile')}}</div>
          <input type="file" class="file" @change="fileUpload" name id>
          <img src="../../assets/img/cloud.png" alt>
        </section>
      </el-form-item>
      <el-form-item>
        <el-input
          class="no-border"
          v-model="keyfile_password"
          type="password"
          :placeholder="$t('placeholder.temporary')"
        ></el-input>
      </el-form-item>
      <el-form-item class="full-btn file">
        <el-button class="full-btn" type="primary" @click="fileLogin">{{$t('title.login')}}</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>
<script>
import Navigation from "@/components/navigation";
import { mapState, mapActions, mapMutations } from "vuex";
import SocketService from "../../services/socketService";
import Cocos from "../../models/cocos";
import CommonJs from "../../config/common";
import I18n from "../../languages";
export default {
  components: {
    Navigation
  },
  data() {
    const accountPass = (rule, value, callback) => {
      if (value === "") {
        this.$kalert({
          message: this.$i18n.t("verify.accountNull")
        });
        callback(new Error());
      } else {
        this.setChangeRadio(true);
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        this.$kalert({
          message: this.$i18n.t("verify.passwordNull")
        });
        callback(new Error());
      } else {
        callback();
      }
    };

    const keysPass = (rule, value, callback) => {
      if (value === "") {
        this.$kalert({
          message: this.$i18n.t("verify.keysNull")
        });
        callback(new Error());
      } else {
        this.setChangeRadio(true);
        callback();
      }
    };

    return {
      formData: {
        account: "",
        password: ""
      },
      formDataWallet: {
        keys: "",
        password: ""
      },
      radio: "wallet",
      remember: false,
      formRules: {
        account: [{ validator: accountPass, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }]
      },
      WalletRules: {
        keys: [{ validator: keysPass, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }]
      },
      keyfile_password: "",
      file: ""
    };
  },
  computed: {
    ...mapState("wallet", ["accounts", "pwdhash", "password"]),
    ...mapState([
      "LoginCountStore",
      "cocos",
      "accountType",
      "changeRadio",
      "accountAdd"
    ])
  },
  mounted() {
    this.setChangeRadio(true);
    if (this.LoginCountStore) {
      this.formData.account = this.LoginCountStore;
      this.remember = true;
    }
  },
  destroyed() {
    this.setAccountAdd(false);
  },
  methods: {
    ...mapMutations([
      "setAccountType",
      "setCurrentAccount",
      "setLogin",
      "setLoginCountStore",
      "setIsImportKeys",
      "setSha",
      "setChangeRadio",
      "setIsLocked",
      "setAccountAdd"
    ]),
    ...mapMutations("common", [
      "privateStore",
      "AccountLogin"
    ]),
    ...mapActions("account", [
      "passwordLogin",
      "logoutBCXAccount",
      "unlockAccount"
    ]),
    ...mapActions("wallet", [
      "importPrivateKey",
      "LoadWalletFile",
      "createAccountWithPassword",
      "RestoreWallet",
      "setSeed",
      "setPassword"
    ]),
    ...mapActions(["IndexedDBAdd"]),
    rememberCount() {
      this.setLoginCountStore(this.remember ? this.formData.account : "");
    },
    connectSocket() {
      SocketService.initialize();
      if (!this.cocos) {
        const cocos = Cocos.placeholder();
        this.setCocos(cocos);
      } else if (!(this.cocos instanceof Cocos)) {
        let sfj = JSON.parse(JSON.stringify(this.cocos));
        const cocos = Cocos.fromJson(sfj);
        this.setCocos(cocos);
      }
    },
    changeType() {
      this.setChangeRadio(true);
    },
    fileUpload(e) {
      let file = e.target.files[0].name;
      if (!/.bin$/.test(file)) {
        this.$kalert({
          message: CommonJs.getI18nMessages(I18n).label.uploadKeyFile
        });
        return;
      }
      this.file = e.target.files[0];
    },
    fileLogin() {
      if (!this.keyfile_password) {
        this.$kalert({
          message: CommonJs.getI18nMessages(I18n).placeholder.password
        });
        return;
      }
      if (this.file) {
        this.LoadWalletFile({ file: this.file }).then(res => {
          if (res.code === 1) {
            this.setSha(res.data.sha1);
            this.RestoreWallet({
               password:this.keyfile_password,
            }).then(result => {
              if (result.code === 1) {
                this.unlockAccount({
                   password:this.keyfile_password,
                }).then(unlock => {
                  if (unlock.code === 1) {
                    this.setLogin(true);
                    this.AccountLogin(false);
                    this.setIsLocked(false);
                    this.setCurrentAccount(result.data.account_name);
                    this.setAccountType(result.data.mode);
                    this.$router.push({ name: "home" });
                  }
                });
              }
            });
          }
        });
      } else {
        this.$kalert({
          message: CommonJs.getI18nMessages(I18n).label.uploadKeyFile
        });
      }
    },

    LoginAccount(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.radio === "account") {
           this.passwordLogin({
            account: this.formData.account,
            password: this.formData.password
            }).then(res => {
                console.info("passwordLogin",res);
                if(res.code == 1){
                this.setLogin(true);
                this.setIsLocked(false);
                this.setCurrentAccount(res.data.account_name);
                this.setAccountType(res.data.mode);
                this.AccountLogin(false);
                this.$router.push({ name: "home" });
                }else{

                }
            });
            return
          }
          if (this.formDataWallet.keys.length < 50) {
            this.$kalert({
              message: this.$i18n.t("alert.illegalPrivateKey")
            });
            return;
          }
          console.log("privateKey",this.formDataWallet.keys)
          console.log("password",this.formDataWallet.password)
          this.importPrivateKey({
            privateKey: this.formDataWallet.keys,
            password: this.formDataWallet.password
          }).then(res => {
             console.info("importPrivateKey",res);
            if (res.code === 1) {
                this.setLogin(true);
                this.setIsLocked(false);
                this.setCurrentAccount(res.data.account_name);
                this.setAccountType(res.data.mode);
                this.AccountLogin(false);
                this.$router.push({ name: "home" });
            }else{

            }
            this.connectSocket()
          });
        }
      });
    },
  }
};
</script>
<style lang="scss" scoped>
.welcome-title {
  text-align: center;
  font-size: 30px;
}
.el-input {
  margin-top: 14px !important;
}
.type {
  font-size: 16px;
  color: rgba(96, 97, 101, 1);
  line-height: 22px;
  margin-top: 14px;
}
.radio-groups {
  margin-top: 16px;
}

.upload {
  margin-top: 40px;
}

.keyfile {
  // height: 360px;
  position: relative;
}

.box {
  width: 620px;
  height: 45px;
  background: rgba(241, 244, 247, 1);
  border-radius: 6px;
  margin-top: 14px;
  position: relative;
  div {
    font-size: 16px;
    color: #606266;
    position: absolute;
    top: 4px;
    left: 15px;
  }
  input.file {
    position: absolute;
    right: 15px;
    top: 10px;
    opacity: 0;
    height: 30px;
    width: 30px;
    z-index: 10;
  }
  img {
    position: absolute;
    right: 15px;
    top: 13px;
    height: 30px;
    width: 30px;
    z-index: 2;
  }
}

// .remember {
//   margin: 4px 0;
// }

.full-btn.file {
  margin-top: 112px;
}
</style>
