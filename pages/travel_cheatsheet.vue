<template>
<div class="pt-10 pb-16">
  <h2>Travel Cheatsheet</h2>
  <v-row class="mt-3">
    <v-col>
      <b class="d-block d-sm-block d-md-block d-lg-block d-xl-block">cities:</b>
      <v-chip>
        Las Vegas
      </v-chip>
      <v-chip>
        New York City
      </v-chip>
      <v-chip>
        Boston
      </v-chip>
      <v-chip>
        San Francisco
      </v-chip>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="6" sm="12" md="6" lg="4" xl="4"
      v-for="(boardItem, boardIndex) in boardingPlace"
      :key="'board-'+boardIndex">
      <boarding-card :boardItem="boardItem" />
    </v-col>
  </v-row>
</div>
</template>

<script>
import BoardingCard from '../components/BoardingCard.vue'
export default {
  components: { BoardingCard },
  data: () => {
    return {
      boardingPlace: [
        {
          id: 'qwe123aqe123asd',
          area_name: 'Downtown Las Vegas', // area code/name
          name: 'the 211', // apt or airbnb or coliving.com, etc
          price: '$',
          date_stayed: {
            from: '12-03-2021',
            to: '01-04-2022'
          },
          desc: 'during daytime/night time, how clean is it, whats the parking space like',
          amenities: ['gym', 'laundry in every floor'], // shared resources
          included: ['electricity', 'utilities', 'basic cable', 'shared internet'], // whats included privately
          website: 'hello',
          location: {
            coordinates: [36.16949914715935, -115.1360749310861],
            street_address: '211 N 8th St',
            city: 'Las Vegas',
            state: 'NV',
            zip: '89101',
            country: 'US'
          },
          public_transit_desc: 'how much and where to buy a pass',
          nearby_essentials_desc: '',
          tourist_area_desc: '',
        },
      ],
    }
  },

  methods: {
    //
  },
}
</script>