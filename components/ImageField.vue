<template>
  <div>
    <img v-if="imgSrc" :src="imgSrc" />

    <v-file-input
      v-else
      class="ml-7 mr-7"
      truncate-length="15"
      prepend-icon="mdi-image-size-select-actual"
      @change="uploadBoardImg"
    ></v-file-input>
  </div>
</template>

<script>
export default {
  props: {
    boardID: {
      type: String,
    },
  },

  data() {
    return {
      //
    }
  },

  computed: {
    imgSrc() {
      return '';
    },

    boardImgs() {
      return this.$store.state.storage.boardImgs;
    },
  },

  methods: {
    uploadBoardImg($event) {
      this.$store.dispatch('storage/uploadBoardImg', {
        boardID: this.boardID,
        file: $event,
      })
      .then(res => {
        console.log('UPLOAD SUCCESS')
      })
      .catch(err => {
        console.log('UPLOAD ERROR', err)
      });
    },
  },
}
</script>

<style lang="scss">

</style>