<template>
  <div class="unlock">
    <app-header/>
    <section>
      <img src="../../assets/img/128px.png" alt>
      <p>{{$t('title.welcome')}}</p>
      <div class="input-box">
        <el-input
          clear="no-margin"
          v-model="unlock"
          type="password"
          @keyup.enter.native="unlockWallet"
          :placeholder="$t('placeholder.password')"
        ></el-input>
        <i @click="unlockWallet" class="right-arrow"></i>
      </div>
    </section>
  </div>
</template>
<script>
import AppHeader from "@/components/app-header";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      unlock: "",
    };
  },
  components: {
    AppHeader
  },
  computed: {
  },
  name: "unlock",
  methods: {
    ...mapActions("wallet", ["getAccounts"]),
    ...mapActions("account", ["unlockAccount"]),
    unlockWallet() {
      if (!this.unlock) {
        this.$kalert({
          message: this.$i18n.t("placeholder.password")
        });
        return;
      }
      this.unlockAccount({
          password:this.unlock,
      }).then(res => {
        console.info("unlockAccount res",res);
        if (res.code === 1) {
          this.$router.push({ name: "home" });
        } else {

        }
      });
    },
  },

};
</script>
<style lang="scss" scoped>
@import "../../styles/unlock.scss";
</style>
