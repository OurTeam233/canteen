<template>
  <div class="test">
    

  </div>
</template>

<script>
export default {
  name: 'WebsocketConnectTest',
  // mounted(){
  //   this.$socket.emit('connect', 1)
  // },
  // sockets: {
  //   //查看socket是否渲染成功
  //   connect() {
  //     console.log("链接成功");
  //   },
  //   disconnect(){
  //     console.log("断开链接");
  //   },//检测socket断开链接 
  //   reconnect(){
  //     console.log("重新链接");
  //   },
  //   //客户端接收后台传输的socket事件
  //   message(data) {
  //     this.$notify({
  //       title: '新消息',
  //       message: data,
  //       type: 'warning',
  //       duration:10000
  //     });
  //     console.log("data", data);//接收的消息
  //   }
  // },
  data() {
    return {
      wsUrl: 'ws://121.43.56.241:8080/CanteenWeb/Websocket/1', // ws地址
      websock: null, // ws实例
    }
  },
  mounted() {
    this.initWebSocket()
  },
  destroyed() {
    // 离开路由之后断开websocket连接
    this.websock.close()
  },
  methods: {
    // 初始化weosocket
    initWebSocket() {
      if (typeof WebSocket === 'undefined')
        return console.log('您的浏览器不支持websocket')
      this.websock = new WebSocket(this.wsUrl)
      this.websock.onmessage = this.websocketonmessage
      this.websock.onopen = this.websocketonopen
      this.websock.onerror = this.websocketonerror
      this.websock.onclose = this.websocketclose
    },
    websocketonopen() {
      // 连接建立之后执行send方法发送数据
      let actions = { test: 'test' }
      this.websocketsend(JSON.stringify(actions))
    },
    websocketonerror() {
      // 连接建立失败重连
      this.initWebSocket()
    },
    websocketonmessage(e) {
      // 数据接收
      // const redata = JSON.parse(e.data)
      // console.log('接收的数据', redata)
      console.log(e)
    },
    websocketsend(Data) {
      // 数据发送
      this.websock.send(Data)
    },
    websocketclose(e) {
      // 关闭
      console.log('断开连接', e)
    },
  },
}
</script>

<style lang="less" scoped>
</style>