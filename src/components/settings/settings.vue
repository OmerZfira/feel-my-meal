<template>
    <section class="below-nav">
        <div class="wrapper flex-column flex-center">

            <h2>Settings</h2>
            <h3 class="title">Remind me to report my feeling after every meal</h3>
            <label class="custom-check">
                <input v-model="shouldPush" type="checkbox" name="onOff">
                <i></i> 
                <span></span>
            </label>
            <h3 class="title">Reminder delay (in hours)</h3>
            <range-slider v-model="sliderValue" :disabled="!shouldPush" :class="{isdisabled : !shouldPush}" 
                          class="slider" min="2" max="4" step="0.5"></range-slider>
            <span class="slider-value"> {{sliderValue}} </span>
            <button @click="saveSettings" @touch="saveSettings" class="btn btn-success btn-lg">Save Settings</button>
        </div>
    </section>
</template>

<script>
    import { mapGetters } from 'vuex';
    import RangeSlider from 'vue-range-slider'

    export default {

        data: () => {
            return {
                shouldPush: true,
                sliderValue: 0,
                lang: null,
            }
        },
        components: {
            RangeSlider
        },
        computed: {
            ...mapGetters(['user', 'isLoadingSettings'])
        },
        methods: {
            saveSettings() {
                let pushTimer = (this.shouldPush) ? this.sliderValue : -1;
                this.$store.dispatch('saveSettings', { settings: { pushTimer: pushTimer, lang: null }, _id: this.user._id });
            },
        },
        mounted() {

            //display settings from db
            if (this.user.settings.pushTimer === -1) {
                this.shouldPush = false;
                this.sliderValue = 4;
            } else {
                this.shouldPush = true;
                this.sliderValue = this.user.settings.pushTimer;
            }
        }
    }
</script>

<style lang="scss" scoped>

.slider {
    width: 60%;
}

 $activeColor: #27ae60;

.btn-success {
    margin-top: 30px;
    min-width: 136px;
    width: 30%;
}

section{
	display: flex;
	flex-direction: column;
	align-items: center;
    /*background-color: $activeColor;*/
	padding: 125px 100px;

    h3.title {
        color: #414a4f;
        text-transform: capitalize; 
        font: bold 32px 'Open Sans', sans-serif;
        margin-bottom: 20px;
        text-align: center;
    }
}

@media (max-width: 1000px){
	section{
		padding: 100px 50px;
	}
}

@media (max-width: 600px){
	section{
		padding: 80px 30px;
	}
}


$width: 100px;
$height: 40px;
$checkedText: "on";
$checkedColor: #59bc65;
$uncheckedText: "off";
$uncheckedColor: #ce3e3e;
$transitionSpeed: .5s;

.custom-check{
    width: $width;
    height: $height;
    border-radius: $height;
    border: 3px solid #e5e5e5;
    background: #f5f5f5;
    display: inline-block;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    -webkit-box-shadow: 0px 0px 5px 0px rgba(50, 50, 50, 0.75);
    -moz-box-shadow:    0px 0px 5px 0px rgba(50, 50, 50, 0.75);
    box-shadow:         0px 0px 5px 0px rgba(50, 50, 50, 0.75);  
    transition: all $transitionSpeed ease ;
    margin: 0 auto;
    margin-top: 5px;
}

.custom-check input{
    display: none;
}

.custom-check i{
    width: $height - 2;
    height: $height - 2;
    border-radius: $height - 2;
    content: " ";
    position: absolute;
    left: 0;
    top: -1px;
    border: 2px solid #b9b9b9;
    transition: all $transitionSpeed ease ;
    background: #ececec; /* Old browsers */
    background: -moz-radial-gradient(center, ellipse cover,  #ececec 0%, #c8c8c8 100%); /* FF3.6+ */
    background: -webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(0%,#ececec), color-stop(100%,#c8c8c8)); /* Chrome,Safari4+ */
    background: -webkit-radial-gradient(center, ellipse cover,  #ececec 0%,#c8c8c8 100%); /* Chrome10+,Safari5.1+ */
    background: -o-radial-gradient(center, ellipse cover,  #ececec 0%,#c8c8c8 100%); /* Opera 12+ */
    background: -ms-radial-gradient(center, ellipse cover,  #ececec 0%,#c8c8c8 100%); /* IE10+ */
    background: radial-gradient(ellipse at center,  #ececec 0%,#c8c8c8 100%); /* W3C */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ececec', endColorstr='#c8c8c8',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
}

.custom-check input:checked + i{
    left: $width - $height - 2;
}
.custom-check input + i + span{
    display: block; 
}

.custom-check input + i + span:after{
    position: absoulute;
    display: block;
    width: $width;
    padding-right: 20px;
    height: $height;
    line-height: $height - 6;
    content: $uncheckedText;
    background: $uncheckedColor;
    color: darken($uncheckedColor, 15%);
    font-size: $height / 2;
    font-family: Arial, sans-serif;
    font-weight: 600;
    text-align: right;
    transition: all $transitionSpeed ease ;
}

.custom-check input:checked + i + span:after{
    content: $checkedText;
    background: $checkedColor;
    color: darken($checkedColor, 15%);
    width: $width;
    text-align: left;
    padding-right: 0;
    padding-left: 20px;
}
</style>