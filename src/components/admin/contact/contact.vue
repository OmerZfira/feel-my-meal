<template>
  <div class="email-center">
    <section class="email-content">
      <h1>Contacts</h1>
      <!--<email-list :emails="filteredEmails" @displayEmail="displayEmail" @filter="emailFilter = $event">
      </email-list>
      <email-details v-if="shouldshowDetails" :displayedEmail="displayedEmail" @deleteEmail="deleteEmail" >
      </email-details>
    </section>
    <email-status :barData="[unreadEmailsCounter, emailsDB.length]">
    </email-status>-->
  </div>
</template>
<script>
  // import emailList from '../../components/emails/email-list/email-list.vue';
  // import emailDetails from '../../components/emails/email-details/email-details.vue';
  // import emailStatus from '../../components/emails/email-status/email-status.vue';
  // import moment from 'moment';

  export default {
    data() {
      return {
        emailsDB: [],
        currFilteredEmails: [],
        displayedEmail: {},
        shouldshowDetails: true,
        unreadEmailsCounter: 0,
        emailFilter: {txt:'', readStatus: 'all'}
      }
    },
    methods: {
      displayEmail(emailId) {
        this.shouldshowDetails = true;
        this.emailsDB.forEach(email => {
          if (email.id === emailId) {
            email.isDisplayed = true;
            if(!email.isRead) {
              this.unreadEmailsCounter--;
            }
            this.displayedEmail = email;
            this.displayedEmail.isRead = true;
          } else {
            email.isDisplayed = false;
          }
        });
      },
      reloadEmails() {
          this.$http.get('emails')
              .then(res => res.json())
              .then(emails => {
                  this.emailsDB = emails;
                  this.unreadEmailsCounter = this.emailsDB.length;
              });
      },
      emailSent(email) {
        this.shouldshowDetails = true;
        this.emailsDB.push(email);
      },
      deleteEmail(emailId) {
        this.displayedEmail.subject ='';
        this.displayedEmail.body ='';
        this.$http.delete(`item/${emailId}`);
        this.emailsDB = this.emailsDB.filter(email => email.id !== emailId);
      },
    },
    computed: {
      displayedEmails() {
        if(this.emailFilter.readStatus === 'all') {
          return this.currFilteredEmails = this.emailsDB;
        } else if(this.emailFilter.readStatus === 'read') {
          return this.currFilteredEmails = this.emailsDB.filter(email => {
              return email.isRead;
          });
        } else if (this.emailFilter.readStatus === 'unread') {
            return this.currFilteredEmails = this.emailsDB.filter(email => {
              return !email.isRead;
          });
        }
      },
      filteredEmails() {
        this.displayedEmails;
        let emailTxt = this.emailFilter.txt.toLowerCase();
        let emailReadStatus = this.emailFilter.readStatus;
        return this.currFilteredEmails.filter(email => {
            return (email.subject.toLowerCase().includes(emailTxt) ||
            email.body.toLowerCase().includes(emailTxt))
        });
      }
    },
    components: {
      // emailHeader,
      // emailList,
      // emailDetails,
      // emailStatus,
      // emailCompose
    },
    created(){
      this.reloadEmails();
    }
  }
</script>

<style scoped lang="scss">
  .email-center {
    width: 100%;
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    padding: 10px;
    position: relative;
    height: 100%;
  }

  .email-content {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    border: 2px solid #3a4144;
    height: 100%;
    position: relative;
  }

  @media screen and (max-width: 590px){
    .email-content{
      flex-direction: column;
    }
  }

  ul {
    list-style: none;
  }

  email-status {
    display:flex;
    justify-content: space-around;
  }
</style>