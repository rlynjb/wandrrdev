<template>
  <div v-if="board">
    <b :class="labelStyle">
      how to get pass and how much it cost
    </b>
    <v-btn depressed
      @click="gotoGooglePublicTransit(board.area_address, board.area_address)">
      search for Transits
    </v-btn>
    <v-btn depressed
      @click="gotoGooglePublicTransitMap(board.area_address, board.area_address)"
      class="mt-3 mb-3">
      search for map
    </v-btn>

    <br>

    <ul>
      <li v-for="(transit, transitKey, transitIndex) in transits" 
        :key="'transit-'+transitIndex"
        class="mb-6">
        <v-btn @click="deleteBoardTransit(transitKey)">
          x
        </v-btn>
        <boarding-card-text-field
          label="What ride option?"
          :value="transit.name"
          class="d-inline-block"
        />
        <span :class="labelStyle">cost $</span>
        <boarding-card-text-field
          label="How much?"
          :value="transit.cost"
          class="d-inline-block"
        />
        <span :class="labelStyle">and tickets are sold at </span>
        <boarding-card-text-field
          label="Where to buy?"
          :value="transit.where_purchase"
          class="d-inline-block"
        />
        <br>

        <a :href="transit.info_link" target="_blank">more info</a>
        <v-btn v-if="transitLink != 'transit-'+transitIndex"
          @click="() => transitLink = 'transit-'+transitIndex" icon>
          <v-icon small color="grey">
            mdi-pencil
          </v-icon>
        </v-btn>
        <v-btn v-if="transitLink === 'transit-'+transitIndex"
          @click="() => transitLink = null" icon>
          <v-icon small color="grey">
            mdi-close
          </v-icon>
        </v-btn>

        <br>

        <div v-if="transitLink === 'transit-'+transitIndex">
          <boarding-card-text-field
            label="enter link here"
            :value="transit.info_link"
            class="d-inline-block"
          />
        </div>
      </li>
    </ul>

    <v-divider class="mb-6" />

    <boarding-card-text-field
      label="What ride option?"
      name="name"
      :value="form.name"
      class="d-inline-block"
      @newvalue="postBoardTransitForm"
      ref="name"
    />
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
      transitLink: null,
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
    }
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

    updateBoardForm: _.debounce(function(val) {
      if (!this.board) return;
      // make sure values aren't the same, else, its going to override with an empty value
      if (this.board[val.name] === val.value) return;

      this.$store.dispatch('updateBoard', {
        id: this.boardID,
        key: val.name,
        value: val.value
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