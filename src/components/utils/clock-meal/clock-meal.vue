<template>
    <div class="wrapper">
        <h2>
            <span>{{updateTime}}</span>
        </h2>
    </div>
</template>

<script>
    import moment from 'moment';

    export default {
        name: 'clock-meal',
        data() {
            return {
                timeformat: 'HH : mm : ss',
                currTime: moment(Date.now()).format(this.timeformat),
                clockTimeout: ''
            }
        },
        created() {
            this.clockTimeout = setInterval(() => {
                this.currTime = moment(Date.now()).format(this.timeformat);
            }, 1000);
        },
        computed: {
            updateTime() {
                return this.currTime;
            },
        },
        destroyed() {
            clearTimeout(this.clockTimeout)
        },
    }
</script>

<style scoped lang="scss">
h2 {
  font-family: "Montserrat", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 700;
  
  span {
    padding: 5px;
    border: 3px solid #333;
    border-radius: 10px;
  }
}
.wrapper {
    text-align: center;
}
</style>