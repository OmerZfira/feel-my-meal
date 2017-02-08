<template>
    <section class="below-nav">
        <h1> My Statistics Component</h1>
        <h3>Common Foods</h3>

        <h2 v-if="loadingStats">LOADING</h2>
        <vue-chart v-else chart-type="BubbleChart" 
                :columns="chartColumns" 
                :rows="chartRows"
                :options="options">

        </vue-chart>
    </section>
</template>

<script>   
    import { mapGetters, mapActions } from 'vuex';

    const FOUR_HOURS = 14400000;

    export default {
        data: () => {
            return {
                loadingStats: true,
                stats: {
                    bread: { feelingAvg: 3, popularity: 5 },
                    pizza: {feelingAvg: 1.5, popularity: 10 },
                    tomato: {feelingAvg: 4.5, popularity: 2 }
                },
                tempstats: {},
                chartColumns: [
                    {type: 'string', label: 'Food'},
                    {type: 'number', label: 'X'},
                    {type: 'number', label: 'Y'},
                    {type: 'number', label: 'temp'},
                    {type: 'number', label: 'pop'}
                ],
                options: {
                    // title: 'Most Popular Foods',
                    height: 350,
                    animation: {duration: 1000, easing: 'inAndOut', startup: true},
                    colorAxis: {minValue: 1, maxValue: 5, colors: ['red', 'yellow', 'green']},
                    sizeAxis: {maxSize: 40, minSize: 10},
                    chartArea:{top:40,width:'80%',height:'80%'}
                }
            }
        },
        methods: {
            ...mapActions([ 'getFeelingsByUser', 'getMealsByUser']),
            
            relateFeelingsToMeals(meals, feelings) {
                let tempFeelings = [...feelings];
                let relatedData = meals.map(meal => {
                    tempFeelings.forEach((feeling, idx) => {
                        if ((feeling.time >= meal.time) && (feeling.time - FOUR_HOURS <= meal.time)) {
                            if (!meal.feelingTotal) {
                                meal.feelingTotal = feeling.rating;
                                meal.feelingCount = 1;
                            }
                            else {
                                meal.feelingTotal += feeling.rating;
                                meal.feelingCount++;
                            }
                        //remove feeling from feelings if its too back in time and wont relate to any meal anymore
                        } else if (feeling.time < meal.time) {
                            //TODO


                        //stop iteration when too late time...
                        } else if (feeling.time > meal.time) {
                            //TODO
                        }
                    });
                    if (!!meal.feelingCount) meal.feelingAvg = meal.feelingTotal / meal.feelingCount;
                    delete meal.feelingTotal;
                    delete meal.feelingCount;
                    return meal;
                });
                return relatedData;
            },
            reduceMealsToFoodsObj(meals) {
                let stats =  {};
                meals.forEach(meal => {
                    if (!!meal.feelingAvg) {
                        meal.foods.forEach(food => {
                            if (!!stats[food]) {
                        console.log('old food !!');
                                stats[food].feelingAvg += meal.feelingAvg;
                                stats[food].popularity++;
                            } else {
                        console.log('new food !!');
                                stats[food] = {};
                                stats[food].feelingAvg = meal.feelingAvg;
                                stats[food].popularity = 1;
                            }
                        });
                    }
                });

                return stats
            }
        },
        computed: {
            ...mapGetters([ 'feelings', 'user', 'currMeal']),
            chartRows() {

                //  tomato: { name: 'tomato', feelingAvg: 5, popularity: 2 }
                // :rows="[['bread', 5, 1,5,26],['pizza', 1, 2,3,4],['tomato', 5,5,5,10]]"

                // let data = this.stats.map( (foodObj, idx) => {
                let rows = [];
                for (let food in this.stats) {
                    let temp = [];
                    temp.push(food);
                    temp.push(Math.random());
                    temp.push(Math.random());
                    temp.push(this.stats[food].feelingAvg);
                    temp.push(this.stats[food].popularity);
                    rows.push(temp);
                }
                return rows
            }
        },
        mounted() {
            let PrmFeelingsByUser = this.getFeelingsByUser(this.user);
            let PrmMealsByUser = this.getMealsByUser(this.user);

            Promise.all([PrmMealsByUser, PrmFeelingsByUser]).then(values => {
                // console.log('data is : ', values);
                this.loadingStats = false;
                let relatedData = this.relateFeelingsToMeals(...values);
                console.log('returned meals: ', relatedData);
                this.stats = this.reduceMealsToFoodsObj(relatedData);
                console.log('this tempstats: ', this.tempstats);
            });
        },
    }
</script>

<style lang="scss" scoped>

</style>