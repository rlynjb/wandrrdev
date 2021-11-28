<template>
  <div v-if="board">
    <b :class="labelStyle">
      how to get pass and how much it cost
    </b>
    <h4>search for:</h4>
    <v-btn depressed
      @click="gotoGooglePublicTransit(board.area_address, board.area_address)">
      Transits
    </v-btn>
    <v-btn depressed
      @click="gotoGooglePublicTransitMap(board.area_address, board.area_address)"
      class="mt-3 mb-3">
      Map
    </v-btn>

    <v-divider class="mt-8 mb-8" />

    <ul>
      <li v-for="(transit, transitKey, transitIndex) in transits" 
        :key="'transit-'+transitIndex"
        class="mb-6">
        <v-btn v-if="isUserAuthenticated"
          @click="deleteBoardTransit(transitKey)"
          icon
          class="float-right">
          <v-icon>mdi-close</v-icon>
        </v-btn>

        <div>
          <boarding-card-text-field
            label="What ride option?"
            name="name"
            :value="transit.name"
            class="d-inline-block"
            @newvalue="updateBoardTransit($event, transitKey)"
          />
          <span :class="labelStyle">cost $</span>
          <boarding-card-text-field
            label="How much?"
            name="cost"
            :value="transit.cost"
            class="d-inline-block"
            @newvalue="updateBoardTransit($event, transitKey)"
          />
          <span :class="labelStyle">and tickets are sold at </span>
          <boarding-card-text-field
            label="Where to buy?"
            name="where_purchase"
            :value="transit.where_purchase"
            class="d-inline-block"
            @newvalue="updateBoardTransit($event, transitKey)"
          />
          <br>

          <form-toggle>
            <template v-slot:field>
              <a :href="transit.info_link" target="_blank">more info</a>
            </template>

            <template v-slot:form>
              <boarding-card-text-field
                label="http://"
                name="info_link"
                :value="transit.info_link"
                class="d-inline-block"
                @newvalue="updateBoardTransit($event, transitKey)"
              />
            </template>
          </form-toggle>

        </div>
      </li>
    </ul>

    <div v-if="isUserAuthenticated">
      <v-divider class="mt-8 mb-8" />

      <boarding-card-text-field
        label="What ride option?"
        name="name"
        :value="form.name"
        class="d-inline-block"
        @newvalue="postBoardTransitForm"
        ref="name"
      />
    </div>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  props: {
    boardID: {
      type: String,
    },
  },

  data: () => {
    return {
      labelStyle: 'text-body-2 grey--text',
      form: {
        name: ""
      }
    }
  },

  computed: {
    board() {
      return this.$store.state.boards[this.boardID];
    },
    transits() {
      return this.$store.state.boards[this.boardID].transit;
    },
    isUserAuthenticated() {
      return this.$store.state.auth.isUserAuthenticated;
    },
  },

  methods: {
    postBoardTransitForm: _.debounce(function(val) {
      this.$store.dispatch('postBoardTransit', {
        id: this.boardID,
        key: val.name,
        value: val.value
      })
      .then(() => {
        this.$refs.name.clear();
      })
      .catch(err => {
        console.log(err)
      });
    }, 1000),

    updateBoardTransit: _.debounce(function($event, transitID) {
      if (!this.board) return;
      // make sure values aren't the same, else, its going to override with an empty value
      if (this.transits[transitID][$event.name] === $event.value) return;

      this.$store.dispatch('updateBoardTransit', {
        boardID: this.boardID,
        transitID,
        key: $event.name,
        value: $event.value
      })
      .then(() => {
        console.log('UPDATE SUCCESS')
      })
      .catch(err => {
        console.log('ERR', err)
      });
    }, 1000),

    deleteBoardTransit(transitID) {
      this.$store.dispatch('deleteBoardTransit', {
        boardID: this.boardID,
        transitID
      });
    },

    gotoGooglePublicTransit(city, state) {
      let googleUrlSearch = `https://www.google.com/search?q=public+transportation+in+${ city }+${ state }`;
      window.open(googleUrlSearch, '_blank');
    },

    gotoGooglePublicTransitMap(city, state) {
      let googleUrlSearch = `https://www.google.com/search?q=public+transportation+map+in+${ city }+${ state }`;
      window.open(googleUrlSearch, '_blank');
    },
  },
}
</script>