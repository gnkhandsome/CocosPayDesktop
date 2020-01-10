import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import defaultNetworks from '../config/networks'
import account from './modules/account'
import wallet from './modules/wallet'
import trans from './modules/trans'
import common from './modules/common'
import mutations from './mutations'
import actions from './actions'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    wallet,
    account,
    trans,
    common
  },
  state: {
    cocos: null,
    popups: [],
    loading: false,
    curLng: 'ZH',
    currentNetwork: {
      id: 1,
      name: 'TestNet',
      type: 'TestNet'
    },
    accountType: '',
    networks: defaultNetworks.networks,
    currentAccount: '',
    privateKeys: '',
    temporaryKeys: '',
    currentCreateAccount: {
      address: '',
      name: '',
      privateKey: ''
    },
    Password: {
      oldPassword: '',
      newPassword: ''
    },
    currentCreateVisible: false,
    isLogin: false,
    isAccount: false,
    cocosCount: '',
    LoginCountStore: '',
    isLocked: false,
    isImportKeys: false,
    lockedTime: null,
    changeRadio: true,
    sha: '',
    dialog: '',
    whiteList: [],
    contractWhiteList: [],
    loginNoAlert: false,
    accountAdd: false,
    update: false,
    updateMessage: {},
    firstLanguage: false
  },
  mutations,
  actions,
  plugins: [createPersistedState()]
})