<template>
  <div v-if="board">
    <span :class="labelStyle">from</span>
    <boarding-card-text-field
      label="what airport/train?"
      name="arrival_from"
      :value="board.arrival_from"
      class="d-inline-block"
      @newvalue="updateBoardForm"
    />

    <span :class="labelStyle">,</span>

    <span :class="labelStyle">took</span>
    <boarding-card-text-field
      label="what transit service?"
      name="arrival_transport"
      :value="board.arrival_transport"
      class="d-inline-block"
      @newvalue="updateBoardForm"
    />

    <span :class="labelStyle">and it cost around $</span>
    <boarding-card-text-field
      label="how much?"
      name="arrival_cost"
      :value="board.arrival_cost"
      class="d-inline-block"
      @newvalue="updateBoardForm"
    />
  </div>
</template>

<script>
export default {
  props: {
    boardID: {
      type: String,
    },
  },

  data: () => {
    return {
      labelStyle: 'text-body-2 grey--text',
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
  },
}
</script>