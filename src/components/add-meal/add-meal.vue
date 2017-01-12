<template>
    <div class="wrapper">
    <section class="add-meal" v-show="!isloadingMeal">
        <div @mousedown="startSpeechReco" @mouseup="stopSpeechReco" @mouseleave="stopSpeechReco" class="record" :class="{recording : isRec}">
            <div class="fa fa-microphone fa-5x" aria-hidden="true"></div>
        </div>
        <div class="recControls">
            <input type="text" v-model="speechElText" @keyup.enter="addFood" class="recInput" placeholder="Next Food Item">
            <button v-if="recFb" @click="addFood" class="btn btn-primary btn-lg">Add Food</button>
            <button @click="submitFood" class="btn btn-success btn-lg">Finish Meal</button>
        </div>
        <ul class="list-group">
            <li v-for="(food, index) of foods" class="list-group-item">
                <button @click="deleteFood(index)" class="btn btn-danger btn-lg badge btn-red">X</button>
                <div contenteditable="true">{{food}}
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
                foods: [],
                recFb: true
            }
        },
        computed: {
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
                // this.isRec = false;
                if (this.speechElText) {
                    this.foods.unshift(this.speechElText);
                    this.speechElText = '';
                }
            },
            deleteFood(idx) {
                this.foods.splice(idx, 1);
            },
            submitFood() {
                if (this.foods) {
                    this.$store.dispatch('addMeal', { foods: this.foods, userId: this.user._id });
                    this.foods = [];
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
    margin-top: 150px;
    display:flex;
    justify-content: center;
}
.add-meal {
    max-width: 600px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.record { 
    width: 200px;
    height: 200px;
    color: black;
    cursor: pointer;
    background-color: green;
    box-shadow: 4px 7px 5px 0px rgba(0,0,0,0.6);
    border-radius: 50%;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    
    &.recording {
        background-color: red;
    }
 }

.recControls {
    margin-top: 30px;
    display: flex;

    .recInput {
        font-size: 1.5em;
        font-weight: 700;
    }
}

.list-group{
    width: 100%;
    .btn-red {
        background-color: #d9534f;
        &:hover {
            background-color: #c9302c;
        }
    }
} 


.fa-microphone {
    margin: auto;
}

</style>