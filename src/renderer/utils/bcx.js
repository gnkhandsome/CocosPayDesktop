import BCX from 'bcx-api'
import Storage from './storage'

let bcx, Node

function GetNewBCX() {
  
  let nodes = Storage.get('node')

  if (!nodes || nodes.length < 1) {
    nodes =[ {
      "name": "Test",
      "ws": "wss://node.cocos-terminal.com/wss",
      "faucetUrl": "https://faucet.cocosbcx.net",
      "chainId": "6057d856c398875cac2650fe33caef3d5f6b403d184c5154abbff526ec1143c4",
      "coreAsset": "COCOS",
      "type": "0",
      "isForce": false
  }];
  }
  let Node;
  let choose = Storage.get('choose_node')
  nodes.map(item => {
    choose && choose.ws === item.ws ? Node = item : Node = nodes[0]
  });

  let NewBCX = new BCX({
    ws_node_list: [{
      url: Node.ws,
      name: Node.name
    }],
    networks: [{
      core_asset: 'COCOS',
      chain_id: Node.chainId
    }],
    faucet_url: Node.faucetUrl,
    auto_reconnect: false,
    real_sub:true,
    check_cached_nodes_data:false
  })
  Storage.set('choose_node', Node)
  NewBCX.lookupWSNodeList({
    refresh: true
  }).then(res => {})
  return NewBCX
}

export function GetBCXWithState() {
  if (!bcx) {
    bcx = GetNewBCX()
  }
  return bcx
}