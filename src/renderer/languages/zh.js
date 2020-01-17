export default {
  // placeholder
  placeholder: {
    account: '输入账户',
    password: '请输入密码',
    temporary: '输入临时密码',
    oldPassword: '输入旧密码',
    newPassword: '输入新密码',
    repassword: '确认密码',
    privateKey: '请输入私钥',
    input: '请输入',
    noBlank: '不能为空',
    filePassword: '创建文件时的密码',
  },
  // button
  button: {
    create: '创建',
    agree: '同意',
    accountLogin: '账户登录',
    keysLogin: '私钥登录',
    createAccount: '创建账户',
    importAccount: '导入账户',
    editAccountName: '修改账号名称',
    lookAccount: '查看账户详情',
    removeAccount: '退出当前账号',
    exportPrivateKey: '导出账号私钥',
    recharge: '充值',
    transfer: '转账',
    resource: '资源',
    copy: '复制',
    sure: '确定',
    refresh: '刷新',
    copyPrivate: '复制私钥',
    doneCopy: '我已备份，进入账户',
    sureCreateAccount: '确认创建',
    save: '保存',
    cancel: '取消',
    addNode: '添加节点',
    editNode: '编辑节点',
    deleteNode: '删除节点',
    copyAddress: '复制收款地址',
    send: '发送',
    surePay: '确认支付',
    unlock: '解锁',
    reset: '重置',
    modifyPassword: '修改密码',
    agreement: '隐私政策',
    policy: '用户协议',
    close: '关闭',
    pledge: '冻结',
    redeem: '解冻',
    pledgeSure: '确认冻结',
    redeemSure: '确认解冻',
    importSure: '确认导入',
    confirm: '确认',
    reject: '拒绝',
    receive: '接受',
    operation: '操作',
    submit: '提交',
    createBackup: '创建备份',
    complete: '完成',
  },
  // message
  message: {
    intro: 'CocosDesktop是基于COCOS-BCX开发的桌面版钱包，支持钱包的基本功能，可以帮助我们进行签名转账、管理账号资源，查询历史记录等所有的操作。在钱包安装过程中提示用户必须备份私钥，且保证其安全。',
    privity: '私钥用于恢复钱包或重置钱包密码，点击复制，并将它存放在您知道的安全地方',
    active: '活跃权限用来设定拥有花费本账户资金权限的账户名或公钥',
    owner: '活跃权限用来设定拥有花费本账户资金权限的账户名或公钥',
    wallet: '钱包模式下注册, 仅支持私钥登录, 请务必备份好私钥, 确保您的钱包安全',
    account: '账户模式下注册, 可支持账号和私钥两种登录方式, 请务必保管好账户信息及私钥保护您的钱包安全',
    time: '钱包锁定时间',
    logoutWallet: '请确认已备份私钥或账户密码或钱包文件，是否继续退出操作？',
    logoutAccount: '您将退出该账户，是否继续退出操作？',
    walletPassword: '该密码为备份钱包文件时的钱包密码',
    accountActive: '活跃权限用来设定拥有花费本账户资金权限的账户名或公钥',
    accountOwner: '账户权限设定谁可以控制本账户 , 控制人(账户名或公钥)可修改账户相关的各种设置，包括权限设置',
    bin: '单击下面的按钮将生成一个扩展名为.bin的备份文件，此文件使用您的当前的临时密码加密，并包含您账户的所有私钥，它可以用于恢复您的钱包，或将其移动到不同的计算机/浏览器，更改临时密码并不会更改此文件密码。',
    rememberPassword: '请牢记密码，忘记密码将无法找回',
    recommendNew: '推荐新用户使用',
    recommendOld: '推荐已有COCOS账户的用户使用',
    savePrivateKey: '请注意：请及时导出对应的私钥，并保存于安全的地方，不要将私钥泄露给任何人',
    privateKeyOnly: '私钥将是您找回账户的唯一方式',
    noMoreRecord: '无更多记录',
    noRecord: '无交易记录',
    noWhiteList: '无白名单',
    joinWhiteList: '您可以将此操作列入白名单，下次您就不必再次手动授权。',
    whiteListDes: '每一个旁边有单选按钮的属性都将变得可以更改，这意味着您可以允许此事务的某些属性的更改，并且仅当其他属性发生更改时，不会被列入白名单',
    lockedNeed: '需要解锁才能进一步操作',
    lockedLogin: '我们不会显示一个需要你登录的提示/弹出窗口',
    lockedDes: '如果您看到一个提示/弹出窗口，需要你输入密码，它肯定是一个试图获取您的密码的恶意网站， 确保只使用点击浏览器的插件托盘图标后弹出的窗口来解锁',
    warningPrivateKey: '安全警告：请勿向任何人泄露您的私钥',
    rechargeOnly: '此地址支持转入COCOS及其token',
    verifyPassword: '需要先验证您的当前密码',
    ownerError: '账户名不能是自己',
    lockSetting: '自动锁定设置',
    lockTip: '当您停止操作时，可以通过设置离开时间来自动锁定CocosDesktop',
    changeLanguage: '语言选择',
    resourceTip: 'COCOS网络中的转账、交易、执行合约等操作会消耗资源（带宽和CPU），资源可通过冻结COCOS来获得',
    pledgeTip: '通过冻结COCOS（波场投票权）和资源，冻结的COCOS将被冻结3天，不能被交易。冻结期结束后，已冻结的COCOS可被解冻并可用于交易。',
    changeAlert: '修改密码需要一定手续费，修改密码后私钥也会更改，请重新备份',
  },
  // verify
  verify: {
    accountType: '5-63位小写字母开头+数字',
    passwordType: '8-12位数字、字母和特殊符号任两种',
    keysNull: '私钥不能为空',
    passwordNull: '密码不能为空',
    passwordLength: '密码长度不能少于8位',
    privateNull: '私钥不能为空',
    passwordSure: '请再次输入密码',
    passwordMatch: '两次输入密码不一致',
    accountNull: '请输入账号名',
    accountReg: '请输入正确的用户名',
    ownerAccountNull: '请选择付款账户',
    toAddressNull: '请选择收款账户',
    tokenNull: '请选择付款账户',
    number: '请输入数字',
    minimum: '最小精度为',
    numberGtZero: '请输入大于0的数字',
    max: '超出上限',
    noZero: '数量不能小于 0',
    ownerKey: 'owner_key不能进行转账，请导入active_key',
    walletPassword: '请输入最初的临时密码',
  },
  // title
  title: {
    title: '欢迎使用COCOS-BCX去中心化钱包',
    wallet: 'COCOS-BCX去中心化钱包',
    tempassword: '请设置临时钱包密码',
    loginWay: '登录方式',
    login: '登录',
    back: '返回',
    update: '更新',
    version: '更新版本',
    updateLog: '更新日志',
    test: '测试',
    test1: '(测试)',
    privateKey: '私钥',
    walletType: '钱包模式',
    storeKey: '备份私钥',
    activeKey: '资产私钥',
    ownerKey: '账户私钥',
    accountType: '账户模式',
    agreement: '用户协议',
    createAccount: '创建账户',
    history: '交易记录',
    editorAccount: '修改账户名称',
    recharge: '充值',
    transfer: '转账',
    sendDetail: '交易详情',
    welcome: '欢迎回来',
    setting: '设置',
    policy: '隐私政策',
    resource: '资源',
    resourceTitle: '资源与投票权',
    importAccount: '导入账号',
    removeAccount: '退出账号',
    signature: '签名请求',
    locked: '已锁定!',
    walletPassword: '钱包密码',
    newUpdate: '当前已经是最新版本',
    contract: '合约调用',
  },
  // alert
  alert: {
    tranferSuccess: '转账成功',
    copySuccess: '复制成功',
    copyFail: '复制失败',
    exportSuccess: '导出成功',
    importSuccess: '导入成功',
    exportFail: '导出失败',
    passwordError: '密码错误',
    sendSuccess: '发送成功',
    sendFail: '发送出错',
    modifySuccess: '修改成功',
    modifyPasswordSuccess: '密码修改成功',
    modifyPasswordFailed: '密码修改失败',
    redeemSuccess: '解冻成功',
    redeemFail: '解冻失败，请稍后再试',
    pledgeSuccess: '冻结成功',
    pledgeFail: '冻结失败',
    existAccount: '此账号已存在',
    illegalPrivateKey: '私钥不合法',
    transferFail: '扣除手续费后可用余额不足',
    nodeFail: '节点连接失败',
  },
  // confirm
  confirm: {
    removeAccount: '退出账号前请务必确保私钥已经导出或牢记密码，否则退出后该账户将不能恢复'
  },
  // label
  label: {
    trasfer: '转账详情',
    assert: '我的资产',
    password: '密码',
    type: '注册模式',
    login: '登录模式',
    account: '账户名称',
    remember: '记住账户名称',
    nodeConnect: '节点链接',
    route: '注册路由',
    nodeId: '节点ID',
    nodeName: '节点名称',
    send: '转出账户',
    hash: '交易HASH',
    blockHeight: '区块高度',
    tradeTime: '交易时间',
    ownerAccount: '转出账户',
    toAddress: '转入账户',
    nodeSelect: '节点选择',
    tokenType: '选择Token',
    cost: '矿工费用',
    amount: '数量',
    coin: "币种",
    memo: '备注',
    new: '新账户',
    charge: '手续费',
    mainNetwork: '主网络',
    testNetwork: '测试网络',
    customNet: '自定义网络',
    bandwidth: '带宽',
    vote: '投票权',
    donePledge: '已冻结COCOS',
    redeemTime: '可解冻时间',
    pledgeAmount: '冻结COCOS数量：',
    pledgeType: '选择想要获得的资源：',
    redeemAmount: '解冻COCOS数量：',
    CocosPrivate: '请在下方输入您的COCOS账户私钥',
    property: '属性',
    json: 'json数据',
    contract: '合约',
    ptsite: '站点：',
    ptaddress: '转出',
    ptfrom: '转入',
    ptamount: '数量',
    ptcontract: '合约：',
    otcAccount: '交易所',
    ptpayment: '支付：',
    pttype: '类型：',
    newAccout: '添加新账户',
    operation: '操作',
    account: '账户',
    keyFile: '文件密钥',
    restoreKeyFile: '上传文件密钥',
    uploadKeyFile: '请上传文件（.bin）格式',
    version: '当前版本',
    user: '授权人',
    nhTitle: 'NH资产转移',
    nhId: 'NH资产ID',
  },
  // settings
  settings: {
    base: '基本设置',
    backup: '备份',
    backupWallet: '备份文件/私钥',
    backupFile: '备份文件',
    backupPrivate: '备份私钥',
    recover: '恢复钱包',
    import: '私钥导入',
    quit: '退出账户',
    network: '网络',
    node: '节点设置',
    whiteList: '白名单',
    language: '语言',
    modifyPassword: '修改密码',
    lockSetting: '锁定设置',
    about: '关于CocosDesktop',
    lock: '立即锁定',
    update: '检查更新',
  },
  // unit
  unit: {
    minute: '分钟',
    hour: '小时'
  },
  type: {
    bandWidth: '带宽（Bandwidth Point）',
    energy: 'CPU （Energy）'
  },
  other: {
    never: '永不'
  },
  networkName: {
    // MainNet: '主网络',
    // MainNet: '测试网络',
    TestNet: '测试网络',
    PrivateNet: '自定义网络'
  },
  error: {
    0: '操作失败',
    101: '参数缺失',
    1011: '参数错误',
    102: '网络繁忙，请检查你的网络连接',
    103: '请输入正确的账户名,小写字母开头,6位以上',
    104: '不存在',
    105: '密码错误',
    106: '账户已经处于解锁状态',
    107: '请先导入私钥',
    108: '用户名或密码错误',
    109: '请输入正确的私钥',
    110: '该私钥没有对应的账户信息',
    111: '请先登录',
    112: '必须拥有owner权限才可以进行密码修改,请确认你导入的是ownerPrivateKey',
    113: '请输入正确的原始密码/临时密码',
    114: '帐户被锁定或未登录',
    115: '区块链上不存在资产',
    116: '收款方账户不存在',
    117: '小数点不能超过当前资产精度配置',
    118: '备注加密失败',
    119: '交易过期',
    120: '获取帐户记录错误',
    121: '查询不到相关区块及交易信息',
    122: '参数blockOrTXID不正确',
    123: '参数account不能为空',
    124: '收款方账户名不能为空',
    125: '用户未拥有该资产',
    127: '没有可领取的奖励',
    129: 'memo不能为空',
    130: '请输入正确的合约名称,小写字母开头,6位以上',
    131: '世界观名称不能为空',
    133: 'toAccount不能为空',
    135: '请检查参数数据类型',
    136: 'orderId不能为空',
    137: 'NHAssetHashOrIds不能为空',
    138: '接入点地址不能为空',
    139: '节点地址必须以 ws:// 或 wss:// 开头',
    140: 'API服务器节点地址已经存在',
    141: '请检查参数NHAssets中的数据',
    142: '请检查参数NHAssets的数据类型',
    144: '您当前批量 创建/删除/转移 批量操作数量不能超过 NH资产数量',
    145: '合约不存在',
    146: '账户没有该合约相关的信息',
    147: '非同质资产不存在',
    148: '请求超时，请尝试解锁账户或登录账户',
    149: '此私钥已导入过钱包',
    150: '导入私钥失败',
    151: '您的浏览器不支持文件保存',
    152: '无效的备份下载转换',
    153: '请先解锁钱包',
    154: '请先恢复你的钱包',
    155: '浏览器不支持钱包文件恢复',
    156: '该钱包已经导入，请勿重复导入',
    157: '请求超时，请尝试解锁账户或登录账户',
    158: '导入的钱包核心资产错误',
    159: '账户已存在',
    160: '不可重复添加账号',
    161: '订单不存在',
    162: '资产已存在',
    163: '钱包已经存在，请尝试导入私钥',
    164: '世界观不存在',
    165: '链上没有该钱包账户信息',
    166: '该钱包链id与当前链配置信息不匹配',
    167: '当前合约版本id没有找到',
    168: '当前没有订阅此项',
    169: 'API方法不存在',
    300: '链同步错误，请检查您的系统时钟',
    301: '连接RPC失败，请检查你的网络'
  }
}