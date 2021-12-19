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
        :value="activity.title"
        @newvalue="updateActivityForm"
      />
    </v-col>
  </v-card-title>

  <v-card-text>
    <b :class="labelStyle">at</b>
    <location-field
      addressName="address"
      :addressValue="activity.address"
      coordinatesName="coordinates"
      :coordinatesValue="activity.coordinates"
      neighborhoodName="neighbor"
      :neighborhoodValue="activity.neighbor"
      @onUpdateAddress="updateActivityForm"
    />

    <br>

    <b :class="labelStyle">during</b>
    <text-field
      label="morning, noon, evening, late night"
      name="time"
      :value="activity.time"
      class="d-inline-block"
      @newvalue="updateActivityForm"
    />

    <br>

    <b :class="labelStyle">Did it cost anything?</b>
    <text-field
      label="yea? no? how much? what was it?"
      name="cost"
      :value="activity.cost"
      @newvalue="updateActivityForm"
    />

    <b :class="labelStyle">how was it?</b>
    <text-area
      label="was the place busy? was it compact? was there any inconvenience?"
      name="desc"
      :value="activity.desc"
      class="d-inline-block"
      @newvalue="updateActivityForm"
    />

    <br>

    <b :class="labelStyle">When was this:</b>
    <text-field
      label="MM/DD/YYYY"
      name="date"
      :value="activity.date"
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
        <image-field
          collection="activities"
          :formID="activityID"
          name="photo"
          :value="activity.photo"
          @onUploadImg="uploadImg"
          @onDeleteImg="deleteImg"
        />
      </v-carousel-item>

      <v-carousel-item>
        youtube or tiktok vid?
      </v-carousel-item>
    </v-carousel>
  </v-card-text>
</v-card>
</template>

<script>
import _ from 'lodash';

export default {
  props: {
    activityID: {
      type: String,
    },
  },

  data() {
    return {
      labelStyle: 'activityCardLabel text-body-2 primary--text',
    }
  },

  computed: {
    activity() {
      if (!this.$store.state.activities) return;
      return this.$store.state.activities[this.activityID];
    },

    isUserAuthenticated() {
      return this.$store.state.auth.isUserAuthenticated;
    },
  },

  methods: {
    uploadImg(val) {
      this.$store.dispatch('updatePost', val);
    },

    deleteImg(val) {
      this.$store.dispatch('updatePost', val);
    },

    updateActivityForm: _.debounce(function(val) {
      if (!this.activity) return;
      // make sure values aren't the same, else, its going to override with an empty value
      if (this.activity[val.name] === val.value) return;

      this.$store.dispatch('updatePost', {
        collection: 'activities',
        id: this.activityID,
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

    deleteActivity() {
      this.$store.dispatch('deletePost', {
        collection: 'activities',
        id: this.activityID
      });
    },
  },
}
</script>

<style lang="scss">

</style>
