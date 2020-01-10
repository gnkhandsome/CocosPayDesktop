import utils from '../../utils/utils'
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
    password: '',
    pwdhash: '',
    accountNo: 1,
    lockTime: 60 * 30, // 30 minute will autolock
    accounts: [],
    whiteList: [],
    prompt: null
  },

  mutations: {
    initAccount(state, account) {
      state.accounts = [account]
    },
    setPassword(state, password) {
      state.pwdhash = utils.hashPassword(password)
      state.password = ''
    },
    setLockTime(state, time) {
      state.lockTime = time
    },
    addAccount(state, account) {
      state.accounts = [...state.accounts, account]
      state.accountNo++
    },
    updateAccount(state, account) {
      state.accounts = state.accounts.map(ele => {
        if (account.address === ele.address) {
          ele = account
        }
        return ele
      })
    },
    addWhiteList(state, white) {
      state.whiteList = [...state.whiteList, white]
    },
    removeWhiteList(state, white) {
      state.whiteList = state.whiteList.filter(ele => {
        return ele.id !== white.id
      })
    },
    removeAccount(state, account) {
      state.accounts = state.accounts.filter(ele => {
        return ele.address !== account.address
      })
    },
    pushPrompt(state, prompt) {
      state.prompt = prompt
    },
    upgradeAccounts(state, password) {
      for (var i = 0, len = state.accounts.length; i < len; i++) {
        if (state.accounts[i].privateKey) {
          let keystore = utils.encrypt(
            state.accounts[i].privateKey,
            password
          )
          state.accounts[i].keystore = keystore
          state.accounts[i].privateKey = ''
        }
      }
    },
  },

  actions: {
    // 钱包模式注册
    async createAccountWithWallet({
      commit,
      state,
      rootState
    },parmas) {
      commit('loading', true, {
        root: true
      })
      try {
        let resData
        await NewBCX.createAccountWithWallet(parmas).then(res => {
          commit('loading', false, {
            root: true
          })
          if (res.code !== 1) {
            Alert({
              message: CommonJs.getI18nMessages(I18n).error[
                res.code
              ]
            })
          } else {
            commit('setLogin', true, {
              root: true
            })
            commit('setAccountType', 'wallet', {
              root: true
            })
          }
          resData = res
        })
        return resData
      } catch (e) {
        console.log(e)
        return e
      }
    },

     // 账户模式注册
     async createAccountWithPassword({
      commit,
      state,
      rootState
    },parmas) {
      commit('loading', true, {
        root: true
      })
      try {
        let resData
        await NewBCX.createAccountWithPassword(parmas).then((res) => {
          commit('loading', false, {
            root: true
          })
          if (res.code === 1) {
            commit('setIsAccount', true, {
              root: true
            })
            commit('setLogin', true, {
              root: true
            })
            commit('setAccountType', 'account', {
              root: true
            })
          } else {
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


    // 查看钱包账户
    async getAccounts({
      commit
    }) {
      try {
        commit('loading', true, {
          root: true
        })
        let account = await NewBCX.getAccounts()
        commit('loading', false, {
          root: true
        })
        return account
      } catch (e) {
        return e
      }
    },

    // 切换钱包账户
    async setCurrentAccount({
      commit
    }, account) {
      commit('loading', true, {
        root: true
      })
      try {
        let resData
        await NewBCX.setCurrentAccount(account).then(res => {
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
          commit('setCurrentAccount', account.account, {
            root: true
          })
          resData = res
        })
        return resData
      } catch (e) {
        return e
      }
    },
    // 删除钱包
    async deleteWallet({
      commit
    }) {
      try {
        let resData
        await NewBCX.deleteWallet().then(res => {
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
    // 私钥登录
    async importPrivateKey({
      commit,
      state,
      rootState
    },parmas) {
      commit('loading', true, {
        root: true
      })
      try {
        let resData
        await NewBCX.importPrivateKey(parmas).then(res => {
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
 
    // 恢复钱包
    async RestoreWallet({
      commit,
      state,
      rootState
    },parmas) {
      let resData
      commit('loading', true, {
        root: true
      })
      try {
        await NewBCX.restoreWallet(parmas).then(res => {
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
    // 备份钱包
    async BackupDownload({
      commit
    }) {
      commit('loading', true, {
        root: true
      })
      try {
        await NewBCX.backupDownload().then(res => {
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
        })
      } catch (e) {
        return e
      }
    },
    // 加载钱包
    async LoadWalletFile({
      commit
    }, file) {
      commit('loading', true, {
        root: true
      })
      try {
        let resData
        await NewBCX.loadWalletFile(file).then(res => {
          commit('loading', false, {
            root: true
          })
          if (res.code !== 1) {
            Alert({
              message: CommonJs.getI18nMessages(I18n).error[
                res.code
              ]
            })
          } else {
            commit('setIsAccount', true, {
              root: true
            })
            commit('setAccountType', 'wallet', {
              root: true
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
    async OutWalletPutKey({
      commit
    }) {
      let resData
      commit('loading', true, {
        root: true
      })
      try {
        await NewBCX.getPrivateKey().then(res => {
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
    }
  },
  async setAutoLock({
    commit
  }, time) {
    commit('setLockTime', time)
  },
  async pushPrompt({
    state,
    commit
  }, prompt) {
    if (state.prompt) state.prompt.responder && state.prompt.responder(null)
    commit('pushPrompt', prompt)
  }
}