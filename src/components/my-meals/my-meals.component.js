import moment from 'moment';
import FullCalendar from 'fullcalendar';

export default {
    data: () => {
        return {
            
            meals: [{
                id: "1",
                title: "Banana, Apple",
                start: moment(1484210059985).format(),
                end: moment(1484223059985).format(),
                backgroundColor: 'red'
                // allDay: true
            }],

        }
    },
    methods: {

    },
    components: {
        moment,
        FullCalendar,

    },
    mounted() {
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
            events: this.meals,
        })
    }
}