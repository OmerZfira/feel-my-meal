import moment from 'moment';

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
        translateTime() {
            this.meals.forEach((meal) => {
                console.log('meal.time', meal.time);  
            })
        }
    },
    components: {
        moment,
        
    },
    mounted() {
        console.log('mashu', this.$refs);
        this.meals.forEach((meal) => {
                // console.log('meal.time', new Date(meal.time));  
                // console.log('meal.time', +moment(meal.time).format('hh'));  
            })
    }
}