<template>

    <nav class="bottom-nav">
        <router-link class="bottom-nav__fixed-button nav-record" :to="{name: 'home'}" v-show="$route.name !== 'home'">
            <!--<div class="record">-->
            <div class="fa fa-microphone fa-2x" aria-hidden="true"></div>
            <!--</div>-->
        </router-link>
        <div class="bottom-nav__fixed-button add-feeling" @click="$emit('shoulddisplay')">
            <div class="fa fa-heart fa-2x" aria-hidden="true"></div>
        </div>
    </nav>

</template>

<script>

    export default {
        name: 'bottom-nav',
        data() {
            return {
            }
        },
    }
</script>


<style scoped lang="scss">

.bottom-nav__fixed-button {
    display: block;
    position: fixed;
    bottom: 50px;
    width: 120px;
    height: 120px;
    color: black;
    cursor: pointer;
    box-shadow: 4px 7px 5px 0px rgba(0,0,0,0.6);
    border-radius: 50%;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;

    &:active {
        box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.6);
        transform: translateY(2px);
    }
}

.add-feeling { 
  background-color: yellow;
  left: 50px;

}

.nav-record { 
  background-color: red;
  right: 50px;

  &:active, &:hover {
      text-decoration: none;
  }
}

@media (max-width: 1000px) {
    .bottom-nav__fixed-button {
        bottom: 35px;
        width: 90px;
        height: 90px;
    }

    .add-feeling { 
        left: 35px;
    }

    .nav-record { 
        right: 35px;
    } 
}

@media (max-width: 750px) {
    .bottom-nav__fixed-button {
        bottom: 25px;
        width: 70px;
        height: 70px;
    }

    .add-feeling { 
        left: 25px;
    }

    .nav-record { 
        right: 25px;
    } 

}


</style>