<template>
<v-card flat id="boardingCard" class="grey--text text--lighten-5">
  <v-card-title class="pl-7 pr-7 pt-6 pb-6 primary--text">
    <boarding-card-text-field v-if="boardCopy"
      label="What's the area?"
      name="area_name"
      :value="boardCopy.area_name"
      @newvalue="updateBoardForm"
    />
    <boarding-card-text-field v-else
      label="What's the area?"
      name="area_name"
      :value="form.area_name"
      @newvalue="postBoardForm"
      ref="area_name"
    />

    <v-btn v-if="boardCopy" @click="deleteBoard"
      depressed
    >
      x
    </v-btn>
  </v-card-title>

  <v-expansion-panels
    v-if="boardCopy"
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
          <span v-if="boardItem.date_stayed">Stayed</span>
        </h3>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <boarding-card-stay :boardItem="boardCopy" :boardID="boardId" />
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
        <boarding-card-arrival :boardItem="boardItem" />
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
        <boarding-card-public-transit :boardItem="boardItem" />
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
        <boarding-card-nearby-essentials :boardItem="boardItem" />
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-header
        expand-icon="mdi-currency-usd"
        disable-icon-rotate>
        <h3 :class="panelHeaderStyle">
          Weekly Food Expense
        </h3>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <boarding-card-food-weekly :boardItem="boardItem" />
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
        <b :class="labelStyle">includes *stay, *arrival transit, *public transit pass, *food expense only</b><br>
        ${{ estimate_cost }}
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
import BoardingCardFoodWeekly from './BoardingCardFoodWeekly.vue';

import _ from 'lodash';

export default {
  components: { BoardingCardTextField, BoardingCardStay, BoardingCardArrival, BoardingCardPublicTransit, BoardingCardNearbyEssentials, BoardingCardFoodWeekly },
  props: {
    boardItem: {
      type: Object,
      required: false,
      default: () => null,
    },
    boardId: {
      type: String,
    },
  },

  data: () => {
    return {
      labelStyle: 'text-body-2 grey--text',
      panelHeaderStyle: 'text-overline grey--text text--darken-1 primary--text font-weight-bold',
      defaultOpenPanels: [0, 5],
      form: {
        area_name: '',
      },
      boardCopy: null,
    }
  },

  computed: {
    isUserAuthenticated() {
      return this.$store.state.isUserAuthenticated;
    },
    foodWeeklyTotal() {
      if (!this.boardItem) return;

      let determineFreqVal = (freq) => {
        switch(freq) {
          case "daily":
            return 7;
          case "occasionally":
            return 3;
          case "rarely":
            return 1;
          default:
            return 0;
        }
      };

      return this.boardItem.daily_food_expense.map(cost => {
        return parseInt(cost.avg_cost) * determineFreqVal(cost.frequency);
      });
    },

    /*
    TODO: future feature
    foodMonthlyTotal() {},
    foodStayTotal() {},
    */

    estimate_cost() {
      if (!this.boardItem) return;
      if (!this.boardItem.daily_food_expense) return;

      let stayCost = !isNaN(this.boardItem.price) ? parseInt(this.boardItem.price) : 0;
      let arrivalTransit = parseInt(this.boardItem.arrival.cost);
      let foodTotal = this.foodWeeklyTotal.reduce((accumulator, a) => accumulator + a);
      let publicTransitCost = this.boardItem.public_transit_pass.reduce((accumulator, a) => {
        return parseInt(accumulator.cost) + parseInt(a.cost);
      });

      return stayCost + arrivalTransit + publicTransitCost + foodTotal;
    },
  },

  created() {
    if ( JSON.stringify(this.boardCopy) === JSON.stringify(this.boardItem) ) return;
    this.boardCopy = JSON.parse( JSON.stringify( this.boardItem ) );
  },

  watch: {
    boardItem(newVal) {
      if ( JSON.stringify(this.boardCopy) != JSON.stringify(newVal) ) return;
      this.boardCopy = JSON.parse( JSON.stringify(newVal) );
    },
  },

  methods: {
    updateBoardForm: _.debounce(function(val) {
      if (!this.boardCopy) return;
      // make sure values aren't the same, else, its going to override with an empty value
      if (this.boardCopy[val.name] === val.value) return;

      this.$store.dispatch('updateBoard', {
        id: this.boardId,
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

    deleteBoard() {
      this.$store.dispatch('deleteBoard', this.boardId);
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
}
</style>