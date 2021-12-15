<template>
<v-row>
  <v-col cols="1">
    <v-btn
      @click="gotoGmap"
      icon
      x-large
      class="primary--text"
    >
      <v-icon>
        mdi-map-marker
      </v-icon>
    </v-btn>
  </v-col>

  <v-col cols="11"
    class="pl-5">
    <text-field
      v-if="isUserAuthenticated"
      label="street, city, state, country, zipcode"
      name="area_address"
      :value="board.area_address"
      class="d-inline-block"
      @newvalue="updateBoardForm"
    />

    <text-field
      v-if="isUserAuthenticated"
      label="lat, long"
      name="area_coordinates"
      :value="board.area_coordinates"
      class="d-inline-block"
      @newvalue="updateBoardForm"
    />

    <text-field
      label="ex. urban, downtown, burrough, suburbs"
      name="area_type"
      :value="board.area_type"
      class="d-inline-block"
      @newvalue="updateBoardForm"
    />

    type of neighborhood
  </v-col>
</v-row>
</template>

<script>
export default {
  data() {
    return {
      //
    }
  },

  methods: {
    gotoGmap() {
      let googleMapUrlSearch = `https://www.google.com/maps/place/${ this.area_address.replaceAll(' ',  '+') }`;
      window.open(googleMapUrlSearch, '_blank');
    },
  },
}
</script>

<style lang="scss">

</style>