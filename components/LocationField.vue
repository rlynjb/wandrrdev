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
      :name="addressName"
      :value="addressValue"
      class="d-inline-block"
      @newvalue="updateForm"
    />

    <text-field
      v-if="isUserAuthenticated"
      label="lat, long"
      :name="coordinatesName"
      :value="coordinatesValue"
      class="d-inline-block"
      @newvalue="updateForm"
    />

    <text-field
      label="ex. urban, downtown, burrough, suburbs"
      :name="neighborhoodName"
      :value="neighborhoodValue"
      class="d-inline-block"
      @newvalue="updateForm"
    />

    type of neighborhood
  </v-col>
</v-row>
</template>

<script>
export default {
  props: {
    addressName: {
      type: String,
      default: () => ''
    },
    addressValue: {
      type: String,
      default: () => ''
    },
    coordinatesName: {
      type: String,
      default: () => ''
    },
    coordinatesValue: {
      type: String,
      default: () => ''
    },
    neighborhoodName: {
      type: String,
      default: () => ''
    },
    neighborhoodValue: {
      type: String,
      default: () => ''
    },
  },

  data() {
    return {
      //
    }
  },

  computed: {
    isUserAuthenticated() {
      return this.$store.state.auth.isUserAuthenticated;
    },
  },

  methods: {
    gotoGmap() {
      let googleMapUrlSearch = `https://www.google.com/maps/place/${ this.addressValue.replaceAll(' ',  '+') }`;
      window.open(googleMapUrlSearch, '_blank');
    },

    updateForm(val) {
      this.$emit('onUpdateAddress', {
        name: val.name,
        value: val.value,
      });
    },
  },
}
</script>

<style lang="scss">

</style>