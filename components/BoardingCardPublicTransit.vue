<template>
  <div v-if="boardCopy">
    <b :class="labelStyle">
      how to get pass and how much it cost
    </b>
    <v-btn depressed
      @click="gotoGooglePublicTransit(boardCopy.area_address, boardCopy.area_address)">
      search for Transits
    </v-btn>
    <v-btn depressed
      @click="gotoGooglePublicTransitMap(boardCopy.area_address, boardCopy.area_address)"
      class="mt-3 mb-3">
      search for map
    </v-btn>

    <br>

    <ul>
      <li v-for="(transitItem, transitKey, transitIndex) in transitsCopy" 
        :key="'transitItem-'+transitIndex"
        class="mb-6">
        <v-btn @click="deleteBoardTransit(transitKey)">
          x
        </v-btn>
        <boarding-card-text-field
          label="What ride option?"
          :value="transitItem.name"
          class="d-inline-block"
        />
        <span :class="labelStyle">cost $</span>
        <boarding-card-text-field
          label="How much?"
          :value="transitItem.cost"
          class="d-inline-block"
        />
        <span :class="labelStyle">and tickets are sold at </span>
        <boarding-card-text-field
          label="Where to buy?"
          :value="transitItem.where_purchase"
          class="d-inline-block"
        />
        <br>

        <a :href="transitItem.info_link" target="_blank">more info</a>
        <v-btn v-if="transitLink != 'transitItem-'+transitIndex"
          @click="() => transitLink = 'transitItem-'+transitIndex" icon>
          <v-icon small color="grey">
            mdi-pencil
          </v-icon>
        </v-btn>
        <v-btn v-if="transitLink === 'transitItem-'+transitIndex"
          @click="() => transitLink = null" icon>
          <v-icon small color="grey">
            mdi-close
          </v-icon>
        </v-btn>

        <br>

        <div v-if="transitLink === 'transitItem-'+transitIndex">
          <boarding-card-text-field
            label="enter link here"
            :value="transitItem.info_link"
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
    boardItem: {
      type: Object,
      default: () => null,
    },
    transits: {
      type: Object,
      default: () => null,
    },
    boardID: {
      type: String,
    },
  },

  data: () => {
    return {
      transitLink: null,
      labelStyle: 'text-body-2 grey--text',
      boardCopy: null,
      transitsCopy: null,
      form: {
        name: ""
      }
    }
  },

  created() {
    if ( JSON.stringify(this.boardCopy) === JSON.stringify(this.boardItem) ) return;
    this.boardCopy = JSON.parse( JSON.stringify( this.boardItem ) );

    if ( JSON.stringify(this.transitsCopy) === JSON.stringify(this.transits) ) return;
    this.transitsCopy = JSON.parse( JSON.stringify( this.transits ) );
    debugger
  },

  watch: {
    "boardItem": {
      handler(newVal) {
        if ( JSON.stringify(this.boardCopy) != JSON.stringify(newVal) ) return;
        this.boardCopy = JSON.parse( JSON.stringify(newVal) );
        debugger
      },
      deep: true,
    },

    "transits": {
      handler(newVal) {
        debugger
        if ( JSON.stringify(this.transitsCopy) != JSON.stringify(newVal) ) return;
        this.transitsCopy = JSON.parse( JSON.stringify(newVal) );
        debugger
      },
      deep: true,
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
      if (!this.boardCopy) return;
      // make sure values aren't the same, else, its going to override with an empty value
      if (this.boardCopy[val.name] === val.value) return;

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