import moment from 'moment';
import FullCalendar from 'fullcalendar';
import { mapGetters, mapActions } from 'vuex';
import authService from '../../services/auth.service';
import {SIGN_IN} from '../../modules/auth/auth.module';
const TIME_DIFF = 1600000;
const dayOfTheWeek = moment().day();


export default {
    data: () => {
        return {
            isTurnPrevPage: false,
            isTurnNextPage: false,
            daysStack: 0,
            events: [],
            firstMeals: [],
            firstFeelings: []
        }
    },
    methods: {
        changeDays(diff) {
            if(diff === 'prev' && this.daysStack === 1) {
                this.daysStack = 0;
                this.isTurnPrevPage = false;
            } else {
                this.isTurnPrevPage = true;
            } 

            if(diff === 'next' && this.daysStack === 0) {
                this.daysStack = 1;
                this.isTurnNextPage = false;
            } else {
                this.isTurnNextPage = true;
            } 

            var hiddenDays =  $('.calendar').fullCalendar('option', 'hiddenDays');
            if(hiddenDays[0] === 4) {
                $('.calendar').fullCalendar('option', 'hiddenDays', [0,1,2]);
            } else {
                $('.calendar').fullCalendar('option', 'hiddenDays', [4,5,6]);
            }
            
            if(this.daysStack === 0 && diff === 'prev' && this.isTurnPrevPage){
                $('.calendar').fullCalendar(diff);
                this.daysStack = 1;
            } 
            if(this.daysStack === 1 && diff === 'next' && this.isTurnNextPage){
                $('.calendar').fullCalendar(diff);
                this.daysStack = 0;
            } 
        },
        setFeelingColor(rating) {
            let colors = ['', 'red', 'yellow', 'orange', 'blue', 'green'];
            return colors[rating];
        },
        translateMeals(meal) {
            
            let newMeal = {};
            newMeal['start'] = meal.time;
            newMeal['end'] = meal.time - TIME_DIFF;
            newMeal['title'] = meal.foods.join();
            this.firstMeals.push(newMeal);
        },
        translateFeelings(feeling) {
            let newFeeling = {};
            newFeeling['title'] = 'Feeling';
            newFeeling['start'] = feeling.time + TIME_DIFF;
            newFeeling['end'] = feeling.time;
            newFeeling['backgroundColor'] = this.setFeelingColor(feeling.rating);
            this.firstFeelings.push(newFeeling);
        }
    }, 
  
    mounted() {
        // console.log('user', this.user._id);
        
        var prmMeals = this.$store.dispatch('getMealsByUser', this.user).then(meals => {
            
            meals.forEach(meal => { 
                this.translateMeals(meal);
            });
        });
        var prmFeelings = this.$store.dispatch('getFeelingsByUser', this.user).then((feelings) => {
            feelings.forEach((feeling) => {
                this.translateFeelings(feeling)
            });

        });
        Promise.all([prmMeals, prmFeelings]).then(values => {
            this.events = this.firstMeals.concat(this.firstFeelings);
            let daysToShow = (dayOfTheWeek > 3)? [0,1,2] : [4,5,6];
            
                $('.calendar').fullCalendar({
                    // put your options and callbacks here
                    
                    hiddenDays: daysToShow, //choose which days to hide

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
                    defaultView: 'agendaWeek'
                })
            
        });
        setTimeout(() => {
            $('.fc-button-prev').click(function(){
                console.log('clicked');
             });
        }, 500)

    },

    computed: {
        ...mapGetters(['meals', 'feelings', 'loading', 'user', 'latestMeals']),
        
    },
    components: {
        moment,
        FullCalendar,

    }
}