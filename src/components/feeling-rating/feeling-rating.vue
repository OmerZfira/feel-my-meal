<template>
    <div class="star-rating">
        <label class="star-rating__star" v-for="rating in ratings" v-bind:class="{'is-selected': ((value >= rating) && value != null), 'is-disabled': disabled}"
            v-on:mouseover="star_over(rating)" v-on:mouseout="star_out" v-on:click="set(rating)">
            <input
                    class="star-rating star-rating__checkbox"
                    type="radio"
                    v-bind:name="name"
                    v-bind:value="rating"
                    v-bind:required="required"
                    v-bind:id="$index+1"
                    v-bind:disabled="disabled"
                    v-model="value">
            <div class="fa fa-heart" aria-hidden="true"></div>
        </label>
    </div>
</template>

<script>
    export default {
        name: 'feeling-rating',
        data() {
            return {
                temp_value: null,
                ratings: 5,
                value: null
            };
        },
        props: {
            name: String,
            id: String,
            disabled: String,
            required: Boolean
        },
        methods: {
            star_over(index) {
                if (this.disabled == "true") {
                    return;
                }
                this.temp_value = this.value;
                this.value = index;
            },
            star_out() {
                if (this.disabled == "true") {
                    return;
                }
                this.value = this.temp_value;
            },
            set(value) {
                if (this.d == "true") {
                    return;
                }
                this.temp_value = value;
                this.value = value;
                this.$emit('submitRating', value)
            },
        }
    }
</script>

<style>

    .star-rating__checkbox {
        position: absolute;
        overflow: hidden;
        clip: rect(0 0 0 0);
        height: 1px;
        width: 1px;
        margin: -1px;
        padding: 0;
        border: 0;
    }
    .star-rating__star {
        display: inline-block;
        padding: 4px;
        vertical-align: middle;
        line-height: 1;
        font-size: 4em;
        color: #ABABAB;
        -webkit-transition: color;
        transition: color .8s ease;
    }
@media (max-width: 640px) {
    .star-rating__star {
        font-size: 2.8em;
    }
}

    .star-rating__star:hover {
        cursor: pointer;
    }
    .star-rating__star.is-selected {
        color: gold;
    }

    .star-rating__star.is-disabled:hover {
        cursor: default;
    }
</style>