<template>
<v-card flat id="boardingCard" class="grey--text text--lighten-5">
  <v-card-title class="pl-7 pr-7 pb-4 primary--text">
    {{ boardItem.area_name }}
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
          <span v-if="boardItem.date_stayed">Stayed</span>
          <span v-else>Stay</span>
        </h3>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <b :class="labelStyle">during:</b>
        {{ formatDate(boardItem.date_stayed.from) }} 
        <b :class="labelStyle">-</b> {{ formatDate(boardItem.date_stayed.to) }} <br>
        <b :class="labelStyle">(0 days, 0 weeks, 0 months)</b><br>
        <b :class="labelStyle">in:</b> {{ boardItem.name }} <br>
        <b :class="labelStyle">it cost:</b> {{ boardItem.price }} <br>
        <b :class="labelStyle">the place has:</b> {{ boardItem.amenities.join().replaceAll(',', ', ') }} <br>
        <b :class="labelStyle">my room has:</b> {{ boardItem.included.join().replaceAll(',', ', ') }} <br>
        <b :class="labelStyle">whats it like:</b> {{ boardItem.desc }}
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
        <span :class="labelStyle">from</span> {{ boardItem.arrival.from }}<span :class="labelStyle">,</span>
        <span :class="labelStyle">took</span> {{ boardItem.arrival.transport_mode }} 
        <span :class="labelStyle">and it cost around $</span>{{ boardItem.arrival.cost }}
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
        <b :class="labelStyle">
          how to get pass and how much it cost
        </b>
        <v-btn @click="gotoGooglePublicTransit(boardItem.location.city, boardItem.location.state)">
          View Transits
        </v-btn>
        <v-btn @click="gotoGooglePublicTransitMap(boardItem.location.city, boardItem.location.state)"
          class="mt-3 mb-3">
          view map
        </v-btn>
        <br>
        <ul>
          <li v-for="(transitItem, transitIndex) in boardItem.public_transit_pass" 
            :key="'transitItem-'+transitIndex">
            {{ transitItem.name }}
            <span :class="labelStyle">cost $</span>{{ transitItem.cost }}
            <span :class="labelStyle">and tickets are sold at </span>{{ transitItem.where_purchase }}
            <br>
            <a :href="transitItem.info_link" target="_blank">more info</a>
          </li>
        </ul>
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
        <b :class="labelStyle">0.5miles radius within where i stayed</b><br>
        <v-btn depressed
          class="mt-3"
          @click="gotoGmap('public_transit')">
          public transits
        </v-btn>
        <v-btn depressed
          class="mt-3"
          @click="gotoGmap('cafes')">
          cafes
        </v-btn>
        <v-btn depressed
          class="mt-3"
          @click="gotoGmap('groceries')">
          groceries
        </v-btn>
        <v-btn depressed
          class="mt-3"
          @click="gotoGmap('laundry')">
          laundry
        </v-btn>
        <v-btn depressed
          class="mt-3"
          @click="gotoGmap('bars')">
          bars
        </v-btn>
        <v-btn depressed
          class="mt-3"
          @click="gotoGmap('restaurants')">
          restaurants
        </v-btn>
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
        <ul>
          <li v-for="(foodItem, foodIndex) in boardItem.daily_food_expense" :key="'foodExp-'+foodIndex">
            {{ foodItem.meal_type }} {{ foodItem.frequency }} 
            <span :class="labelStyle">cost around $</span>{{ foodItem.avg_cost }} 
            <span :class="labelStyle">but $</span>{{ foodWeeklyTotal[foodIndex] }}
            <span :class="labelStyle">weekly</span>
          </li>
        </ul>
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
import moment from 'moment';

export default {
  props: {
    boardItem: {
      type: Object,
      required: false,
      default: () => null,
    },
  },
  data: () => {
    return {
      labelStyle: 'text-body-2 grey--text',
      panelHeaderStyle: 'text-overline grey--text text--darken-1 primary--text font-weight-bold',
      defaultOpenPanels: [0, 5],
    }
  },
  computed: {
    foodWeeklyTotal() {
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
      if (!this.boardItem.daily_food_expense) return;
      let stayCost = !isNaN(this.boardItem.price) ? parseInt(this.boardItem.price) : 0;
      let arrivalTransit = parseInt(this.boardItem.arrival.cost);
      let foodTotal = this.foodWeeklyTotal.reduce((accumulator, a) => accumulator + a);

      return stayCost + arrivalTransit + foodTotal;
    },
  },

  methods: {
    formatDate(date) {
      return moment(date).format('ll');
    },

    gotoGmap(category) {
      if (!this.boardItem.location) return;

      let lat = this.boardItem.location.coordinates[0];
      let long = this.boardItem.location.coordinates[1];

      let cat = category.split('_').map((v, i) => {
        if (i === category.split('_').length - 1) {
          return v;
        }
        return v + '+';
      }).join().replace(',','');

      let googleMapUrlSearch = `https://www.google.com/maps/search/${cat}/@${lat},${long},16z`;
      window.open(googleMapUrlSearch, '_blank');
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
    color: #dadada;
  }
}
</style>