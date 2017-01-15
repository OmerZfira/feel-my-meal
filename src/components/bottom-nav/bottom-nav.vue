<template>

    <nav class="bottom-nav">
        <router-link class="nav-record" :to="{name: 'home'}" v-show="$route.name !== 'home'">
            <div class="record">
                <div class="fa fa-microphone fa-2x" aria-hidden="true"></div>
            </div>
        </router-link>
        <div class="add-feeling" @click="$emit('shoulddisplay')">
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

    .nav-record {
  display: block;
  position: fixed;
  bottom: 50px;
  right: 50px;
  z-index: 999;
  

  &:hover, &:active {
    text-decoration: none;
  }

  .record { 
      width: 75px;
      height: 75px;
      color: black;
      cursor: pointer;
      background-color: green;
      box-shadow: 4px 7px 5px 0px rgba(0,0,0,0.6);
      border-radius: 50%;
      margin: auto;
      display: flex;
      justify-content: center;
      align-items: center;
  }
}

.add-feeling { 

  display: block;
  position: fixed;
  bottom: 50px;
  left: 50px;
  width: 75px;
  height: 75px;
  color: black;
  cursor: pointer;
  background-color: yellow;
  box-shadow: 4px 7px 5px 0px rgba(0,0,0,0.6);
  border-radius: 50%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;

  }

</style>