<template>
  <div v-if="boardCopy">
    <span :class="labelStyle">from</span>
    <boarding-card-text-field
      label="what airport/train?"
      name="arrival_from"
      :value="boardCopy.arrival_from"
      class="d-inline-block"
      @newvalue="updateBoardForm"
    />

    <span :class="labelStyle">,</span>

    <span :class="labelStyle">took</span>
    <boarding-card-text-field
      label="what transit service?"
      name="arrival_transport"
      :value="boardCopy.arrival_transport"
      class="d-inline-block"
      @newvalue="updateBoardForm"
    />

    <span :class="labelStyle">and it cost around $</span>
    <boarding-card-text-field
      label="how much?"
      name="arrival_cost"
      :value="boardCopy.arrival_cost"
      class="d-inline-block"
      @newvalue="updateBoardForm"
    />
  </div>
</template>

<script>
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
  },
}
</script>