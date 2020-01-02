export default  {
    setUpdate(state, update) {
      state.update = update
    },
    setupdateMessage(state, updateMessage) {
      state.updateMessage = updateMessage
    },
    setCocos(state, cocos) {
      state.cocos = cocos
    },
    setwhiteList(state, whiteList) {
      state.whiteList.push(whiteList)
    },
    pushPopup(state, popup) {
      state.popups.push(popup)
    },
    setDialogs(state, dialog) {
      state.dialog = dialog
    },
    setAccountAdd(state, accountAdd) {
      state.accountAdd = accountAdd
    },
    setLoginNoAlert(state, loginNoAlert) {
      state.loginNoAlert = loginNoAlert
    },
    setChangeRadio(state, changeRadio) {
      state.changeRadio = changeRadio
    },
    setFirstLanguage(state, firstLanguage) {
      state.firstLanguage = firstLanguage
    },
    setContractWhiteList(state, contractWhiteList) {
      state.contractWhiteList.push(contractWhiteList)
    },
    releasePopup(state, popup) {
      state.popups = state.popups.filter(p => p.id !== popup.id)
    },
    setAccountType(state, accountType) {
      state.accountType = accountType
    },
    loading(state, loading) {
      state.loading = loading
    },
    setKeys(state, privateKeys) {
      state.privateKeys = Array.isArray(privateKeys) ? privateKeys[0] : privateKeys
    },
    settemporaryKeys(state, temporaryKeys) {
      state.temporaryKeys = Array.isArray(temporaryKeys) ? temporaryKeys[0] : temporaryKeys
    },
    setCurLng(state, curLng) {
      state.curLng = curLng
    },
    setlockedTime(state, lockedTime) {
      state.lockedTime = lockedTime
    },
    setCocosCount(state, cocos) {
      state.cocosCount = cocos
    },
    setIsLocked(state, isLocked) {
      state.isLocked = isLocked
    },
    setIsImportKeys(state, isImportKeys) {
      state.isImportKeys = isImportKeys
    },
    setPassword(state, Password) {
      state.Password = Password
    },
    setLogin(state, isLogin) {
      state.isLogin = isLogin
    },
    setIsAccount(state, isAccount) {
      state.isAccount = isAccount
    },
    setSha(state, sha) {
      state.sha = sha
    },
    setAccount(state, cocosAccount) {
      state.cocosAccount.accounts = cocosAccount.account
      state.cocosAccount.passwords = cocosAccount.password
    },
    setCurrentAccount(state, account) {
      state.currentAccount = Object.assign({}, account)
    },
    setCurrentCreateAccount(state, account) {
      state.currentCreateAccount = account
    },
    setCurrentCreateVisible(state, bool) {
      state.currentCreateVisible = bool
    },
    setLoginCountStore(state, LoginCountStore) {
      state.LoginCountStore = LoginCountStore
    },
    updateNetwork(state, network) {
      state.networks = state.networks.map(ele => {
        if (ele.type === network.type) {
          ele = {
            ...ele,
            ...network
          }
        }
        return ele
      })
    },
    upgradeCurrentAccount(state, password) {
      if (state.currentAccount.privateKey) {
        const keystore = utils.encrypt(state.currentAccount.privateKey, password)
        state.currentAccount.keystore = keystore
        state.currentAccount.privateKey = ''
      }
    },
    changePassword(state, pwd) {
      const {
        oldpwd,
        newpwd
      } = pwd
      if (state.currentAccount.keystore) {
        let privateKey = utils.decrypt(state.currentAccount.keystore, oldpwd)
        state.currentAccount.keystore = utils.encrypt(privateKey, newpwd)
      }
    },
  }