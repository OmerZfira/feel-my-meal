'use strict';

import { mapGetters, mapActions } from 'vuex';
import io from 'socket.io-client';

export default {
    data() {
        return {
            peer: null,
            targetUser: 'w',
            outStream: null,
            mutedOut: false, //test microphone for self getUserMedia on nexus5
            pingHerokuTimeout: -1
        }
    },
    computed: {
        ...mapGetters(['user']),
    },
    methods: {
        connectRTC() {
            console.log('target: ', this.targetUser);
            let mediaConnection = this.peer.call(this.targetUser, this.outStream);
            let dataConnection = this.peer.connect(this.targetUser);
            mediaConnection.on('stream', stream => {
                this.$refs.videoDisplayInc.src = window.URL.createObjectURL(stream);
                this.$refs.videoDisplayInc.play();
            });
            console.log('peer is: ', this.peer);
            console.log('mediaConnection is: ', mediaConnection);
            console.log('dataConnection is: ', dataConnection);
            console.log('out stream is: ', this.outStream);
            // var mediaConnection = peer.call('wr16tgyxr0w1att9', this.outStream);
        },
       pingHeroku() {
            this.peer.socket.send({ type: 'ping' });
            this.pingHerokuTimeout = setTimeout(this.pingHeroku, 20000);
        }
    },
    mounted() {
        console.log('support: ', navigator.mediaDevices.getSupportedConstraints()); 
        const mediaConfig = { audio: {echoCancellation: true}, video: true };
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia(mediaConfig).then(stream => {
                this.outStream = stream;
                console.log('out stream is: ', this.outStream);
                this.$refs.videoDisplayOut.src = window.URL.createObjectURL(stream);
                this.$refs.videoDisplayOut.play();
            });
        } else {
            console.log('video chat not supported on your device');
        }

        // const peerConfig = { key: 'uvpgt382r9t3xr' }
        // const peerConfig = { host: 'localhost', port: 9000, secure: true, debug: 2 }; //for localhost
        console.log('NODE_ENV is: ', process.env.NODE_ENV);
        // let peerHost = (process.env.NODE_ENV === 'development') ? 'test-server-peerjs.herokuapp.com' : 'coding-academy.net';
        // let peerPath = (process.env.NODE_ENV === 'development') ? '/' : '/feelmymeal/videoChat';
        // let peerPort = (process.env.NODE_ENV === 'development') ? 9000 : 443;
        // const peerConfig = { host: peerHost, path: peerPath, port: peerPort, secure: true, debug: 3 };
        const peerConfig = { host: 'test-server-peerjs.herokuapp.com', secure: true, debug: 2 }; //only for heroku
        let id = this.user.username.slice(0, 1);
        this.peer = new Peer(id, peerConfig);
        console.log('this.peer', this.peer);
        this.peer.on('open', id => {
            console.log('My peer ID is: ' + id);
            this.pingHeroku();
        });

        this.peer.on('call', mediaConnection => {
            mediaConnection.answer(this.outStream);
            mediaConnection.on('stream', stream => {
                this.$refs.videoDisplayInc.src = window.URL.createObjectURL(stream);
                this.$refs.videoDisplayInc.play();
            });

        });

        this.peer.on('connection', dataConnection => {
            // mediaConnection.answer(this.outStream);
            console.log('IM CONNECTED TO YOU');
        });

        this.peer.on('stream', stream => {
            this.$refs.videoDisplayInc.src = window.URL.createObjectURL(stream);
            this.$refs.videoDisplayInc.play();
        });

        this.peer.on('error', err => {
            console.log('we got a problem huston: ' + err);
        });

    }
}