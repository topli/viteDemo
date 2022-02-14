const mqtt = (window as any).mqtt

// Create a client instance
const options = {
  //mqtt客户端的id，这里面应该还可以加上其他参数，具体看官方文档
  clientId: 'mqttjs_' + (Math.random() * 1000000).toString()
}
let subscribe: Function

export let client: any

export const createMQTT = (opt = <{ topic: string }>{}) => {
  //浏览器采用websocket协议，host主机地址为192.168.0.200，端口为9001，路径为/mqtt
  client = mqtt.connect('ws://localhost:9000/mqtt', options) // you add a ws:// url here

  //建立连接
  client.on('connect', function () {
    console.log('connect success!')
    //订阅主题 presence
    client.subscribe(opt.topic, function (err: any) {
      console.log(opt.topic)

      if (!err) {
        console.log('subscribe success!')
      } else {
        //打印错误
        console.log(err)
      }
    })
  })

  //如果连接错误，打印错误
  client.on('error', function (err: any) {
    console.log(err)
    client.end()
  })

  //如果client订阅主题成功，那么这里就是当接收到自己订阅主题的处理逻辑
  client.on('message', function (topic: any, message: { toString: () => string }) {
    // message is Buffer,此处就是打印消息的具体内容
    const data = JSON.parse(message.toString())
    console.log(data)

    subscribe && subscribe(data)
  })

  //当重新连接启动触发回调
  client.on('reconnect', () => {})
  //连接断开后触发的回调
  client.on('close', function () {})
  //从broker接收到断开连接的数据包后发出。MQTT 5.0特性
  client.on('disconnect', function (packet: any) {
    console.log(packet)
  })
  //客户端脱机下线触发回调
  client.on('offline', function () {})
  //当客户端无法连接或出现错误时触发回调
  client.on('error', (error: any) => {
    console.log(error)
    client.end()
  })
  //当客户端发送任何数据包时发出。这包括published()包以及MQTT用于管理订阅和连接的包
  // client.on('packetsend', (packet: any) => {
  //   console.log(packet)
  // })
  //当客户端接收到任何数据包时发出。这包括来自订阅主题的信息包以及MQTT用于管理订阅和连接的信息包
  // client.on('packetreceive', (packet: any) => {
  //   console.log(packet)
  // })
  return client
}

//console.log(options.clientId);

export const sub = (cb: Function) => {
  subscribe = cb
}

export const pub = (topic: string, message: string) => {
  client.publish(topic, message)
}

export default {
  sub,
  pub
}
