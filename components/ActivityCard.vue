<template>
<v-card flat class="activityCard deep-purple darken-4">
  <v-btn v-if="isUserAuthenticated"
    @click="deleteActivity"
    depressed
    class="float-right"
    icon
  >
    <v-icon>mdi-close</v-icon>
  </v-btn>

  <v-card-title class="pl-7 pr-7 pt-6 pb-6 primary--text">
    <v-col cols="12" class="pa-0">
      What did you do today?
      <text-field
        label="chill, explore, errands, work"
        name="title"
        @newvalue="updateActivityForm"
      />
    </v-col>
  </v-card-title>

  <v-card-text>
    <b :class="labelStyle">at</b>
    <location-field
      addressName="area_address"
      addressValue=""
      coordinatesName="area_coordinates"
      coordinatesValue=""
      neighborhoodName="area_type"
      neighborhoodValue=""
      @onUpdateAddress="updateActivityForm"
    />

    <br>

    <b :class="labelStyle">during</b>
    <text-field
      label="morning, noon, evening, late night"
      name="time"
      class="d-inline-block"
      @newvalue="updateActivityForm"
    />

    <br>

    <b :class="labelStyle">Did it cost anything?</b>
    <text-field
      label="yea? no? how much? what was it?"
      name="cost"
      @newvalue="updateActivityForm"
    />

    <b :class="labelStyle">how was it?</b>
    <text-area
      label="was the place busy? was it compact? was there any inconvenience?"
      name="desc"
      class="d-inline-block"
      @newvalue="updateActivityForm"
    />

    <br>

    <b :class="labelStyle">When was this:</b>
    <text-field
      label="MM/DD/YYYY"
      name="date"
      class="d-inline-block"
      @newvalue="updateActivityForm"
    />

    <v-carousel
      :show-arrows="false"
      hide-delimiter-background
      delimiter-icon="mdi-minus"
    >
      <v-carousel-item>
        any fun pic?
        <image-field />
      </v-carousel-item>

      <v-carousel-item>
        youtube or tiktok vid?
      </v-carousel-item>
    </v-carousel>
  </v-card-text>
</v-card>
</template>

<script>
export default {
  data() {
    return {
      labelStyle: 'boardCardLabel text-body-2 primary--text',
    }
  },

  computed: {
    isUserAuthenticated() {
      return this.$store.state.auth.isUserAuthenticated;
    },
  },

  methods: {
    updateActivityForm() {
      //
    },
    deleteActivity() {
      //
    },
  },
}
</script>

<style lang="scss">

</style>
