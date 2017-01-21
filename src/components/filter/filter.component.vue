<template>
   <section>

        <label for="usr">Filter Meals</label> 
        <input class="form-control1" type="text" v-model="filterInput" id="usr">
       
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

<style type="scss" scoped>
    h4{
        margin-left: 30px;

        /*TO DO: PUT INPUT INSIDE WRAPPER, (optionally make it flexy), and just give wrapper width*/
    }
    label{
        margin-left: 30px;
    }
   .form-control1 {
  display: block;
  /*width: 100%;*/
  margin-left: 30px;
  height: 34px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
          box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
  -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
       -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
          transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
}
.form-control1:focus {
  border-color: #66afe9;
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);
          box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);
}
.form-control1::-moz-placeholder {
  color: #999;
  opacity: 1;
}
.form-control1:-ms-input-placeholder {
  color: #999;
}
.form-control::-webkit-input-placeholder {
  color: #999;
}

</style>