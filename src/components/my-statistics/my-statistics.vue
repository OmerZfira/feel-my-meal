<template>
    <section class="below-nav">
        <h1>My Statistics</h1>
        
        <!--<transition name="fade" mode="out-in">-->
        <!--<loader-pan v-show="loadingStats || loadingChart"></loader-pan>-->
        <!--</transition>-->
        <div class="wrapper flex flex-column justify-center align-center" v-if="!loadingStats">
        <!--TODO: MAKE INSTRUCTION APEAR ON TRANSITION-->
        <p class="chart-instructions">
            How to tell which foods are recommended for you? <br/>
            <span class="bad-food-a">Red </span>
            <span class="bad-food-b">foods are</span> 
            <span class="bad-food-c">less recommended</span> and <br class="break-line-mobile"/> 
            <span class="good-food-a">green</span>  
            <span class="good-food-b">foods are</span>
            <span class="good-food-c">more recommended</span>.<br/>
            Size indicates the number of times you have consumed this food.
        </p>
        <vue-chart chart-type="BubbleChart" 
                :chart-events="chartEvents"
                :columns="chartColumns" 
                :rows="chartRows"
                :options="options">

        </vue-chart>

        </div>
    </section>
</template>

<script>   
    import { mapGetters, mapActions } from 'vuex';
    import loaderPan from '../utils/loader-pan/loader-pan.vue';

    const FOUR_HOURS = 14400000;

    export default {
        components: {
            loaderPan
        },
        data: () => {
            return {
                loadingChart: true,
                loadingStats: true,
                stats: {
                    bread: { feelingAvg: 3, popularity: 5 },
                    pizza: {feelingAvg: 1.5, popularity: 10 },
                    tomato: {feelingAvg: 4.5, popularity: 2 }
                },
                
                //remove after meetup
                mockRandom: [8, 3, 5, 10, 9, ,6 ,1, 7, 8, 9],
                mockCounter: 1,
                ///////

                chartColumns: [
                    {type: 'string', label: 'Food'},
                    {type: 'number', label: ''},
                    {type: 'number', label: ''},
                    {type: 'number', label: 'Avarage Feeling'},
                    {type: 'number', label: 'Popularity'}
                ],
                options: {
                    height: 400,
                    // animation: {duration: 1000, easing: 'inAndOut', startup: true},
                    colorAxis: {minValue: 1, maxValue: 5, colors: ['red', 'yellow', 'green'], legend: {}},
                    sizeAxis: {maxSize: 40, minSize: 10},
                    chartArea:{top:40,width: '100%', height:'100%'},
                    vAxis: {textPosition: 'none', textStyle: {color: 'white'}, baselineColor: 'white', 
                        ticks: [-2,12], gridlines: {color: 'white', count: 4}},
                    hAxis: {textPosition: 'none', textStyle: {color: 'white'}, baselineColor: 'white', 
                        ticks: [0,6], gridlines: {color: 'white', count: 4}},
                    // tooltip: {trigger: 'none'},
                    explorer: {zoomDelta: 1.2},
                     
                    
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
                                stats[food].feelingAvg += meal.feelingAvg;
                                stats[food].popularity++;
                            } else {
                                stats[food] = {};
                                stats[food].feelingAvg = meal.feelingAvg;
                                stats[food].popularity = 1;
                            }
                        });
                    }
                });

                // divide the feleing by popularity to get avarage
                for (let food in stats) {
                    stats[food].feelingAvg = stats[food].feelingAvg / stats[food].popularity;
                }
                return stats
            }
        },
        computed: {
            ...mapGetters([ 'feelings', 'user', 'currMeal']),
            // loadingChart(isLoading = true) {
            //     return isLoading
            // },
            chartEvents() {
                return {
                    'ready': () => { 
                                        this.loadingChart = false;
                                    } 

                        }
                },
            chartRows() {
                let rows = [];
                for (let food in this.stats) {
                    let temp = [];
                    temp.push(food);
                    temp.push(this.stats[food].feelingAvg);
                    temp.push(this.mockCounter); //set back to random after meetup
                    this.mockCounter++;

                    temp.push(this.stats[food].feelingAvg);
                    temp.push(this.stats[food].popularity);
                    rows.push(temp);
                }
                return rows
            },
            foodCount() {
                return Object.keys(this.stats).length
            },
        },
        mounted() {
            let PrmFeelingsByUser = this.getFeelingsByUser(this.user);
            let PrmMealsByUser = this.getMealsByUser(this.user);

            Promise.all([PrmMealsByUser, PrmFeelingsByUser]).then(values => {
                this.loadingStats = false;
                let relatedData = this.relateFeelingsToMeals(...values);
                this.stats = this.reduceMealsToFoodsObj(relatedData);
            });
        },
    }
</script>

<style lang="scss" scoped>
section{
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 125px 100px;

    h3.title {
        color: #414a4f;
        text-transform: capitalize; 
        font: bold 32px 'Open Sans', sans-serif;
        margin-bottom: 20px;
        text-align: center;
    }
}

.chart-instructions {
    font-weight: 700;
    span {
        text-shadow:     -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000; 
    }
}
.good-food-a {
    color: #99ff33;
}
.good-food-b {
    color: #66ff33;
}
.good-food-c {
    color: #00cc00;
}
.bad-food-a {
    color: red;
}
.bad-food-b {
    color: #ff8c1a;
}
.bad-food-c {
    color: #ffbf00;
}

.wrapper {
    width: 100%;
}

.break-line-mobile {
    display: none;
}

@media (max-width: 1000px){
	section{
		padding: 100px 50px;

	}
}

@media (max-width: 600px){
	section{
		padding: 80px 30px;
        h1 {
		    font-size: 32px;
	    }
        .chart-instructions {
		    font-size: 11px;
	    }
        
	}

    .chart-instructions {
        span {
            text-shadow: 1px 1px #333;
        }
}
}
@media (max-width: 500px){
	section{
		padding: 80px 30px;
        h1 {
		    font-size: 26px;
	    }
        .break-line-mobile {
            display: block;
        }      
	}
}

.hero h1{
		font-size: 42px;
	}

	.hero h3{
		font-size: 20px;
	}


.vue-chart-container {
    width: 100%;
    cursor: move;
    cursor: grab;
    &:active {
        cursor: grabbing;
    }

}
.vue-chart {
    width: 100%;

}
</style>