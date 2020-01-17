import axios from "axios";
import Storage from "../utils/storage";
import router from '../router'

import {
    GetBCXWithState
} from '../utils/bcx'


let NewBCX = GetBCXWithState()
import {
    remote
} from "electron";

export default {
    async lockCount({
        commit
    }) {
        try {
            await NewBCX.lockAccount().then((res) => {
                console.info("lockAccount res",res);
                commit('setIsLocked', true)
                router.replace({
                    name: 'unlock'
                })
            })
        } catch (e) {
            return e
        }
    },
    async init({
        commit
    }) {
        try {
            let resData
            commit('loading', true, {
                root: true
            })
            await NewBCX.init({
                real_sub:true,
                subscribeToRpcConnectionStatusCallback:res=>{
                    console.info("subscribeToRpcConnectionStatusCallback res",res);
                }
            }).then((res) => {
                console.info("init res",res);
                resData = res
                commit('loading', false, {
                    root: true
                })
            })
            return resData
        } catch (e) {
            return e
        }
    },
    
    async nodeLists({
        commit
    }) {
        try {
            commit('loading', true, {
                root: true
            })
            let nodes = [];
            await axios
                .get("https://api-cocosbcx.cocosbcx.net/backend/getParams")
                .then(response => {
                    commit('loading', false, {
                        root: true
                    })
                nodes = response.data.data;
                Storage.set("node", nodes);
                })
                .catch(function (error) {
                    console.log(error);
                    commit('loading', false, {
                        root: true
                    })
                });
            return nodes;
        } catch (e) {
            console.log(e);
        }
    },

    async switchAPINode({
        commit
    }, url) {
        try {
            let resData
            await NewBCX.switchAPINode(url).then(res => {
                resData = res
            })
            return resData
        } catch (e) {
            console.log(e);
        }
    },
    async apiConfig({
        commit
    }, Node) {
        try {
            commit('loading', true, {
                root: true
            })
            await NewBCX.apiConfig({
                default_ws_node: Node.ws,
                ws_node_list: [{
                    url: Node.ws,
                    name: Node.name
                }],
                networks: [{
                    core_asset: "COCOS",
                    chain_id: Node.chainId
                }],
                faucet_url: Node.faucetUrl ? Node.faucetUrl : Node.url,
                auto_reconnect: Node.connect ? Node.connect : false,
                worker: false
            },true).then(res=>{
                console.info("apiConfig res",res);
            });
            commit('loading', false, {
                root: true
            })
        } catch (e) {
            console.log(e);
        }
    },

    async IndexedDBAdd({
        commit
    }, name) {
        try {
            var request = window.indexedDB.open("test", 1);
            request.onupgradeneeded = function (event) {
                var db = event.target.result;
                var objectStore = db.createObjectStore("table1", {
                    keyPath: "id",
                    autoIncrement: true
                });
                objectStore.createIndex("name", "name", {
                    unique: false
                });
            };
            request.onsuccess = function (event) {
                var db = event.target.result;
                var transaction = db.transaction(["table1"], "readwrite");
                var objectStore = transaction.objectStore("table1");
                objectStore.add(name);
            };
        } catch (e) {
            console.log(e)
        }

    },
    async IndexedDBQuery({
        commit
    }) {
        try {
            var request = window.indexedDB.open("test", 1)
            request.onsuccess = function (event) {
                var db = event.target.result;
                if (db.objectStoreNames.length < 1) {
                    return
                }

                var transaction = db.transaction(["table1"], "readwrite");
                var objectStore = transaction.objectStore("table1");
                var request = objectStore.get(1);
                request.onsuccess = function (event) {
                    return request.result
                };
            };
        } catch (e) {
            console.log(e)
        }
    },


    async UpdateVersion({
        commit
    }) {
        let resData
        if (process.platform !== "darwin") {
            try {
                await axios
                    .get("https://api-cocosbcx.cocosbcx.net/backend/getPolicyUrl", {
                        params: {
                            platform: "CocosDesktopWin",
                            channel: 1003,
                        }
                    })
                    .then(response => {
                        commit('setupdateMessage', response.data.data);
                        if (
                            response.data.data &&
                            response.data.data.version > remote.app.CocosDesktop
                        ) {
                            resData = true
                        } else {
                            resData = false
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                return resData
            } catch (e) {
                console.log(e)
            }
        } else {
            try {
                await axios
                    .get("http://backend.test.cjfan.net/getPolicyUrl", {
                        params: {
                            platform: "CocosDesktopMac",
                            channel: 1004,
                        }
                    })
                    .then(response => {
                        commit('setupdateMessage', response.data.data);
                        if (
                            response.data.data &&
                            response.data.data.version > remote.app.CocosDesktop
                        ) {
                            resData = true
                        } else {
                            resData = false
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                return resData
            } catch (e) {
                console.log(e)
            }
        }
    }
}