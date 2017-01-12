import moment from 'moment';
import FullCalendar from 'fullcalendar';


export default {
    data: () => {
        return {
            dayInMonthNum: +moment().format().substr(5,5).substr(3,5),
            dayInMonthStr: moment().format('dddd'),
            // tomorrow: moment().weekday(0),
            meals: [{
                        _id: "58773fb3036f4b25abe93b9c",
                        foods: [
                            "Banana",
                            "Apple"
                        ],
                        time: 1484210059985,
                        userId: "58773eec036f4b25abe93b03"
                    },
                    {
                        _id: "58773eb3036f4b25abe93b9c",
                        foods: [
                            "Pasta",
                            "Tortilla"
                        ],
                        time: 1484710359985,
                        userId: "58773fec036f4b25abe93b03"
                    }]
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
     
            hiddenDays: [ 4,5,6 ],
            // hiddenDays: [ 0,1,2 ]
        });

    }
}