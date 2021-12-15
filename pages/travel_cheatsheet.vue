<template>
<div class="pt-6 pb-16">
  <v-row class="pa-3 grey darken-4">
    <v-col>
      <div v-if="isUserAuthenticated"
        class="d-inline-block mr-3">
        Hi, {{ isUserAuthenticated.displayName }}
      </div>

      <v-btn
        v-if="!isUserAuthenticated"
        color="primary"
        depressed
        dark
        @click="$store.dispatch('auth/loginWithGoogle')">
        Login
      </v-btn>
      <v-btn v-else
        depressed
        dark
        @click="logout">
        Logout
      </v-btn>
    </v-col>
  </v-row>

  <v-row v-if="isUserAuthenticated"
    class="blue-grey darken-4 mt-8 mb-3">
    <v-col cols="6" sm="12" md="6" lg="6" xl="6">
      <boarding-card-text-field
        label="Where are you going to stay?"
        name="area_name"
        :value="area_name"
        @newvalue="postBoardForm"
        ref="area_name"
      />
    </v-col>

    <v-col cols="6" sm="12" md="6" lg="6" xl="6"
      class="grey--text text--darken-2">
      What did you do today? (daily card Coming soon)
    </v-col>

    <v-col cols="6" sm="12" md="6" lg="6" xl="6"
      class="grey--text text--darken-2">
      How was the travel? (travel card Coming soon)
    </v-col>
  </v-row>

  <!--
    NOTE: implement this next feature
  <v-row class="mt-3">
    <v-col>
      <b class="d-block d-sm-block d-md-block d-lg-block d-xl-block primary--text">
        Cities
      </b>
      <v-chip v-for="(cityItem, cityIndex) in cities" :key="'city-' + cityIndex"
        class="mr-2"
        :disabled="!cityItem.visitied">
        {{ cityItem.name }}
      </v-chip>
    </v-col>
  </v-row>
  -->

  <v-row>
    <v-col cols="12" sm="12" md="6" lg="4" xl="4"
      v-for="(board, boardID, boardIndex) in boards"
      :key="'board-'+boardIndex">
      <boarding-card :boardID="boardID" />
    </v-col>
  </v-row>
</div>
</template>

<script>
import BoardingCard from '../components/BoardingCard.vue'
export default {
  components: { BoardingCard },
  data: () => {
    return {
      area_name: '',
      cities: [
        {
          name: 'Las Vegas',
          visitied: true
        },
        {
          name: 'North Carolina',
          visitied: true
        },
        {
          name: 'New York City',
          visitied: false
        },
        {
          name: 'Boston',
          visitied: false
        },
        {
          name: 'San Francisco',
          visitied: false
        }
      ],
    }
  },

  computed: {
    boards() {
      return this.$store.state.boards;
    },
    isUserAuthenticated() {
      return this.$store.state.auth.isUserAuthenticated;
    }
  },

  created() {
    this.$store.dispatch('getBoards')
      .catch(err => {
        /*
          if boards collection is empty, set
          some kind of sign here
        */
        console.log(err)
      });
  },

  methods: {
    postBoardForm: _.debounce(function(val) {
      this.$store.dispatch('postBoard', {
        key: val.name,
        value: val.value
      })
      .then(() => {
        this.$refs.area_name.clear();
      })
      .catch(err => {
        console.log(err)
      });
    }, 1000),

    logout() {
      this.$store.dispatch('auth/logout')
        .then(() => {
          this.$store.commit('auth/setUser', null)
        })
        .catch((err) => {
          console.log(err)
        });
    },
  },
}
</script>