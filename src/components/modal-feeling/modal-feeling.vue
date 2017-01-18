<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">

                    <div class="modal-header">
                        <slot name="header">
                            Add Your Feeling
                        </slot>
                    </div>

                    <div class="modal-body">
                        <slot name="body">
                            <feeling-rating @submitRating="currRating = $event"></feeling-rating>
                        </slot>
                    </div>

                    <div class="modal-footer">
                        <slot name="footer">
                            <button @click="submitFeeling" class="btn btn-success btn-lg">Save My Feeling</button>

                            <button class="modal-default-button btn btn-warning btn-lg" @click="$emit('close')">
                                Cancel
                            </button>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import FeelingRating from '../feeling-rating/feeling-rating';
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: 'modal-feeling',
        components: {
            FeelingRating
        },
        data() {
            return {
                currRating: 0
            }
        },
        computed: {
            ...mapGetters(['isloadingFeeling', 'user'])
        },
        methods: {
            submitFeeling() {
                if (this.currRating) {
                    this.$store.dispatch('addFeeling', { rating: this.currRating, userId: this.user._id });
                }
                this.$emit('close');
            }
        }
    }
</script>

<style scoped lang="scss">
    

  .modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  max-width: 500px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-footer {
    display: flex;
    flex-wrap: nowrap;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>