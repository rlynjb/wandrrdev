<template>
  <div v-if="board">
    <b :class="labelStyle">
      how to get pass and how much it cost
    </b>
    <br>
    <h4 class="d-inline-block">search for:</h4>
    <v-btn icon
      @click="gotoGooglePublicTransit">
      <v-icon class="primary--text">
        mdi-subway-variant
      </v-icon>
    </v-btn>
    <v-btn icon
      @click="gotoGooglePublicTransitMap"
      class="mt-3 mb-3">
      <v-icon class="primary--text">
        mdi-map
      </v-icon>
    </v-btn>

    <ul>
      <li
        class="mb-6"
        v-for="(transit, transitKey, transitIndex) in transits" 
        :key="'transit-'+transitIndex">
        <v-btn v-if="isUserAuthenticated"
          @click="deleteBoardTransit(transitKey)"
          icon
          class="float-right">
          <v-icon>mdi-close</v-icon>
        </v-btn>

        <div>
          <text-field
            label="What ride option?"
            name="name"
            :value="transit.name"
            class="d-inline-block"
            @newvalue="updateBoardTransit($event, transitKey)"
          />
          <span :class="labelStyle">cost $</span>
          <text-field
            label="How much?"
            name="cost"
            :value="transit.cost"
            class="d-inline-block"
            @newvalue="updateBoardTransit($event, transitKey)"
          />
          <span :class="labelStyle">and tickets are sold at </span>
          <text-field
            label="Where to buy?"
            name="where_purchase"
            :value="transit.where_purchase"
            class="d-inline-block"
            @newvalue="updateBoardTransit($event, transitKey)"
          />
        </div>
      </li>

      <li v-if="isUserAuthenticated">
        <text-field
          label="What ride option?"
          name="name"
          :value="form.name"
          class="d-inline-block"
          @newvalue="postBoardTransitForm"
          ref="name"
        />
      </li>
    </ul>
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
      labelStyle: 'text-body-2 primary--text',
      form: {
        name: ""
      }
    }
  },

  computed: {
    board() {
      return this.$store.state.boards[this.boardID];
    },
    area_address() {
      return this.board.area_address;
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

    getAddress(cat) {
      let result = '';
      switch(cat) {
        case 'street':
          result = this.area_address.split(',')[0];
          break;
        case 'city':
          result = this.area_address.split(',')[1];
          break;
        case 'state':
          result = this.area_address.split(',')[2];
          break;
        case 'zipcode':
          result = this.area_address.split(',')[3];
          break;
        default:
          result = '';
      }

      return result.replace(' ', '');
    },

    gotoGooglePublicTransit(val) {
      let googleUrlSearch = `https://www.google.com/search?q=public+transportation+in+${ this.getAddress('city') }+${ this.getAddress('state') }`;
      window.open(googleUrlSearch, '_blank');
    },

    gotoGooglePublicTransitMap(val) {
      let googleUrlSearch = `https://www.google.com/search?q=public+transportation+map+in+${ this.getAddress('city') }+${ this.getAddress('state') }`;
      window.open(googleUrlSearch, '_blank');
    },
  },
}
</script>