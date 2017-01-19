<template>
   <section>
       <div class="form-group">
        <label for="usr">Filter Meals</label> 
        <input class="form-control" type="text" v-model="filterInput" id="usr">
       </div>
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

<style type="scss">
    h4{
        margin-left: 30px;
    }
    label{
        margin-left: 30px;
    }

</style>