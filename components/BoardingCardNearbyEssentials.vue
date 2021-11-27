<template>
  <div>
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
      labelStyle: 'text-body-2 grey--text',
    }
  },

  computed: {
    board() {
      return this.$store.state.boards[this.boardID];
    },
  },

  methods: {
    gotoGmap(category) {
      if (!this.board) return;
      if (!this.board.location) return;

      let lat = this.board.location.coordinates[0];
      let long = this.board.location.coordinates[1];

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