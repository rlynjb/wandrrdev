<template>
<v-card v-if="board" flat id="boardingCard" class="grey--text text--lighten-5">
  <v-btn @click="deleteBoard"
    depressed
    class="float-right"
    icon
  >
    <v-icon>mdi-close</v-icon>
  </v-btn>

  <v-card-title class="pl-7 pr-7 pt-6 pb-6 primary--text">
    <v-col cols="12" class="pa-0">
      <boarding-card-text-field
        label="What's the area?"
        name="area_name"
        :value="board.area_name"
        @newvalue="updateBoardForm"
      />
    </v-col>

    <v-col cols="12" class="location-container pl-0 pr-0 pt-2 pb-0">
      <form-toggle icon="mdi-map-marker">
        <template v-slot:field>
          at {{ board.area_address }}
        </template>
        <template v-slot:form>
          <boarding-card-text-field
            label="address: street, city, state, country, zipcode"
            name="area_address"
            :value="board.area_address"
            class="d-inline-block"
            @newvalue="updateBoardForm"
          />
          <boarding-card-text-field
            label="coordinates: lat, long"
            name="area_coordinates"
            :value="board.area_coordinates"
            class="d-inline-block"
            @newvalue="updateBoardForm"
          />
        </template>
      </form-toggle>

      <form-toggle icon="mdi-domain" class="pt-2">
        <template v-slot:field>
          and its {{ board.area_type }} type of neighborhood
        </template>
        <template v-slot:form>
          <boarding-card-text-field
            label="type: urban, downtown, burrough, suburbs"
            name="area_type"
            :value="board.area_type"
            class="d-inline-block"
            @newvalue="updateBoardForm"
          />
        </template>
      </form-toggle>
    </v-col>
  </v-card-title>

  <v-expansion-panels
    flat
    focusable
    multiple
    v-model="defaultOpenPanels"
  >
    <v-expansion-panel>
      <v-expansion-panel-header class="pt-0 pb-0"
        expand-icon="mdi-bed"
        disable-icon-rotate>
        <h3 :class="panelHeaderStyle">
          <span>Stayed</span>
        </h3>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <boarding-card-stay :boardID="boardID" />
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-header
        expand-icon="mdi-car"
        disable-icon-rotate>
        <h3 :class="panelHeaderStyle">
          when you arrive, how to get here
        </h3>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <boarding-card-arrival :boardID="boardID" />
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-header
        expand-icon="mdi-subway-variant"
        disable-icon-rotate>
        <h3 :class="panelHeaderStyle">
          public transit pass
        </h3>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <boarding-card-public-transit :boardID="boardID" />
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-header
        expand-icon="mdi-food-fork-drink"
        disable-icon-rotate>
        <h3 :class="panelHeaderStyle">
          Nearby Essentials
        </h3>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <boarding-card-nearby-essentials :boardID="boardID" />
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-header
        expand-icon="mdi-align-vertical-bottom"
        disable-icon-rotate>
        <h3 :class="panelHeaderStyle">
          Estimate Cost of stay:
        </h3>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <b :class="labelStyle">includes *stay, *arrival transit, *public transit pass</b><br>
        <!--
        ${{ estimate_cost }}
        -->
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</v-card>
</template>

<script>
import BoardingCardTextField from './BoardingCardTextField.vue';
import BoardingCardStay from './BoardingCardStay.vue';
import BoardingCardArrival from './BoardingCardArrival.vue';
import BoardingCardPublicTransit from './BoardingCardPublicTransit.vue';
import BoardingCardNearbyEssentials from './BoardingCardNearbyEssentials.vue';

import _ from 'lodash';

export default {
  components: { BoardingCardTextField, BoardingCardStay, BoardingCardArrival, BoardingCardPublicTransit, BoardingCardNearbyEssentials },
  props: {
    boardID: {
      type: String,
    },
  },

  data: () => {
    return {
      labelStyle: 'text-body-2 grey--text',
      panelHeaderStyle: 'text-overline grey--text text--darken-1 primary--text font-weight-bold',
      defaultOpenPanels: [],
    }
  },

  computed: {
    board() {
      if (!this.$store.state.boards) return;
      return this.$store.state.boards[this.boardID];
    },

    isUserAuthenticated() {
      return this.$store.state.isUserAuthenticated;
    },

    estimate_cost() {
      if (!this.board) return;

      let stayCost = !isNaN(this.board.price) ? parseInt(this.board.price) : 0;
      let arrivalTransit = parseInt(this.board.arrival_cost);
      let publicTransitCost = this.board.transit.reduce((accumulator, a) => {
        return parseInt(accumulator.cost) + parseInt(a.cost);
      });

      return stayCost + arrivalTransit + publicTransitCost;
    },
  },

  methods: {
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

    deleteBoard() {
      this.$store.dispatch('deleteBoard', this.boardID);
    },
  },
}
</script>

<style lang="scss">
#boardingCard {
  .v-expansion-panel-header {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    min-height: 3em;
    border-radius: 0;

    .v-icon {
      color: #5d5d5d;
    }
  }
  .v-expansion-panel-header--active::before {
    opacity: 0.08;
  }
  .v-expansion-panel-content {
    margin-top: 1.5em;
    margin-bottom: 1.5em;
    color: #dadada;
  }
  .v-expansion-panel-content__wrap {
    padding-bottom: 0;
  }

  // custom form styles per each section of boardCard
  .v-card__title {
    label, input {
      color: #9575cd;
      font-size: 1.25rem;
    }
  }
  .v-expansion-panel-content {
    textarea {
      line-height: 1.5em;
    }
    .v-textarea.v-text-field--solo {
      width: 100%;
    }
  }

  // override title location styles
  .location-container {
    font-size: 0.7em;
    font-weight: 400;
    color: grey;
    line-height: 1;

    input, label {
      color: grey;
      font-size: 0.9em;
    }

    .v-input {
      width: 100%;
    }
    .v-btn {
      height: 1.7em;
      width: 1.7em;
    }
  }
}
</style>