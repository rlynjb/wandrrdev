<template>
  <div class="text-right">
    <v-btn
      v-if="imgSrc"
      icon
      @click="deleteBoardImg"
    >
      <v-icon>mdi-close</v-icon>
    </v-btn>

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
    imgsrc: {
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
      if (!this.boardID) return;
      return this.$store.state.boards[this.boardID].main_photo;
    },
  },

  methods: {
    uploadBoardImg($event) {
      // encode the file using the FileReader API
      const reader = new FileReader();
      reader.onloadend = () => {

        // emit value
        this.$store.dispatch('updateBoard', {
          id: this.boardID,
          key: 'main_photo',
          value: reader.result
        });

      };
      reader.readAsDataURL($event);
    },

    deleteBoardImg() {
      // emit boolean
      this.$store.dispatch('updateBoard', {
        id: this.boardID,
        key: 'main_photo',
        value: ""
      });
    },
  },
}
</script>

<style lang="scss">

</style>