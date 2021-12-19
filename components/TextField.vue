<template>
<div id="customTextField">
  <v-text-field
    :readonly="!isUserAuthenticated"
    :label="label"
    solo flat filled
    v-model="valueCopy"
    :class="classNames"
    :style="{ width: newWidth }"
    ref="textField"
  ></v-text-field>
</div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default:() => ''
    },
    name: {
      type: String,
      default:() => ''
    },
    value: {
      type: String,
      default:() => ''
    },
    classNames: {
      type: String,
      default:() => ''
    },
  },

  data:() => {
    return {
      valueCopy: '',
      newWidth: '',
    }
  },

  mounted() {
    this.valueCopy = JSON.parse( JSON.stringify(this.value) );

    // calculate default width of field base on content
    //this.resizeField()
  },

  watch: {
    value(newVal) {
      this.valueCopy = JSON.parse( JSON.stringify( newVal ) );
    },

    valueCopy: {
      handler(newVal) {
        if (newVal === "") return;

        this.$emit('newvalue', {
          name: this.name,
          value: this.valueCopy
        });
      },
      deep: true,
    },
  },

  computed: {
    isUserAuthenticated() {
      return this.$store.state.auth.isUserAuthenticated;
    },
  },

  methods: {
    /*
    resizeField() {
      if (this.valueCopy === "") {
        this.newWidth = (this.label.length * 10) + 'px';
        return;
      }
      this.newWidth = (this.valueCopy.length * 10) + 'px';
    },
    */

    clear() {
      this.valueCopy = "";
    }
  },
}
</script>

<style lang="scss">
#customTextField {
  width: 100%;

  span.input {
    min-width: 2em;
  }
  // default text-field style
  .v-text-field input {
    padding: 0;
  }
  .v-text-field--filled > .v-input__control > .v-input__slot, .v-text-field--full-width > .v-input__control > .v-input__slot, .v-text-field--outlined > .v-input__control > .v-input__slot {
    min-height: unset;
    margin: 0;
  }
  .theme--dark.v-text-field--filled:not(.v-input--is-focused):not(.v-input--has-state) > .v-input__control > .v-input__slot:hover {
    background: rgba(255, 255, 255, 0.03);
    border-radius: 0;
  }
  .v-input__slot {
    padding: 0;
    border-bottom: 1px dotted #3e3e3e;
  }
  .v-text-field.v-text-field--enclosed .v-text-field__details {
    display: none;
  }
  .v-text-field.v-text-field--solo .v-input__control {
    min-height: unset;
  }
  .theme--dark.v-text-field--solo > .v-input__control > .v-input__slot {
    background: unset;
  }
}

.anonymousUser {
  #customTextField .v-text-field--filled > .v-input__control > .v-input__slot, #customTextField .v-text-field--full-width > .v-input__control > .v-input__slot, #customTextField .v-text-field--outlined > .v-input__control > .v-input__slot {
    border-bottom: 0;
  }
  #customTextField .theme--dark.v-text-field--filled:not(.v-input--is-focused):not(.v-input--has-state) > .v-input__control > .v-input__slot:hover {
    background: rgba(255, 255, 255, 0);
    border-bottom: 0;
  }
}
</style>