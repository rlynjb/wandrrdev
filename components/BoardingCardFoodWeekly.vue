<template>
  <div>
    <ul v-if="boardItem">
      <li v-for="(foodItem, foodIndex) in boardItem.daily_food_expense" :key="'foodExp-'+foodIndex">
        <boarding-card-text-field
          label="what kind of meal?"
          :value="foodItem.meal_type"
          class="d-inline-block"
        />
        <boarding-card-text-field
          label="how frequent"
          :value="foodItem.frequency"
          class="d-inline-block"
        />
        <span :class="labelStyle">cost around $</span>
        <boarding-card-text-field
          label="how much"
          :value="foodItem.avg_cost"
          class="d-inline-block"
        />
        <span :class="labelStyle">but $</span>{{ foodWeeklyTotal[foodIndex] }}
        <span :class="labelStyle">weekly</span>
      </li>
    </ul>

    <div>
      <boarding-card-text-field
        label="what kind of meal?"
        value=""
        class="d-inline-block"
      />
      <boarding-card-text-field
        label="how frequent"
        value=""
        class="d-inline-block"
      />
      <span :class="labelStyle">cost around $</span>
      <boarding-card-text-field
        label="how much"
        value=""
        class="d-inline-block"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    boardItem: {
      type: Object,
      default: () => null,
    },
    foodWeeklyTotal: {
      type: Array,
      default: () => [],
    },
  },

  data: () => {
    return {
      labelStyle: 'text-body-2 grey--text',
    }
  },

  methods: {

  },
}
</script>