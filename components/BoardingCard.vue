<template>
<v-card v-if="board" flat id="boardingCard" class="grey--text text--lighten-5">
  <v-btn v-if="isUserAuthenticated"
    @click="deleteBoard"
    depressed
    class="float-right"
    icon
  >
    <v-icon>mdi-close</v-icon>
  </v-btn>

  <v-card-title class="pl-7 pr-7 pt-6 pb-6 primary--text">
    <v-col cols="12" class="pa-0">
      <v-icon>mdi-bed</v-icon>
      <text-area
        class="boardingCard-title"
        label="What's the area?"
        name="area_name"
        :value="board.area_name"
        @newvalue="updateBoardForm"
      />
    </v-col>

    <v-col cols="12" class="pl-0 pr-0 pt-2 pb-0">
      <location-field
        addressName="area_address"
        :addressValue="board.area_address"
        coordinatesName="area_coordinates"
        :coordinatesValue="board.area_coordinates"
        neighborhoodName="area_type"
        :neighborhoodValue="board.area_type"
        @onUpdateAddress="updateBoardForm"
      />
    </v-col>
  </v-card-title>

  <v-carousel
    hide-delimiter-background
    delimiter-icon="mdi-minus"
  >
    <v-carousel-item>
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

        <!--
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
        -->
      </v-expansion-panels>
    </v-carousel-item>

    <v-carousel-item>
      <image-field
        collection="boards"
        :formID="boardID"
        name="main_photo"
        :value="board.main_photo"
        @onUploadImg="uploadImg"
        @onDeleteImg="deleteImg"
      />
    </v-carousel-item>

    <v-carousel-item>
      youtube video
    </v-carousel-item>
  </v-carousel>

</v-card>
</template>

<script>
import TextField from './TextField.vue';
import TextArea from './TextArea.vue';
import BoardingCardStay from './BoardingCardStay.vue';
import BoardingCardArrival from './BoardingCardArrival.vue';
import BoardingCardPublicTransit from './BoardingCardPublicTransit.vue';
import BoardingCardNearbyEssentials from './BoardingCardNearbyEssentials.vue';

import _ from 'lodash';
import ImageField from './ImageField.vue';
import LocationField from './LocationField.vue';

export default {
  components: {
    TextField,
    TextArea,
    BoardingCardStay,
    BoardingCardArrival,
    BoardingCardPublicTransit,
    BoardingCardNearbyEssentials,
    ImageField,
    LocationField,
  },

  props: {
    boardID: {
      type: String,
    },
  },

  data: () => {
    return {
      panelHeaderStyle: 'text-overline grey--text text--darken-1 primary--text font-weight-bold',
      defaultOpenPanels: [0],
    }
  },

  computed: {
    board() {
      if (!this.$store.state.boards) return;
      return this.$store.state.boards[this.boardID];
    },

    area_address() {
      return this.board.area_address;
    },

    isUserAuthenticated() {
      return this.$store.state.auth.isUserAuthenticated;
    },
  },

  methods: {
    gotoGmap() {
      let googleMapUrlSearch = `https://www.google.com/maps/place/${ this.area_address.replaceAll(' ',  '+') }`;
      window.open(googleMapUrlSearch, '_blank');
    },

    uploadImg(val) {
      this.$store.dispatch('updatePost', val);
    },

    deleteImg(val) {
      this.$store.dispatch('updatePost', val);
    },

    updateBoardForm: _.debounce(function(val) {
      if (!this.board) return;
      // make sure values aren't the same, else, its going to override with an empty value
      if (this.board[val.name] === val.value) return;

      this.$store.dispatch('updatePost', {
        collection: 'boards',
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
      this.$store.dispatch('deletePost', {
        collection: 'boards',
        id: this.boardID
      });
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
  .boardingCard-title textarea {
    color: #9575cd;
    font-size: 1.25rem;
  }
  .v-expansion-panel-content {
    textarea {
      line-height: 1.5em;
    }
  }

  .location-container {
    input {
      color: #fff;
    }
  }
}
</style>