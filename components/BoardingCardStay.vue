<template>
  <div v-if="board" id="boardingCardStay">
    <b :class="labelStyle">during:</b>
    <div class="d-inline-block">
      <text-field
        label="from: MM/DD/YYYY"
        name="stayed_date_from"
        :value="board.stayed_date_from"
        class="d-inline-block date-field"
        @newvalue="updateBoardForm"
      />

      <b :class="labelStyle" class="ml-2 mr-2">-</b>

      <text-field
        label="to: MM/DD/YYYY"
        name="stayed_date_to"
        :value="board.stayed_date_to"
        class="d-inline-block date-field"
        @newvalue="updateBoardForm"
      />
      <br>
      <b :class="labelStyle">(0 days, 0 weeks, 0 months)</b>
    </div>

    <br>
<!--
    <b :class="labelStyle">in:</b>
    <text-field
      label="What's the name?"
      name="name"
      :value="board.name"
      class="d-inline-block"
      @newvalue="updateBoardForm"
    />
-->
    <b :class="labelStyle">it cost:</b>
    <text-field
      label="What's price range?"
      name="price"
      :value="board.price"
      class="d-inline-block"
      @newvalue="updateBoardForm"
    />
    <br>

    <b :class="labelStyle">the place has:</b>
    <text-area
      label="what's the building amenities?"
      name="amenities"
      :value="board.amenities"
      class="d-inline-block"
      @newvalue="updateBoardForm"
    />

    <b :class="labelStyle">my room has:</b>
    <text-area
      label="what's in your room?"
      name="included"
      :value="board.included"
      class="d-inline-block"
      @newvalue="updateBoardForm"
    />

    <b :class="labelStyle">whats it like:</b>
    <text-area
      label="what's it like day time?, night time? How's the walk? Is it clean?"
      name="desc"
      :value="board.desc"
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
    boardID: {
      type: String,
    },
  },

  data: () => {
    return {
      labelStyle: 'boardCardLabel text-body-2 primary--text',
    }
  },

  computed: {
    board() {
      return this.$store.state.boards[this.boardID];
    },
  },

  methods: {
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

    formatDate(date) {
      return moment(date).format('ll');
    },
  },
}
</script>

<style lang="scss">
.boardCardLabel {
  vertical-align: top;
}

#boardingCardStay {
  .date-field {
    width: 27%;
  }
}
</style>
