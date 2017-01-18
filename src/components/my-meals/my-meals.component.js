import moment from 'moment';
import FullCalendar from 'fullcalendar';
import { mapGetters, mapActions } from 'vuex';
import authService from '../../services/auth.service';
import {SIGN_IN} from '../../modules/auth/auth.module';
import filtercom from '../filter/filter.component';

const TIME_DIFF = 1600000;
const dayOfTheWeek = moment().day();


export default {
    data: () => {
        return {
            filteredMeals: [],
            isTurnPrevPage: false,
            isTurnNextPage: false,
            daysStack: 0,
            daysToHide: [0,1,2],
            currView: 'week',
            events: [],
            firstMeals: [],
            firstFeelings: []
        }
    },
    methods: {

        changeDays(diff) {
            if(this.currView === 'week') {
                
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
                    (hiddenDays[0] === 0)? this.daysToHide = [4,5,6] : this.daysToHide = [0,1,2];
                    
                    $('.calendar').fullCalendar('option', 'hiddenDays', this.daysToHide);
                
                // $('.calendar').fullCalendar( 'changeView', 'month' )

                if(this.daysStack === 0 && diff === 'prev' && this.isTurnPrevPage){
                    $('.calendar').fullCalendar(diff);
                    this.daysStack = 1;
                } else if(this.daysStack === 1 && diff === 'next' && this.isTurnNextPage){
                    $('.calendar').fullCalendar(diff);
                    this.daysStack = 0;
                } 
            } else {
                $('.calendar').fullCalendar(diff);
            }
        },
        changeView(view) {
            $('.calendar').fullCalendar( 'changeView', view );
            if(view === 'month') {
                $('.calendar').fullCalendar('option', 'hiddenDays', '');
                this.currView = 'month';
            }  else {
                $('.calendar').fullCalendar('option', 'hiddenDays', this.daysToHide);
                this.currView = 'week';
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
            newMeal['textColor'] = 'white'
            this.firstMeals.push(newMeal);
        },
        translateFeelings(feeling) {
            let newFeeling = {};
            newFeeling['title'] = 'Feeling rating: ' + feeling.rating;
            newFeeling['start'] = feeling.time;
            newFeeling['end'] = feeling.time;
            newFeeling['textColor'] = 'black';
            newFeeling['backgroundColor'] = this.setFeelingColor(feeling.rating);
            this.firstFeelings.push(newFeeling);
        }
    }, 
    
        mounted() {
            
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
                        customButtons: {
                            myCustomButton: {
                                text: 'Today',
                                click: function() {
                                    $('.calendar').fullCalendar( 'changeView', 'basicDay' );
                                    
                                }
                            }
                        },
                        header: {
                            right: 'myCustomButton',
                        }, 
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
        },

        computed: {
            ...mapGetters(['meals', 'feelings', 'loading', 'user', 'latestMeals']),
        },
        components: {
            moment,
            FullCalendar,
            filtercom
        },
        watch: {
            filteredMeals: function() {
                this.firstMeals = [];
                this.filteredMeals.forEach((meal) => {
                    this.translateMeals(meal);
                });
                $('.calendar').fullCalendar( 'removeEvents' );
                $('.calendar').fullCalendar( 'renderEvents', this.firstMeals );
        },
    }
}