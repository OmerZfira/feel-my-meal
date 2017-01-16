import moment from 'moment';
import FullCalendar from 'fullcalendar';
import { mapGetters, mapActions } from 'vuex';

export default {
    data: () => {
        return {
            events: [
            {
                id: '1',
                title: 'Banana, Apple',
                start: 1484210059985,
                end: 1484223059985,
                backgroundColor: '2a3744'
                // allDay: true
            },
            {
                id: '1',
                title: 'feeling',
                rating: 5,
                start: 1484230059985,
                end: 1484223559985,
                textColor: 'black'
            }]
            
        }
    },
    methods: {
        setFeelingColor(){
            let colors = ['','red','red','yellow','yellow','yellow'
                            ,'blue','blue','blue','green','green']
            this.events.forEach(event => {
                if(!event['backgroundColor'] && event['title'] === 'feeling'){
                   event['backgroundColor'] = colors[event['rating']];
                } 
                // console.log('events', event);
            })
        },
    },
    components: {
        moment,
        FullCalendar,

    },
    created () {
        // console.log('dispatching getmeals');
         this.$store.dispatch('getMeals');
         
    },
    computed  : {
        ...mapGetters(['meals', 'loading'])
     },
    mounted() {
        this.setFeelingColor();
        setTimeout(() => this.events = this.meals);
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
        console.log('this.meals',  this.events);
    }
}