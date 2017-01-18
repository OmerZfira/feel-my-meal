<template>
    <div class="wrapper">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <section class="add-meal" v-show="!isloadingMeal">
            <div @touchstart="startSpeechReco" @touchend="stopSpeechReco" @touchcancel="stopSpeechReco" @mousedown="startSpeechReco"
                @mouseup="stopSpeechReco" @mouseleave="stopSpeechReco" class="record" :class="{recording : isRec}">
                <div class="fa fa-microphone fa-5x" aria-hidden="true"></div>
            </div>
            <div class="recControls-cont">
                <input type="text" v-model="speechElText" @keyup.enter="addFood" class="recInput" placeholder="Next Food Item">
                <div class="recControls-btns">
                    <button v-if="recFb" @click="addFood" class="btn btn-primary btn-lg">Add Food</button>
                    <button @click="submitFood" @touch="submitFood" class="btn btn-success btn-lg">Finish Meal</button>
                </div>
            </div>
            <ul class="list-group">
                <li v-for="(food, index) of foods" class="list-group-item">
                    <button @click="deleteFood(index)" class="btn btn-danger btn-lg badge btn-red">X</button>
                    <div contenteditable="true" @keyup="updateFood(index, $event)">{{food}}
                    </div>
                </li>
            </ul>
        </section>

    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        data() {
            return {
                recognition: {},
                isRec: false,
                speechElText: '',
                foodsData: [],
                recFb: true
            }
        },
        computed: {
            foods() {
                return this.foodsData;
            },
            ...mapGetters(['isloadingMeal', 'user'])
        },
        methods: {
            startSpeechReco() {
                this.isRec = true;
                this.recognition.start();
            },
            stopSpeechReco() {
                this.recognition.stop();
                this.isRec = false;
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
                    // console.log('user: ', this.user);
                    this.$store.dispatch('addMeal', { foods: this.foods, user: this.user._id });

                    let meal = { foods: this.foods, user: this.user.username, pushTimer: 4000 }
                    let mealAsStr = JSON.stringify(meal)
                    navigator.serviceWorker.controller.postMessage(mealAsStr)

                    this.foodsData = [];
                    this.speechElText = '';
                }
            }

        },
        components: {
        },
        mounted() {
            if (!('webkitSpeechRecognition' in window)) {
                console.log('webkitSpeechRecognition not supported');
                this.recFb = true;
            } else {
                this.recognition = new webkitSpeechRecognition();
                // this.recognition.continuous = true;
                // this.recognition.lang = 'en-us';
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
</script>

<style scoped lang="scss">

.wrapper {
    width: 75%;
    display:flex;
    justify-content: center;
    color: #333;
}
.add-meal {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1 0;

}

.record { 
    width: 200px;
    height: 200px;
    color: black;
    cursor: pointer;
    background-color: darkred;
    transition: all 0.5s ease;
    box-shadow: 4px 4px 5px 3px rgba(0,0,0,0.6);
    border-radius: 50%;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    
    &.recording {
        box-shadow: none;
        background-color: red;
        animation-name: pulse;
        animation-duration: 2s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        transform: translateY(4px);
    }
    
    .fa-microphone {
        margin: auto;
    }
 }
 
@keyframes pulse{
	0% { box-shadow: 0px 0px 5px 0px rgba(173,0,0,.3); }
	65% { box-shadow: 0px 0px 5px 26px rgba(173,0,0,.3); }
	90% { box-shadow: 0px 0px 5px 26px rgba(173,0,0,0); }
}

.recControls-cont {
    margin-top: 30px;
    display: flex;
    margin-bottom: 10px;
    width: 100%;
    flex: 1;
    justify-content: space-between;
    
    .recInput {
        font-size: 1.5em;
        font-weight: 700;
        margin-right: 10px;
        flex: 0 1 50%;
        padding: 15px;
        font-size: 18px;
        color: #555;
    }

    .recControls-btns {
        flex: 0 0 45%;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
    }
    button {
        flex-basis: 45%;
    }
}

.list-group{
    width: 100%;
    font-size: 1.4em;
    .btn-red {
        background-color: #d9534f;
        &:hover {
            background-color: #c9302c;
        }
    }

    .list-group-item {
        padding: 7px;
    }
} 

@media (max-width: 1000px) {
    .wrapper {
        width: 85%;
    }
}

@media (max-width: 750px) {
    .wrapper {
        width: 95%;
    }

    .recControls-cont {
        flex-direction: column;
 
        .recInput {
            margin-right: 0;
                   margin-bottom: 10px;
        }
        .recControls-btns {
            justify-content: space-between;
            min-height: 55px;
        }
    }
}


</style>