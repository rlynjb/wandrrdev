<template>
  <v-app dark>
    <v-app-bar
      fixed
      app
    >
      <v-row no-gutters class="justify-space-between">
        <v-col cols="12" sm="12" md="5">
          <VuetifyLogo class="Header-logo mr-3 d-inline-block d-sm-inline-block d-md-inline-block d-lg-inline-block" />
          <i class="ml-2 mr-3 d-inline-block d-sm-inline-block d-md-inline-block d-lg-inline-block">
            Portfolio | Tech & Travel
          </i>
        </v-col>

        <v-col cols="12" sm="12" md="7"
          class="pt-3 text-right">
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