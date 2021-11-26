<template>
  <v-textarea
    :readonly="!isUserAuthenticated"
    :placeholder="label"
    solo flat filled auto-grow
    v-model="valueCopy"
    :class="classNames"
    rows="1"
  ></v-textarea>
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
      return this.$store.state.isUserAuthenticated;
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
#boardingCard {
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
}
</style>