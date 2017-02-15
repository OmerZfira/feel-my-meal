'use strict'
import io from 'socket.io-client';
import { GET_HIGHER, store } from '../../modules/chat/chat.module';

export default {
  name: 'chat',
  data() {
    return {
      socket: null,
      chatMsgs: [],
      chatMsg: {
        nickName: 'Guest',
        msg: ''
      }
    }
  },
  methods: {
    sendMsg() {
      console.log('Sending: ', this.chatMsg);
      this.socket.emit('chat message', this.chatMsg);
      // this.socket.emit('chat newMessage', this.chatMsg);
      this.chatMsg.msg = '';
    }
  },
  created() {
    let socketPath;
    const nickName = window.prompt('Please enter a nickname:');
    this.chatMsg.nickName = nickName || this.chatMsg.nickName;
    if (process.env.NODE_ENV === 'development') {
      socketPath = 'localhost:3003';
      if (window.location.href === 'http://192.168.1.19:8080/#/chat') {
        socketPath = 'https://192.168.1.19:3003';
        console.log('IM ON MOBILE AT HOME');
      }
    } else socketPath = {path: '/feelmymeal/app/socket.io'};
    console.log('socketPath is: ', socketPath);
    this.socket = io(socketPath);
    console.log('this.socket is: ', this.socket);
    // this.socket = io.connect('http://localhost:3003');

    this.socket.on('chat message', chatMsg => {
      this.chatMsgs.push(chatMsg);
      console.log('chatMsg recieved', chatMsg);
    })
  },
  mounted() {
    this.$store.commit(GET_HIGHER);
  },
  destroyed() {
    this.$store.commit(GET_HIGHER);
  }
}