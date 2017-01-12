<template lang="html">

  <section class="admin container below-nav">
    <h1>admin Component</h1>
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
            aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
          <a class="navbar-brand" href="#">Brand</a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li>
              <router-link :to="{ name: 'users' }">Users<span class="sr-only">(current)</span></router-link>
            </li>
            <li>
              <router-link :to="{ name: 'contacts' }">Contacts</router-link>
            </li>
          </ul>

        </div>
      </div>
    </nav>
    <router-view></router-view>
  </section>

</template>

<script lang="js">
  import authService from '../../services/auth.service';

  export default {
    name: 'admin',
    props: [],
    beforeRouteEnter(to, from, next) {
      authService.protectRoute(next);
    },
    mounted() {

    },
    data() {
      return {
      }
    },
    methods: {

    },
    computed: {

    }
  }
</script>

<style scoped lang="scss">
  .admin {

  }
</style>