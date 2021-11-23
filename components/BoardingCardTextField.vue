<template>
  <v-text-field
    :readonly="!isUserAuthenticated"
    :label="label"
    solo flat filled
    :value="value"
    :class="classNames"
  ></v-text-field>
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
}
</style>