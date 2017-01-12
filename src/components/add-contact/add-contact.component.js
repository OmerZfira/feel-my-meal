export default {
    name: 'add-contact',

    data() {
        return {
            contactDetails: {
                name: '',
                email: '',
                phone: '',
                msg: ''
            },
            shouldShowForm: true
        }
    },
    methods: {
        submitForm(contactDetails) {
                this.$http.post('http://localhost:3003/data/contact', contactDetails)
                    .then(res => res.json())
                    .then(data => {
                        this.shouldShowForm = false
                        setTimeout(() => {
                            this.shouldShowForm = true;
                        }, 5000)
                    })
                    .catch (err => console.log('error:', err));
        }
    }
}
