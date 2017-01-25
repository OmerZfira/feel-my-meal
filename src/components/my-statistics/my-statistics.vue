<template>
    <section class="below-nav">
        <h1> My Statistics Component</h1>
        <h3>Common Foods</h3>
        <vue-chart 
            chart-type="PieChart" 
            :columns="[{type: 'string', label: 'Food'},{type: 'number', label: 'Feeling'}]" 
            :rows="[['bread', 3],['pizza', 1],['tomato', 5]]">
        </vue-chart>
    </section>
</template>

<script>   

    export default {
        data: () => {
            return {
                stats: [
                    { name: 'bread', feelingAvg: 3, popularity: 6 },
                    { name: 'pizza', feelingAvg: 1, popularity: 2 },
                    { name: 'tomato', feelingAvg: 5, popularity: 10 }
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>