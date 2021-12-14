<template>
  <div>
    <v-file-input
      class="ml-7 mr-7"
      truncate-length="15"
      prepend-icon="mdi-image-size-select-actual"
      @change="uploadBoardImg"
    ></v-file-input>

    <img src="http://placehold.it/500x500" />
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

  methods: {
    uploadBoardImg($event) {
      console.log($event)
    },
  },
}
</script>

<style lang="scss">

</style>