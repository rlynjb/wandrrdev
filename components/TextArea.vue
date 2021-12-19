<template>
<div id="customTextArea">
  <v-textarea
    :readonly="!isUserAuthenticated"
    :placeholder="label"
    solo flat filled auto-grow
    v-model="valueCopy"
    :class="classNames"
    rows="1"
  ></v-textarea>
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
    }
  },

  created() {
    this.valueCopy = JSON.parse( JSON.stringify(this.value) );
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
    clear() {
      this.valueCopy = "";
    }
  },
}
</script>

<style lang="scss">
#customTextArea {
  width: 100%;

  // default text-area style
  .v-application--is-ltr .v-textarea.v-text-field--enclosed .v-text-field__slot textarea {
    padding-right: 0;
  }
  .v-textarea.v-text-field--box.v-text-field--single-line:not(.v-input--dense) .v-text-field__prefix, .v-textarea.v-text-field--box.v-text-field--single-line:not(.v-input--dense) .v-text-field__suffix, .v-textarea.v-text-field--box.v-text-field--single-line:not(.v-input--dense) textarea, .v-textarea.v-text-field--box.v-text-field--outlined:not(.v-input--dense) .v-text-field__prefix, .v-textarea.v-text-field--box.v-text-field--outlined:not(.v-input--dense) .v-text-field__suffix, .v-textarea.v-text-field--box.v-text-field--outlined:not(.v-input--dense) textarea, .v-textarea.v-text-field--enclosed.v-text-field--single-line:not(.v-input--dense) .v-text-field__prefix, .v-textarea.v-text-field--enclosed.v-text-field--single-line:not(.v-input--dense) .v-text-field__suffix, .v-textarea.v-text-field--enclosed.v-text-field--single-line:not(.v-input--dense) textarea, .v-textarea.v-text-field--enclosed.v-text-field--outlined:not(.v-input--dense) .v-text-field__prefix, .v-textarea.v-text-field--enclosed.v-text-field--outlined:not(.v-input--dense) .v-text-field__suffix, .v-textarea.v-text-field--enclosed.v-text-field--outlined:not(.v-input--dense) textarea {
    margin-top: 0;
  }
  .v-application--is-ltr .v-textarea.v-text-field--enclosed .v-text-field__slot {
    margin-right: 0;
  }
  .theme--dark.v-text-field--solo > .v-input__control > .v-input__slot {
    background: unset;
    border-radius: 0;
  }
  .theme--dark.v-text-field--filled:not(.v-input--is-focused):not(.v-input--has-state) > .v-input__control > .v-input__slot:hover {
    background: rgba(255, 255, 255, 0.03);
    border-bottom: 0;
  }
  .v-text-field.v-text-field--enclosed:not(.v-text-field--rounded) > .v-input__control > .v-input__slot, .v-text-field.v-text-field--enclosed .v-text-field__details {
    padding: 0;
  }
  .v-text-field.v-text-field--enclosed .v-text-field__details {
    display: none;
  }
}
</style>