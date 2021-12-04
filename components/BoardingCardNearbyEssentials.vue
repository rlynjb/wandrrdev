<template>
  <div>
    <b :class="labelStyle">0.5miles radius within where i stayed</b><br>
    <v-btn depressed
      class="mt-3 mr-2 primary"
      @click="gotoGmap('public_transit')">
      public transits
    </v-btn>
    <v-btn depressed
      class="mt-3 mr-2 primary"
      @click="gotoGmap('cafes')">
      cafes
    </v-btn>
    <v-btn depressed
      class="mt-3 mr-2 primary"
      @click="gotoGmap('groceries')">
      groceries
    </v-btn>
    <v-btn depressed
      class="mt-3 mr-2 primary"
      @click="gotoGmap('laundry')">
      laundry
    </v-btn>
    <v-btn depressed
      class="mt-3 mr-2 primary"
      @click="gotoGmap('bars')">
      bars
    </v-btn>
    <v-btn depressed
      class="mt-3 mr-2 primary"
      @click="gotoGmap('restaurants')">
      restaurants
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    boardID: {
      type: String,
    },
  },

  data: () => {
    return {
      labelStyle: 'text-body-2 primary--text',
    }
  },

  computed: {
    board() {
      return this.$store.state.boards[this.boardID];
    },
    area_coordinates() {
      return this.board.area_coordinates;
    },
  },

  methods: {
    gotoGmap(category) {
      if (!this.board && !this.area_coordinates === '') return;

      const formatCoordinates = this.area_coordinates.replaceAll(' ', '').split(',');

      let lat = formatCoordinates[0];
      let long = formatCoordinates[1];

      let cat = category.split('_').map((v, i) => {
        if (i === category.split('_').length - 1) {
          return v;
        }
        return v + '+';
      }).join().replace(',','');

      let googleMapUrlSearch = `https://www.google.com/maps/search/${cat}/@${lat},${long},16z`;
      window.open(googleMapUrlSearch, '_blank');
    },
  },
}
</script>