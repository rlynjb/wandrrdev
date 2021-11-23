<template>
  <div>
    <b :class="labelStyle">during:</b>
    <div v-if="boardItem">
      {{ formatDate(boardItem.date_stayed.from) }} 
      <b :class="labelStyle">-</b> {{ formatDate(boardItem.date_stayed.to) }} <br>
    </div>
    <div v-else>
      empty for now <br>
    </div>
    <b :class="labelStyle">(0 days, 0 weeks, 0 months)</b><br>

    <b :class="labelStyle">in:</b>
    <boarding-card-text-field v-if="boardItem"
      label="What's the name?"
      :value="boardItem.name"
      class="d-inline-block"
    />
    <boarding-card-text-field v-else
      label="What's the name?"
      value=""
      class="d-inline-block"
    />
    <br>

    <b :class="labelStyle">it cost:</b>
    <boarding-card-text-field v-if="boardItem"
      label="What's price range?"
      :value="boardItem.price"
      class="d-inline-block"
    />
    <boarding-card-text-field v-else
      label="What's price range?"
      value=""
      class="d-inline-block"
    />
    <br>

    <b :class="labelStyle">the place has:</b>
    <boarding-card-text-area v-if="boardItem"
      label="what's the building amenities?"
      :value="boardItem.amenities"
      class="d-inline-block"
    />
    <boarding-card-text-area v-else
      label="what's the building amenities?"
      value=""
      class="d-inline-block"
    />

    <b :class="labelStyle">my room has:</b>
    <boarding-card-text-area v-if="boardItem"
      label="what's in your room?"
      :value="boardItem.included"
      class="d-inline-block"
    />
    <boarding-card-text-area v-else
      label="what's in your room?"
      value=""
      class="d-inline-block"
    />

    <b :class="labelStyle">whats it like:</b>
    <boarding-card-text-area v-if="boardItem"
      label="what's it like day time?, night time? How's the walk? Is it clean?"
      :value="boardItem.desc"
      class="d-inline-block"
    />
    <boarding-card-text-area v-else
      label="what's it like day time?, night time? How's the walk? Is it clean?"
      value=""
      class="d-inline-block"
    />
  </div>
</template>

<script>
import moment from 'moment';

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
    formatDate(date) {
      return moment(date).format('ll');
    },
  },
}
</script>
