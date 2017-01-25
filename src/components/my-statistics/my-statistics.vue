<template>
    <section class="below-nav">
        <h1> My Statistics Component</h1>
        <h3>Common Foods</h3>

        <h2 v-if="loadingStats">LOADING</h2>
        <vue-chart v-else chart-type="PieChart" :columns="[{type: 'string', label: 'Food'},{type: 'number', label: 'Feeling'}]" :rows="[['bread', 3],['pizza', 1],['tomato', 5]]">

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
                stats: [
                    { name: 'bread', feelingAvg: 3, popularity: 6 },
                    { name: 'pizza', feelingAvg: 1, popularity: 2 },
                    { name: 'tomato', feelingAvg: 5, popularity: 10 }
                ]
            }
        },
        // methods: {
        //     ...mapActions([ 'getFeelingsByUser', 'getMealsByUser']),
            
        //     relateFeelingsToMeals(meals, feelings) {
        //         let tempFeelings = [...feelings];
        //         let relatedData = meals.map(meal => {
        //             tempFeelings.forEach((feeling, idx) => {
        //                 if ((feeling.time >= meal.time) && (feeling.time - FOUR_HOURS <= meal.time)) {
        //                     if (!meal.ratingTotal) {
        //                         meal.ratingTotal = feeling.rating;
        //                         meal.ratingCount = 1;
        //                     }
        //                     else {
        //                         meal.ratingTotal += feeling.rating;
        //                         meal.ratingCount++;
        //                     }
        //                 //remove feeling from feelings if its too back in time and wont relate to any meal anymore
        //                 } else if (feeling.time < meal.time) {
        //                     //TODO


        //                 //stop iteration when too late time...
        //                 } else if (feeling.time > meal.time) {
        //                     //TODO
        //                 }
        //             });
        //             if (!!meal.ratingCount) meal.ratingAvg = meal.ratingTotal / meal.ratingCount;
        //             delete meal.ratingTotal;
        //             delete meal.ratingCount;
        //             return meal;
        //         });
        //         return relatedData;
        //     },
        //     reduceMealsToFoods(meals) {
                
        //     }
        // },
        // computed: {
        //     ...mapGetters([ 'feelings', 'user', 'currMeal']),
        // },
        // mounted() {
        //     let PrmFeelingsByUser = this.getFeelingsByUser(this.user);
        //     let PrmMealsByUser = this.getMealsByUser(this.user);

        //     Promise.all([PrmMealsByUser, PrmFeelingsByUser]).then(values => {
        //         // console.log('data is : ', values);
        //         this.loadingStats = false;
        //         let relatedData = this.relateFeelingsToMeals(...values);
        //         // console.log('returned meals: ', relatedData);
        //         let foods = this.reduceMealsToFoods(relatedData);
        //     });
        // },
    }
</script>

<style lang="scss" scoped>

</style>