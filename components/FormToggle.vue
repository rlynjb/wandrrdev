<template>
  <div>
    <div>
      <slot name="field"></slot>
    </div>

    <div v-if="isUserAuthenticated">
      <v-btn v-if="!show"
        @click="() => show = true"
        icon
      >
        <v-icon small color="grey">
          mdi-pencil
        </v-icon>
      </v-btn>

      <v-btn v-else
        @click="() => show = false"
        icon
      >
        <v-icon small color="grey">
          mdi-close
        </v-icon>
      </v-btn>
    </div>

    <br>

    <v-expand-transition>
      <div v-if="show">
        <slot name="form"></slot>
      </div>
    </v-expand-transition>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: () => "",
    }
  },
  data() {
    return {
      show: false,
    }
  },

  computed: {
    isUserAuthenticated() {
      return this.$store.state.auth.isUserAuthenticated;
    },
  },
}
</script>