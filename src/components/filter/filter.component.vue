<template>
   <section>
       <h4>Filter Meals</h4> <input type="text" v-model="filterInput">
       
   </section>
</template>

<script>

import { mapGetters } from 'vuex';
export default {
    props: ['filterTerm'],
    data() {
        return {
            filteredMeals: [],
            filterInput: ''
        }
    },
    methods: {
        filterByfoods(foodName) {

            this.filteredMeals = this.latestMeals.filter((meal) => {
                return meal.foods.some((food) => {
                    return food.toLowerCase().includes(foodName.toLowerCase());
                });
            });
            
            this.$emit('getMeals', this.filteredMeals);    
        }
    },
    computed: {
        ...mapGetters(['latestMeals'])
    },
    watch: {
        filterInput: function() {
            this.filterByfoods(this.filterInput);
        }
    }
}
</script>