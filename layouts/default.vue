<template>
  <v-app dark>
    <v-app-bar
      fixed
      app
    >
      <v-row no-gutters class="justify-space-between align-center">
        <v-col cols="12" sm="12" md="5">
          <VuetifyLogo class="Header-logo" />
        </v-col>

        <v-col cols="12" sm="12" md="7"
          class="text-right">
          <v-item-group>
            <v-btn depressed>
              About
            </v-btn>
            <v-btn depressed>
              Experience
            </v-btn>
            <v-btn depressed>
              Work
            </v-btn>
            <v-btn depressed>
              Contact
            </v-btn>
            <v-btn depressed>
              Resume
            </v-btn>
            <v-btn depressed>
              Travel
            </v-btn>
          </v-item-group>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer
      :absolute="false"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      fixed: true,
    }
  }
}
</script>

<style>
.Header-logoText {
  line-height: 0.8;
}
</style>