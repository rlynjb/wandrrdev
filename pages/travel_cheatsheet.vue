<template>
<div class="pt-10 pb-16">
  <h2 class="d-inline-block">Travel Cheatsheet</h2>
  <v-btn icon
    class="d-inline-block"
    @click="addStay"
  >
  </v-btn>

  <v-row class="mt-3">
    <v-col>
      <b class="d-block d-sm-block d-md-block d-lg-block d-xl-block primary--text">
        Cities
      </b>
      <v-chip v-for="(cityItem, cityIndex) in cities" :key="'city-' + cityIndex"
        class="mr-2"
        :disabled="!cityItem.visitied">
        {{ cityItem.name }}
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
      cities: [
        {
          name: 'Las Vegas',
          visitied: true
        },
        {
          name: 'North Carolina',
          visitied: true
        },
        {
          name: 'New York City',
          visitied: false
        },
        {
          name: 'Boston',
          visitied: false
        },
        {
          name: 'San Francisco',
          visitied: false
        }
      ],
      boardingPlace: [
        /*{
          id: 'qwe123aqe123asd',
          area_name: 'Downtown Las Vegas', // area code/name
          name: 'the 211', // apt or airbnb or coliving.com, etc
          price: '700',
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
          arrival: {
            from_airport: 'Uber from Raleigh airport cost around $40.',
            from_train: '',
          },
        },*/
        {
          id: 'qwe123aasdasdqe123asd',
          area_name: 'Durham near Duke University', // area code/name
          name: 'my cuz apt', // apt or airbnb or coliving.com, etc
          price: '500',
          date_stayed: {
            from: '11-17-2021',
            to: '12-03-2021'
          },
          //desc: 'during daytime/night time, how clean is it, whats the parking space like',
          desc: 'during daytime, not as busy. most residents are students. during night time, safe to walk. its a clean area.',
          amenities: "gym, free coffee on 1st floor", // shared resources
          included: "electricity, utilities, basic cable, shared internet", // whats included privately
          website: '',
          location: {
            coordinates: [36.00723495286383, -78.92443993684024],
            street_address: '2102 W Main St',
            city: 'Durham',
            state: 'NC',
            zip: '27705',
            country: 'US'
          },
          arrival: {
            from: 'Raleigh airport',
            transport_mode: 'Uber',
            cost: '40',
          },
          daily_food_expense: [
            {
              meal_type: 'coffee', // bfast, snack, dinner, lunch, #treatyoself, etc
              avg_cost: '8',
              frequency: 'daily', // 7 times a week
              // might need to redo this option to:
              // daily (7x/wk), occasional ( avg of 3x/wk ), rarely ( 1/wk )
            },
            {
              meal_type: 'whole foods', // bfast, snack, dinner, lunch, #treatyoself, etc
              avg_cost: '15',
              frequency: 'occasionally', // 7 times a week
            }
          ],
          public_transit_pass: [
            {
              name: 'single ride metrocard',
              cost: '2.50',
              where_purchase: 'vending machines',
              info_link: 'https://freetoursbyfoot.com/how-to-buy-a-new-york-city-subway-pass/'
            },
            {
              name: '7-day metrocard',
              cost: '29.00',
              where_purchase: 'vending machines',
              info_link: 'https://freetoursbyfoot.com/how-to-buy-a-new-york-city-subway-pass/'
            }
          ],
        },
      ],
    }
  },

  methods: {
    addStay() {
      //
    },
  },
}
</script>