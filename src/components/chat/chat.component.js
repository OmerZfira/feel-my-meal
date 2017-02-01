'use strict'
import io from 'socket.io-client';
import { GET_HIGHER, store } from '../../modules/chat/chat.module';

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
    let socketPath;
    const nickName = window.prompt('Please enter a nickname:');
    this.chatMsg.nickName = nickName || this.chatMsg.nickName;
    if (process.env.NODE_ENV === 'development') {
      socketPath = 'http://localhost:3003';
    } else socketPath = '/feelmymeal/app/socket.io';

    this.socket = io.connect({ path: socketPath });
    
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