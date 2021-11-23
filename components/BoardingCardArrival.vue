<template>
  <div>
    <span :class="labelStyle">from</span>
    <boarding-card-text-field
      label="what airport/train?"
      :value="boardItem.arrival.from"
      class="d-inline-block"
    />

    <span :class="labelStyle">,</span>

    <span :class="labelStyle">took</span>
    <boarding-card-text-field
      label="what transit service?"
      :value="boardItem.arrival.transport_mode"
      class="d-inline-block"
    />

    <span :class="labelStyle">and it cost around $</span>
    <boarding-card-text-field
      label="how much?"
      :value="boardItem.arrival.cost"
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