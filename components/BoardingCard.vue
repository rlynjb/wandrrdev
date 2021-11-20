<template>
<v-card>
  <v-card-title class="pl-7 pr-7 pb-0 primary--text">
    {{ boardItem.area_name }}
  </v-card-title>

  <v-list>
    <v-list-item>
      <v-col cols="12">
        <h3 class="text-overline grey--text text--darken-1 primary--text font-weight-bold">
          <span v-if="boardItem.date_stayed">Stayed</span>
          <span v-else>Stay</span>
        </h3>
        <div>
          <b :class="labelStyle">during:</b>
          {{ boardItem.date_stayed.from }} - {{ boardItem.date_stayed.to }} <br>
          <b :class="labelStyle">in:</b> {{ boardItem.name }} <br>
          <b :class="labelStyle">it cost:</b> {{ boardItem.price }} <br>
          <b :class="labelStyle">the place has:</b> {{ boardItem.amenities.join().replaceAll(',', ', ') }} <br>
          <b :class="labelStyle">my room has:</b> {{ boardItem.included.join().replaceAll(',', ', ') }} <br>
          <b :class="labelStyle">whats it like:</b> {{ boardItem.desc }}
        </div>
      </v-col>
    </v-list-item>

    <v-list-item>
      <v-col cols="12">
        <h3 class="text-overline grey--text text--darken-1 primary--text font-weight-bold">
          when you arrive, how to get here
        </h3>
        <div>
          <span :class="labelStyle">from</span> {{ boardItem.arrival.from }}<span :class="labelStyle">,</span>
          <span :class="labelStyle">took</span> {{ boardItem.arrival.transport_mode }} 
          <span :class="labelStyle">and it cost around $</span>{{ boardItem.arrival.cost }}
        </div>
      </v-col>
    </v-list-item>

    <v-divider class="mt-3 mb-3"></v-divider>

    <v-list-item>
      <v-col cols="12">
        <h3 class="text-overline grey--text text--darken-1  primary--text font-weight-bold">
          public transit pass
        </h3>
        <div>
          <b :class="labelStyle">
            how to get pass and how much it cost
          </b>
          <v-btn @click="gotoGooglePublicTransit(boardItem.location.city, boardItem.location.state)">
            Available Transits
          </v-btn>
          <v-btn @click="gotoGooglePublicTransitMap(boardItem.location.city, boardItem.location.state)"
            class="mt-3 mb-3">
            view map
          </v-btn>
        </div>
      </v-col>
    </v-list-item>

    <v-list-item>
      <v-col cols="12">
        <h3 class="text-overline grey--text text--darken-1 primary--text font-weight-bold">
          Nearby Essentials
        </h3>
        <div>
          <b :class="labelStyle">0.5miles radius within where i stayed</b><br>
          {{ boardItem.nearby_essentials_desc }}
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
        </div>
      </v-col>
    </v-list-item>

    <v-list-item>
      <v-col cols="12">
        <h3 class="text-overline grey--text text--darken-1 primary--text font-weight-bold">
          Food Expense
        </h3>
        <ul>
          <li v-for="(foodItem, foodIndex) in boardItem.daily_food_expense" :key="'foodExp-'+foodIndex">
            <span :class="labelStyle">had</span> {{ foodItem.meal_type }} {{ foodItem.frequency }} 
            <span :class="labelStyle">and it cost around $</span>{{ foodItem.avg_cost }} 
            <span :class="labelStyle">per meal, but $</span>{{ foodWeeklyTotal[foodIndex] }}
            <span :class="labelStyle">weekly</span>
          </li>
        </ul>
      </v-col>
    </v-list-item>

    <v-divider class="mt-3 mb-3"></v-divider>

    <v-list-item>
      <v-col cols="12">
        <h3 class="text-overline grey--text text--darken-1 primary--text font-weight-bold">
          Estimate Cost of stay:
        </h3>
        <div>
          <b :class="labelStyle">includes *arrival transit, *public transit pass, *food expense only</b><br>
          ${{ estimate_cost }}
        </div>
      </v-col>
    </v-list-item>

    <!--
    <v-divider class="mt-3 mb-3"></v-divider>

    <v-list-item>
      <v-col cols="12">
        <h3 class="text-overline grey--text text--darken-1">
          Tourists Areas
        </h3>
        <div>
          <b :class="labelStyle">about 10 miles away from where i stayed</b><br>
          {{ boardItem.tourist_area_desc }}
          <v-btn class="mt-3" depressed>
            go there
          </v-btn>
        </div>
      </v-col>
    </v-list-item>

    <v-list-item>
      <v-col cols="12">
        <h3 class="text-overline grey--text text--darken-1">
          What service apps works within the area
        </h3>
        <div>
          Uber, Instacart, UberEats, Doordash, Grubhub
        </div>
      </v-col>
    </v-list-item>
    -->
  </v-list>
</v-card>
</template>

<script>
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
      let arrivalTransit = parseInt(this.boardItem.arrival.cost);
      let foodTotal = this.foodWeeklyTotal.reduce((accumulator, a) => accumulator + a);

      return foodTotal + arrivalTransit;
    },
  },

  methods: {
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