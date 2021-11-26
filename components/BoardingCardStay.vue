<template>
  <div v-if="boardCopy">
    <b :class="labelStyle">during:</b>
    <div>
      <boarding-card-text-field
        label="from: MM/DD/YYYY"
        name="date_stayed.from"
        :value="boardCopy.date_stayed.from"
        class="d-inline-block"
        @newvalue="updateBoardForm"
      />
      <b :class="labelStyle">-</b>
      <boarding-card-text-field
        label="to: MM/DD/YYYY"
        name="date_stayed.to"
        :value="boardCopy.date_stayed.to"
        class="d-inline-block"
        @newvalue="updateBoardForm"
      />
      <br>
    </div>
    <b :class="labelStyle">(0 days, 0 weeks, 0 months)</b><br>

    <b :class="labelStyle">in:</b>
    <boarding-card-text-field
      label="What's the name?"
      name="name"
      :value="boardCopy.name"
      class="d-inline-block"
      @newvalue="updateBoardForm"
    />
    <br>

    <b :class="labelStyle">it cost:</b>
    <boarding-card-text-field
      label="What's price range?"
      name="price"
      :value="boardCopy.price"
      class="d-inline-block"
      @newvalue="updateBoardForm"
    />
    <br>

    <b :class="labelStyle">the place has:</b>
    <boarding-card-text-area
      label="what's the building amenities?"
      name="amenities"
      :value="boardCopy.amenities"
      class="d-inline-block"
      @newvalue="updateBoardForm"
    />

    <b :class="labelStyle">my room has:</b>
    <boarding-card-text-area
      label="what's in your room?"
      name="included"
      :value="boardCopy.included"
      class="d-inline-block"
      @newvalue="updateBoardForm"
    />

    <b :class="labelStyle">whats it like:</b>
    <boarding-card-text-area
      label="what's it like day time?, night time? How's the walk? Is it clean?"
      name="desc"
      :value="boardCopy.desc"
      class="d-inline-block"
      @newvalue="updateBoardForm"
    />
  </div>
</template>

<script>
import moment from 'moment';

import _ from 'lodash';

export default {
  props: {
    boardItem: {
      type: Object,
      default: () => null,
    },
    boardID: {
      type: String,
    },
  },

  data: () => {
    return {
      labelStyle: 'text-body-2 grey--text',
      boardCopy: null,
    }
  },

  created() {
    if ( JSON.stringify(this.boardCopy) === JSON.stringify(this.boardItem) ) return;
    this.boardCopy = JSON.parse( JSON.stringify( this.boardItem ) );
  },

  watch: {
    boardItem(newVal) {
      if ( JSON.stringify(this.boardCopy) != JSON.stringify(newVal) ) return;
      this.boardCopy = JSON.parse( JSON.stringify(newVal) );
    },
  },

  methods: {
    updateBoardForm: _.debounce(function(val) {
      if (!this.boardCopy) return;
      // make sure values aren't the same, else, its going to override with an empty value
      if (this.boardCopy[val.name] === val.value) return;

      this.$store.dispatch('updateBoard', {
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

    formatDate(date) {
      return moment(date).format('ll');
    },
  },
}
</script>
