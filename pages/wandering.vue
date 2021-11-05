<template>
<div>
  <v-row class="mt-3">
    <v-col>
      cities visited:
      <v-chip>
        New York
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
    <v-col cols="6" sm="12" md="6" lg="4" xl="4">
      <v-card>
        <v-card-title>
          Harlem, New York
        </v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item>
              <v-col cols="12">
                <h3>
                  Stayed
                </h3>
                <div>
                  Area: Harlem <br>
                  Rented from: Airbnb <br>
                  Price range: 999 - 1400 <br>
                  whats it like during Day time: <br>
                  whats it like during night time: <br>
                  link of coordinate to gmap
                </div>
              </v-col>
            </v-list-item>
            <v-list-item>
              <v-col cols="12">
                <h3>
                  Public Transit
                </h3>
                <div>
                  0.5miles radius within the apartment<br>
                  Cost: <br>
                  Where to buy Passes: <br>
                  Link to gmap w preloaded Public Transit search 
                </div>
              </v-col> 
            </v-list-item>
            <v-list-item>
              <v-col cols="12">
                <h3>
                  Surrounding
                </h3>
                <div>
                  0.5miles radius within the apartment<br>
                  Cafes: <br>
                  Fancy Restaurants: <br>
                  Quick bites: <br>
                  Grocery: <br>
                  Laundry: <br>
                  Link to gmap w preloaded Categories search
                </div>
              </v-col>
            </v-list-item>

            <v-list-item>
              <v-col cols="12">
                <h3>
                  What service apps works within the area
                </h3>
                <div>
                  Uber, Instacart, UberEats, Doordash, Grubhub
                </div>
              </v-col>
            </v-list-item>

            <v-list-item>
              <v-col cols="12">
                <h3>
                  Tourists Areas
                </h3>
                <div>
                  10 miles away from apartment to Timesquare <br>
                  Link to gmap w preloaded Categories search
                </div>
              </v-col>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</div>
</template>