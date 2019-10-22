'use strict';

// import Peer from 'peerjs';

import { mapGetters, mapActions } from 'vuex';
import Peer from 'simple-peer';
import io from 'socket.io-client';

export default {
    data() {
        return {
			socket: null,
			socketReady: false,
			peer: null,
			myUser: '',
            targetUser: 'w',
			outStream: null,
			mutedOut: false, //test microphone for self getUserMedia on nexus5
		}
    },
    computed: {
        ...mapGetters(['user']),
    },
    methods: {
        // connectRTC() {
        //     console.log('target: ', this.targetUser);
        //     console.log('peer is: ', this.peer);
        //     let mediaConnection = this.peer.call(this.targetUser, this.outStream);
        //     let dataConnection = this.peer.connect(this.targetUser);

		// 				mediaConnection.on('stream', stream => {
		// 					this.$refs.videoDisplayInc.src = window.URL.createObjectURL(stream);
		// 					this.$refs.videoDisplayInc.play();
		// 				});

        //     console.log('peer is: ', this.peer);
        //     console.log('mediaConnection is: ', mediaConnection);
        //     console.log('dataConnection is: ', dataConnection);
        //     console.log('out stream is: ', this.outStream);
        //     // var mediaConnection = peer.call('wr16tgyxr0w1att9', this.outStream);
		// 		},
    },
    mounted() {
		this.myUser = this.user.username.slice(0, 1) === 'w' ? 'W50hyPy2Cl' : 'eVHJlpt7Ac';
		this.targetUser = this.user.username.slice(0, 1) === 'w' ? 'eVHJlpt7Ac' : 'W50hyPy2Cl';

		let socketPath = process.env.NODE_ENV === 'development' ?
			'http://localhost:3003' :
			'https://feelmymeal.herokuapp.com';

		this.socket = io(socketPath);
		this.socket.on('connect',() => {
			this.socketReady = true;
		});
		this.socket.on('rtc offer', msg => {
			console.log('msg received', msg);
			if (msg.to === this.myUser && msg.data.type === 'offer') {
				peer.signal(msg.data)
			} else if (msg.to === this.myUser && msg.data.type === 'answer') {
				peer.signal(msg.data)
			}
		});

		const peer = new Peer({
			initiator: this.user.username.slice(0, 1) === 'w',
			trickle: false
		})
		peer.on('error', err => console.log('error', err))

		peer.on('signal', data => {
			console.log('SIGNAL', data);

			if (this.socketReady) {
				console.log('this.socketReady is: ', this.socketReady);
				this.socket.emit('rtc offer', {from:  this.myUser, to: this.targetUser, data});
			} else {
				setTimeout(() => {
					this.socket.emit('rtc offer', {from:  this.myUser, to: this.targetUser, data});
				}, 2000);
			}

		})
		let peerConnected = false;
		peer.on('connect', () => {
			console.log('CONNECT')
			peerConnected = true;
			peer.send('whatever' + Math.random())
		})

		peer.on('data', data => {
			console.log('data: ' + data)
		})

		peer.on('stream', stream => {
			this.$refs.videoDisplayInc.srcObject = stream;
			this.$refs.videoDisplayInc.play();
		});

		// console.log('support: ', navigator.mediaDevices.getSupportedConstraints());
		const mediaConfig = { audio: { echoCancellation: true }, video: true };
		// const mediaConfig = { audio: false, video: true };
		// console.log('out stream is: ', this.outStream);

		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices.getUserMedia(mediaConfig)
				.then(stream => {
					this.outStream = stream;
					this.$refs.videoDisplay.srcObject = stream;
					this.$refs.videoDisplay.play();
					if (peerConnected) {
						peer.addStream(stream)
					} else {
						setTimeout(() => {
							peer.addStream(stream)
						}, 1000);
					}
					console.log('stream is: ', stream);
				})
				.catch((err) => console.log('err is: ', err.toString()));
		} else {
			console.log('video chat not supported on your device');
		}


				// const peerConfig = {}
				// const peerConfig = { secure: true, debug: 2 };
				// const peerConfig = { host: 'peerjs-test-2.herokuapp.com/myapp', secure: true, debug: 2 }; //only for heroku
				// const peerConfig = {host: 'peerjs-test-2.herokuapp.com', port: 9000, path: '/myapp'}; //only for heroku

        // let id = this.user.username.slice(0, 1) === 'w' ? 'W50hyPy2Cl' : 'eVHJlpt7Ac';
				// console.log('this.id is: ', this.myUser);

        // this.peer = new Peer(id, peerConfig);

				// console.log('this.peer', this.peer);
        // this.peer.on('open', id => {
				// 		console.log('My peer ID is: ' + id);
				// 		this.pingHeroku();
        // });

        // this.peer.on('call', mediaConnection => {
				// 		mediaConnection.answer(this.outStream);
				// 		mediaConnection.on('stream', stream => {
				// 			this.$refs.videoDisplayInc.src = window.URL.createObjectURL(stream);
				// 			this.$refs.videoDisplayInc.play();
				// 	});
        // });

        // this.peer.on('connection', dataConnection => {
        //     // mediaConnection.answer(this.outStream);
        //     console.log('IM CONNECTED TO YOU');
        // });

        // this.peer.on('stream', stream => {
        //     this.$refs.videoDisplayInc.src = window.URL.createObjectURL(stream);
        //     this.$refs.videoDisplayInc.play();
        // });

        // this.peer.on('error', err => {
        //     console.log('we got a problem huston: ' + err);
        // });

    }
}
