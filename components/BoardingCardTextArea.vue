<template>
  <v-textarea
    :readonly="!isUserAuthenticated"
    :placeholder="label"
    solo flat filled auto-grow
    :value="value"
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
      //
    }
  },

  computed: {
    isUserAuthenticated() {
      return this.$store.state.isUserAuthenticated;
    },
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