<template>
  <div>
    <b :class="labelStyle">
      how to get pass and how much it cost
    </b>
    <v-btn depressed
      @click="gotoGooglePublicTransit(boardItem.location.city, boardItem.location.state)">
      search for Transits
    </v-btn>
    <v-btn depressed
      @click="gotoGooglePublicTransitMap(boardItem.location.city, boardItem.location.state)"
      class="mt-3 mb-3">
      search for map
    </v-btn>
    <br>
    <ul>
      <li v-for="(transitItem, transitIndex) in boardItem.public_transit_pass" 
        :key="'transitItem-'+transitIndex"
        class="mb-6">
        <boarding-card-text-field
          label="What ride option?"
          :value="transitItem.name"
          class="d-inline-block"
        />
        <span :class="labelStyle">cost $</span>
        <boarding-card-text-field
          label="How much?"
          :value="transitItem.cost"
          class="d-inline-block"
        />
        <span :class="labelStyle">and tickets are sold at </span>
        <boarding-card-text-field
          label="Where to buy?"
          :value="transitItem.where_purchase"
          class="d-inline-block"
        />
        <br>

        <a :href="transitItem.info_link" target="_blank">more info</a>
        <v-btn v-if="transitLink != 'transitItem-'+transitIndex"
          @click="() => transitLink = 'transitItem-'+transitIndex" icon>
          <v-icon small color="grey">
            mdi-pencil
          </v-icon>
        </v-btn>
        <v-btn v-if="transitLink === 'transitItem-'+transitIndex"
          @click="() => transitLink = null" icon>
          <v-icon small color="grey">
            mdi-close
          </v-icon>
        </v-btn>

        <br>

        <div v-if="transitLink === 'transitItem-'+transitIndex">
          <boarding-card-text-field
            label="enter link here"
            :value="transitItem.info_link"
            class="d-inline-block"
          />
        </div>
      </li>

      <li>
        <boarding-card-text-field
          label="What ride option?"
          value=""
          class="d-inline-block"
        />
        <span :class="labelStyle">cost $</span>
        <boarding-card-text-field
          label="How much?"
          value=""
          class="d-inline-block"
        />
        <span :class="labelStyle">and tickets are sold at </span>
        <boarding-card-text-field
          label="Where to buy?"
          value=""
          class="d-inline-block"
        />
        <br>
        <boarding-card-text-field
          label="enter link here"
          value=""
          class="d-inline-block"
        />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    boardItem: {
      type: Object,
      default: () => null,
    }
  },

  data: () => {
    return {
      transitLink: null,
      labelStyle: 'text-body-2 grey--text',
    }
  },

  methods: {
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