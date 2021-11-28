<template>
  <v-app dark>
    <v-app-bar
      fixed
      app
      color="#121212"
      elevation="0"
    >
      <v-container>
        <v-row no-gutters class="justify-space-between align-center">
          <v-col cols="12" sm="12" md="5">
            <NuxtLink to="/">
              <VuetifyLogo class="Header-logo" />
            </NuxtLink>
          </v-col>

          <v-col cols="12" sm="12" md="7"
            class="text-right">
            <!-- displays only for md and lg screens -->
            <v-item-group class="d-none d-sm-none d-md-flex d-lg-flex d-xl-flex float-right">
              <NuxtLink v-for="(menuItem, menuInd) in menu" :key="'menu-'+menuInd"
                :to="menuItem.url"
                class="ml-6">
                {{ menuItem.name }}
              </NuxtLink>
              <a href="https://docs.google.com/document/d/1LOO_sdXimhxD43TeWSkoZbqASsT3B68l9YAdkyxmwNU/edit?usp=sharing"
                target="_blank" class="ml-6"
              >
                Resume
              </a>
            </v-item-group>

            <!-- display only for sm and lower -->
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn class="d-xs-flex d-sm-flex d-md-none d-lg-none d-xl-none float-right mt-n14"
                  dark
                  depressed
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-menu</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(mobileBtnItem, mobileBtnIndex) in menu" :key="'mobileBtn-'+mobileBtnIndex"
                >
                  <v-list-item-title>
                    <NuxtLink :to="mobileBtnItem.url">
                      {{ mobileBtnItem.name }}
                    </NuxtLink>
                  </v-list-item-title>
                </v-list-item>

                <v-list-item>
                  <v-list-item-title>
                    <a href="https://docs.google.com/document/d/1LOO_sdXimhxD43TeWSkoZbqASsT3B68l9YAdkyxmwNU/edit?usp=sharing"
                      target="_blank"
                    >
                      Resume
                    </a>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer
      :absolute="!false"
      app
    >
      <v-row>
        <v-col>
          <span>&copy; {{ new Date().getFullYear() }}</span>
        </v-col>

        <v-col>
          <v-dialog
            v-model="loginDialog"
            width="500"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                depressed
                dark
                v-bind="attrs"
                v-on="on"
              >
                Login
              </v-btn>
            </template>

            <v-card>
              <v-card-title>
                <v-col cols="11"
                  class="pa-0">
                  Login
                </v-col>

                <v-col cols="1"
                  class="pa-0 text-right">
                  <v-btn
                    icon
                    @click="loginDialog = false"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-col>
              </v-card-title>

              <v-divider class="mt-1 mb-5" />

              <v-card-text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </v-card-text>
            </v-card>
          </v-dialog>

        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      loginDialog: false,
      fixed: true,
      menu: [
        { name: 'About', url: '/#about' },
        { name: 'Experience', url: '/#experience' },
        { name: 'Work', url: '/#work' },
        { name: 'Contact', url: '/#contact' },
        /*{ name: 'Travel', url: '/travel_cheatsheet' }*/
      ],
    }
  }
}
</script>

<style lang="scss">
a {
  text-decoration: none;
}
.Header-logoText {
  line-height: 0.8;
}

.v-application .container {
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Optima', sans-serif !important;
  }
}
</style>