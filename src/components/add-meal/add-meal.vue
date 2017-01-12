<template>
    <section class="add-meal">
        <div @click="toogleSpeechReco" class="record" :class="{recording : isRec}">
            <div class="fa fa-microphone fa-5x" aria-hidden="true"></div>
        </div>
        <div class="recControls">
            <input type="text" v-model="speechElText" class="recInput" placeholder="Next Food Item">
            <button @click="addFood" class="btn btn-primary btn-lg">Add Food</button>
            <button class="btn btn-success btn-lg">Finish Meal</button>
        </div>
        {{meal}}
    </section>
</template>

<script>

    export default {
        data() {
            return {
                recognition: {},
                isRec: false,
                speechElText: '',
                meal: [],
            }
        },
        computed: {
        },
        methods: {
            toogleSpeechReco() {
                if (this.isRec) this.recognition.stop();
                else this.recognition.start();
            },
            addFood() {
                this.recognition.abort();
                if (this.speechElText) {
                    this.meal.push(this.speechElText);
                    this.speechElText = '';
                }
            }

        },
        components: {
        },
        mounted() {
            if (!('webkitSpeechRecognition' in window)) {
                console.log('webkitSpeechRecognition not supported');
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
                    if (event.error !== 'aborted') console.log('onerror', event);
                    this.isRec = false;
                }
                this.recognition.onend = () => {
                    this.isRec = false;
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    
.add-meal {
    margin-top: 40px;
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



.fa-microphone {
    margin: auto;
}
</style>