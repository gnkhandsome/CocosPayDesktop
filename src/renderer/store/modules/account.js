import {
  GetBCXWithState
} from '../../utils/bcx'
import Alert from '../../components/kalert/function'
import I18n from '../../languages'
import CommonJs from '../../config/common'
import router from '../../router'

let NewBCX = GetBCXWithState()
export default {
  namespaced: true,
  state: {
    name: '',
    address: '',
    privateKey: '',
    keystore: '',
    balance: 0,
    cpu: 0,
    bandWidth: 0,
    cocosPower: 0,
    frozenExpires: 0,
    assets: []
  },
  actions: {
    // 退出登陆
    async logoutBCXAccount({
      commit
    }) {
      try {
        let resData
        await NewBCX.logout().then((res) => {
          commit('loading', false, {
            root: true
          })
          commit('setCurrentAccount', '', {
            root: true
          })
          commit('setIsLocked', false, {
            root: true
          })
          commit('setAccountType', '', {
            root: true
          })
          commit('setLogin', false, {
            root: true
          })
          resData = res
        })
        return resData
      } catch (e) {
        return e
      }
    },
    // 修改密码
    async changePassword({
      commit,
      state,
      rootState
    },params) {
      try {
        let resData
        commit('loading', true, {
          root: true
        })
        await NewBCX.changePassword(params).then((res) => {
          commit('loading', false, {
            root: true
          })
          commit('setIsAccount', false, {
            root: true
          })
          resData = res
          if (res.code !== 1) {
            Alert({
              message: CommonJs.getI18nMessages(I18n).error[res.code]
            })
          }
        })
        return resData
      } catch (e) {
        return e
      }
    },
    // 私钥登录
    async setPrivateKeys({
      commit,
      state,
      rootState
    }) {
      commit('loading', true, {
        root: true
      })
      try {
        let resData
        await NewBCX.privateKeyLogin({
          privateKey: rootState.privateKeys,
          password: rootState.temporaryKeys
        }).then((res) => {
          commit('loading', false, {
            root: true
          })
          if (res.code !== 1) {
            Alert({
              message: CommonJs.getI18nMessages(I18n).error[res.code]
            })
          }
          resData = res
        })
        return resData
      } catch (e) {
        return e
      }
    },

    async unlockAccount({
      commit,
      state,
      rootState
    },params) {
      commit('loading', true, {
        root: true
      })
      try {
        let resData
        await NewBCX.unlockAccount(params).then((res) => {
          commit('loading', false, {
            root: true
          })
          commit('setIsLocked', false, {
            root: true
          })
          resData = res
        })
        return resData
      } catch (e) {
        return e
      }
    },

    // 登陆账户
    async passwordLogin({
      commit,
      state,
      rootState
    },params) {
      commit('loading', true, {
        root: true
      })
      try {
        let resData
        await NewBCX.passwordLogin(params).then((res) => {
          commit('loading', false, {
            root: true
          })
          resData = res
        })
        return resData
      } catch (e) {
        return e
      }
    },
    // 查询账户状态
    async getAccountInfo({
      commit
    }) {
      commit('loading', true, {
        root: true
      })
      try {
        let data = await NewBCX.getAccountInfo()
        commit('loading', false, {
          root: true
        })
        return data
      } catch (e) {
        return e
      }
    },
    
    async importPrivateKey({
      commit,
      state,
      rootState
    },params) {
      commit('loading', true, {
        root: true
      })
      try {
        let resData
        await NewBCX.importPrivateKey(params).then(res => {
          commit('loading', false, {
            root: true
          })
          if (res.code !== 1) {
            Alert({
              message: CommonJs.getI18nMessages(I18n).error[
                res.code
              ]
            })
          }
          resData = res
        })
        return resData
      } catch (e) {
        return e
      }
    },
    // 查询账户信息
    async UserMessage({
      commit,
      state,
      rootState
    }) {
      let resData
      commit('loading', true, {
        root: true
      })
      try {
        await NewBCX.queryAccountInfo({
          account: rootState.currentAccount
        }).then(res => {
          commit('loading', false, {
            root: true
          })
          if (res.code !== 1) {
            Alert({
              message: CommonJs.getI18nMessages(I18n).error[res.code]
            })
          }
          resData = res
        })
        return resData
      } catch (e) {
        return e
      }
    },
    // 查询账户资产
    async queryAccountBalances({
      commit,
      state,
      rootState
    }) {
      let resData
      commit('loading', true, {
        root: true
      })
      try {
        await NewBCX.queryAccountBalances({
          unit: '',
          account: rootState.currentAccount
        }).then(res => {
          console.info("queryAccountBalances res",res);
          commit('loading', false, {
            root: true
          })
          commit('setCocosCount', res.data.COCOS, {
            root: true
          })
          if (res.code !== 1) {
            Alert({
              message: CommonJs.getI18nMessages(I18n).error[res.code]
            })
          }
          resData = res
        })
        return resData
      } catch (e) {
        return e
      }
    },
    // 导出私钥
    async OutPutKey({
      commit,
      state,
      rootState
    }) {
      let resData
      try {
        await NewBCX.getPrivateKey().then(res => {
          commit('loading', false, {
            root: true
          })
          if (res.code !== 1) {
            Alert({
              message: CommonJs.getI18nMessages(I18n).error[res.code]
            })
          }
          resData = res
        })
        return resData
      } catch (e) {
        return e
      }
    }
  }
}