'use strict'
import io from 'socket.io-client';

export default {
  name: 'chat',
  data () {
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
    sendMsg () {
      console.log('Sending: ', this.chatMsg);
      this.socket.emit('chat message', this.chatMsg);
      // this.socket.emit('chat newMessage', this.chatMsg);
      this.chatMsg.msg = '';
    }
  },
  created () {
    const nickName = window.prompt('Please enter a nickname:');
    this.chatMsg.nickName = nickName || this.chatMsg.nickName;
    this.socket = io.connect('http://localhost:3003');
    this.socket.on('chat message', chatMsg => {
      this.chatMsgs.push(chatMsg);   
    })
  }
}