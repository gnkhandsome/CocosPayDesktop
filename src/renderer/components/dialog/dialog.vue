<template>
  <div class="dialogs">
    <el-dialog
      center
      :title="$t('title.createAccount')"
      :visible.sync="Register"
      width="700px"
      :close-on-click-modal="false"
      @close="WalletRegister"
      v-if="Register">
      <Create/>
    </el-dialog>
    <el-dialog
      center
      :title="$t('title.storeKey')"
      :visible.sync="storeKey"
      :close-on-click-modal="false"
      width="700px"
      @close="privateStore"
      v-if="storeKey">
      <BackupKey/>
    </el-dialog>
    <el-dialog
      center
      :title="$t('title.login')"
      :visible.sync="accountLogins"
      width="700px"
      :close-on-click-modal="false"
      @close="AccountLogin"
      v-if="accountLogins">
      <Login/>
    </el-dialog>
    <el-dialog
      center
      :title="$t('title.update')"
      :visible.sync="updates"
      width="550px"
      :close-on-press-escape="false"
      :show-close="false"
      :close-on-click-modal="false"
      @close="setUpdate"
      v-if="updates">
      <Update/>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Create from "@/pages/createAccount";
import BackupKey from "@/pages/backupKey";
import Login from "@/pages/login";
import Update from "./update";
export default {
  name: "Dialogs",
  components: {
    Create,
    BackupKey,
    Login,
    Update
  },
  computed: {
    ...mapState(["update"]),
    ...mapState("common", ["registerWallet", "storePrivate", "accounLogin"]),
    Register: {
      get() {
        console.info("registerWallet",this.registerWallet);
        return this.registerWallet;
      },
      set() {}
    },
    storeKey: {
      get() {
        console.info("storePrivate",this.storePrivate);
        return this.storePrivate;
      },
      set() {}
    },
    accountLogins: {
      get() {
        console.info("accountLogins",this.accounLogin);
        return this.accounLogin;
      },
      set() {}
    },
    updates: {
      get() {
        return this.update;
      },
      set() {}
    }
  },
  methods: {
    ...mapMutations("common", [
      "WalletRegister",
      "privateStore",
      "AccountLogin"
    ]),
    ...mapMutations(["setUpdate"])
  }
};
</script>

<style lang="scss" scoped>
.logins {
  width: 200%;
}
</style>
