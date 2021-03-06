
import { mapGetters, mapActions } from 'vuex';
import initSwReg from '../../sw-init';

// const sounds = [ new Audio('../../assets/sound/rec-start.mp3'), new Audio('../../assets/sound/rec-end.mp3')];
// const src = 
// const x = ;

export default {
    data() {
        return {
            recognition: {},
            isRec: false,
            speechElText: '',
            foodsData: [],
            recFb: true,
            sounds: [ 
                    new Audio(require('file-loader!../../assets/sound/rec-start.mp3')),
                    new Audio(require('file-loader!../../assets/sound/rec-end.mp3')) 
                    ]
        }
    },
    computed: {
        foods() {
            return this.foodsData;
        },
        ...mapGetters(['isloadingMeal', 'user', 'settings'])
    },
    methods: {
        startSpeechReco() {
             if (!this.isRec) {
                this.isRec = true;
                this.playSound(0);
                this.recognition.start();
            }
        },
        stopSpeechReco() {
            if (this.isRec && TouchList.length === 0) {
                // console.log('touch list: ', );
                this.recognition.stop();
                this.playSound(1);
            }
            this.isRec = false;
        },
        playSound(i) {
            let otherNoteIdx = (i === 0)? 1 : 0;
            this.sounds[otherNoteIdx].pause();
            this.sounds[otherNoteIdx].currentTime = 0;
            this.sounds[i].play();
            window.navigator.vibrate(100);
        },
        addFood() {
            this.recognition.stop();
            if (this.speechElText) {
                this.foodsData.unshift(this.speechElText);
                this.speechElText = '';
            }
        },
        deleteFood(idx) {
            this.foodsData.splice(idx, 1);
        },
        updateFood(idx, event) {
            this.foodsData[idx] = event.target.innerText;
        },
        submitFood() {
            if (this.foods.length) {
                this.$store.dispatch('addMeal', { foods: this.foods, userId: this.user._id });
                if (!(this.user.settings.pushTimer === -1)) this.pushNotification();
                this.foodsData = [];
                this.speechElText = '';
            }
        },
        pushNotification() {
            let redirectUrl = (process.env.NODE_ENV === 'development') ? 'http://localhost:8080/add-feeling' : 'https://coding-academy.net/feelmymeal/#/add-feeling';
            let pushObj = {
                            foods: this.foods,
                            user: this.user.username,
                            pushTimer: this.user.settings.pushTimer,
                            url: redirectUrl
                          };
            let pushObjAsStr = JSON.stringify(pushObj);

            if (!("Notification" in window)) {
                console.info("This browser does not support system notifications");
            } else if (Notification.permission === "granted") {
                if (this.checkSwController()) initSwReg.swActive().postMessage(pushObjAsStr);
            } else if (Notification.permission !== 'denied') {
                Notification.requestPermission().then( res => {
                    if (res === "granted") {
                        if (this.checkSwController()) initSwReg.swActive().postMessage(pushObjAsStr);
                    }
                });
                // }
                //    });

            } else {
                console.info('Push notifications were denied by user');
            }
        },
        checkSwController() {
            if (initSwReg.swActive()) {
                return true;
            } else {
                // TODO: promise based!
                setTimeout(() => {
                    if (initSwReg.swActive()) {
                        return true;
                    } else {
                        console.info('There was a problem with enabling Push Notifications on your device. Please try to refresh the page.');
                        return false;
                    }
                }, 3000);
            }
        }

    },
    // components: {
    // },
    mounted() {
        if (!('webkitSpeechRecognition' in window)) {
            console.log('webkitSpeechRecognition not supported');
            this.recFb = true;
        } else {
            this.recognition = new webkitSpeechRecognition();
            // this.recognition.continuous = true;
            this.recognition.lang = 'he';
            this.recognition.interimResults = true;

            this.recognition.onstart = () => {
                this.isRec = true;
            }
            this.recognition.onresult = (event) => {
                let allText = '';
                for (let currRes in event.results) {
                    const res = event.results[currRes][0];
                    if (res) {
                        allText += ' ' + res.transcript;
                    }
                }
                this.speechElText = allText;
                //now you can show the results
            }
            this.recognition.onerror = (event) => {
                console.log('onerror', event);
                this.isRec = false;
            }
            this.recognition.onend = () => {
                this.addFood();
                if (this.isRec) this.recognition.start();

            }
        }
    }
}