<template>
  <div>
    <span :class="labelStyle">from</span>
    <boarding-card-text-field v-if="boardItem"
      label="what airport/train?"
      :value="boardItem.arrival.from"
      class="d-inline-block"
    />
    <boarding-card-text-field v-else
      label="what airport/train?"
      value=""
      class="d-inline-block"
    />

    <span :class="labelStyle">,</span>

    <span :class="labelStyle">took</span>
    <boarding-card-text-field v-if="boardItem"
      label="what transit service?"
      :value="boardItem.arrival.transport_mode"
      class="d-inline-block"
    />
    <boarding-card-text-field v-else
      label="what transit service?"
      value=""
      class="d-inline-block"
    />

    <span :class="labelStyle">and it cost around $</span>
    <boarding-card-text-field v-if="boardItem"
      label="how much?"
      :value="boardItem.arrival.cost"
      class="d-inline-block"
    />
    <boarding-card-text-field v-else
      label="how much?"
      value=""
      class="d-inline-block"
    />
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
      labelStyle: 'text-body-2 grey--text',
    }
  },

  methods: {

  },
}
</script>