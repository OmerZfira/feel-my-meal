<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">

                    <div class="modal-header">
                        <slot name="header">
                            <h3><strong>Please tell us how do you feel: <br/>(From 1 to 5)</strong></h3>
                        </slot>
                    </div>

                    <div class="modal-body">
                        <!--<slot name="body">-->
                            <!--<feeling-rating @submitRating="currRating = $event"></feeling-rating>-->
                        <!--</slot>-->
                        <!--<div class="fa"  :class="{'confounded': (rating === 1), 'worried': (rating === 2), 'neutral_face': (rating === 3), 'relieved': (rating === 4), 'smiley': (rating === 5)}" aria-hidden="true"></div>-->
                        <form class="modal-body" action="#" method="post">
                            <input type="radio" class="radio" name="example" id="ex1" value="ex1" />
                            <label for="ex1" class="fa confounded" @click="selected(1)"></label>
                            
                            <input type="radio" class="radio" name="example" id="ex2" value="ex2" />
                            <label for="ex2" class="fa worried" @click="selected(2)"></label>
                            
                            <input type="radio" class="radio" name="example" id="ex3" value="ex3" checked/>
                            <label for="ex3" class="fa neutral_face" @click="selected(3)"></label>

                            <input type="radio" class="radio" name="example" id="ex4" value="ex4" />
                            <label for="ex4" class="fa relieved" @click="selected(4)"></label>

                             <input type="radio" class="radio" name="example" id="ex5" value="ex5" />
                            <label for="ex5" class="fa smiley" @click="selected(5)"></label>
                        </form>
                        <!--<div class="emoji-footer"></div>-->
                    </div>

                    <div class="modal-footer">
                        <slot name="footer">
                            <button @click="submitFeeling" class="btn btn-success btn-lg">
                                Save My Feeling
                            </button>

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
                currRating: 0,

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
            },
            selected(rating) {
                this.currRating = rating;               
            }
        }
    }
</script>

<style scoped lang="scss">
.fa {
    cursor: pointer;
    width: 75px;
    height: 75px;
    overflow: hidden;
    background-repeat: no-repeat;
} 
.fa:hover {
    border-bottom: solid 2px darkorange;   
}
.radio {
    opacity: 0;
    /*position: absolute;*/
}

.confounded {
    background-image: url('../../assets/img/confounded.png');
}
.worried {
    background-image: url('../../assets/img/worried.png');

}
.neutral_face {
    background-image: url('../../assets/img/neutral_face.png');

}
.relieved {
    background-image: url('../../assets/img/relieved.png');

}
.smiley {
    background-image: url('../../assets/img/smiley.png');

}
input[type="radio"]:checked + label {
    border: 5px solid darkorange;
}

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
  /*color: #42b983;*/
}

.modal-body {
  margin: 20px 0;
  display: flex;
  justify-content: center;
}

.modal-footer {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
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
 @media (max-width: 640px) {
    .modal-body{
        padding: 0;
    }
    .modal-container {
        padding: 5px 5px;
    }
    label {
        background-size: 35px 35px;
        
    }
    .fa {
        width: 44px;
        height: 44px;
    }
    input[type="radio"]:checked + label {
        border: 5px solid darkorange;
    }   
}   
</style>