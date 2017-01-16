import moment from 'moment';
import FullCalendar from 'fullcalendar';
import { mapGetters, mapActions } from 'vuex';

export default {
    data: () => {
        return {
            events: [],
            firstMeals: [],
            firstFeelings: []
        }
    },
    methods: {
        setFeelingColor(rating) {
            let colors = ['', 'red', 'yellow', 'orange', 'blue', 'green'];
            return colors[rating];
        },
        translateMeals(meal) {
            let newMeal = {};
            newMeal['start'] = meal.time;
            newMeal['end'] = meal.time - 1600000;
            newMeal['title'] = meal.foods.join();
            this.firstMeals.push(newMeal);
        },
        translateFeelings(feeling) {
            let newFeeling = {};
            newFeeling['title'] = 'Feeling';
            newFeeling['start'] = feeling.time + 1600000;
            newFeeling['end'] = feeling.time;
            newFeeling['backgroundColor'] = this.setFeelingColor(feeling.rating);
            this.firstFeelings.push(newFeeling);
        }
    },
    mounted() {
        // this.setFeelingColor();
        // setTimeout(() => this.events = this.meals);
        var prmMeals = this.$store.dispatch('getMeals').then(meals => {
            meals.forEach(meal => {
                this.translateMeals(meal);
            });
        });
        var prmFeelings = this.$store.dispatch('getFeelings').then((feelings) => {
            feelings.forEach((feeling) => {
                this.translateFeelings(feeling)
            });

        });
        Promise.all([prmMeals, prmFeelings]).then(values => {
            this.events = this.firstMeals.concat(this.firstFeelings);
            console.log(this.events);
            $('.calendar').fullCalendar({
                // put your options and callbacks here

                // hiddenDays: [  4, 5,6 ], //choose which days to hide
                // hiddenDays: [ 0, 1,2,3 ],

                header: { center: 'month, agendaWeek' }, // buttons for switching between views
                views: {
                    month: { // name of view
                        titleFormat: 'YYYY, MM, DD' // name of view
                        // other view-specific options here
                    },
                    agendaWeek: {
                        titleFormat: 'YYYY, MM, DD'
                    }
                },
                events: this.events,
            })
        });

    },

    computed: {
        ...mapGetters(['meals', 'feelings', 'loading'])
    },
    components: {
        moment,
        FullCalendar,

    }
}