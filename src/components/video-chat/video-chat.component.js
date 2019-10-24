'use strict';

import { mapGetters, mapActions } from 'vuex';
import Peer from 'simple-peer';
import io from 'socket.io-client';

export default {
    data() {
        return {
			socket: null,
			socketReady: false,
			peer: null,
			targetUser: 'w',
			userSuffix: 'W50hyPy2Cl',
			myUser: '',
			outStream: null,
			isMutedOut: false, //test microphone for self getUserMedia on nexus5
		}
    },
    computed: {
		...mapGetters(['user']),
		socketTargetUser() {
			return this.targetUser + this.userSuffix;
		},
		myUser() {
			return this.user.username[0] + this.userSuffix;
		},
    },
    methods: {
		toggleMuteOut() {
			this.isMutedOut = !this.isMutedOut;
			this.outStream.getAudioTracks()[0].enabled = this.isMutedOut;
		}
    },
    mounted() {
		let socketPath = process.env.NODE_ENV === 'development' ?
			'http://localhost:3003' :
			'https://feelmymeal.herokuapp.com';

		this.socket = io(socketPath);
		this.socket.on('connect',() => {
			this.socketReady = true;
		});
		this.socket.on('rtc offer', msg => {
			if (msg.to === this.myUser && ['offer', 'answer'].includes(msg.data.type)) {
				peer.signal(msg.data)
			}
		});

		let peerConnected = false;
		const peer = new Peer({
			initiator: this.user.username.slice(0, 1) === 'w',
			trickle: false
		});

		peer.on('error', err => {
			console.log('error', err);
			peerConnected = false;
		});

		peer.on('signal', data => {
			console.log('SIGNAL', data);

			if (this.socketReady) {
				console.log('this.socketReady is: ', this.socketReady);
				this.socket.emit('rtc offer', {from: this.myUser, to: this.socketTargetUser, data});
			} else {
				setTimeout(() => {
					this.socket.emit('rtc offer', {from: this.myUser, to: this.socketTargetUser, data});
				}, 2000);
			}
		});

		peer.on('connect', () => {
			console.log('CONNECT')
			peerConnected = true;
			peer.send('whatever' + Math.random())
		});

		peer.on('data', data => {
			console.log('data: ' + data)
		});

		peer.on('stream', stream => {
			this.$refs.videoDisplayInc.srcObject = stream;
			this.$refs.videoDisplayInc.play();
		});

		const mediaConfig = { audio: { echoCancellation: true }, video: true };
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
    }
}
