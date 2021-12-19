<template>
  <div class="text-right">
    <v-btn
      v-if="value"
      icon
      @click="deleteImg"
    >
      <v-icon>mdi-close</v-icon>
    </v-btn>

    <img v-if="value" :src="value" />

    <v-file-input
      v-else
      class="ml-7 mr-7"
      truncate-length="15"
      prepend-icon="mdi-image-size-select-actual"
      @change="uploadImg"
    ></v-file-input>
  </div>
</template>

<script>
export default {
  props: {
    collection: {
      type: String,
    },
    formID: {
      type: String,
    },
    value: {
      type: String,
    },
    name: {
      type: String,
    },
  },

  data() {
    return {
      //
    }
  },

  methods: {
    uploadImg($event) {
      // encode the file using the FileReader API
      const reader = new FileReader();
      reader.onloadend = () => {

        // emit value
        this.$emit('onUploadImg', {
          collection: this.collection,
          id: this.formID,
          key: this.name,
          value: reader.result
        });

      };
      reader.readAsDataURL($event);
    },

    deleteImg() {
      // emit boolean
      this.$emit('onDeleteImg', {
        collection: this.collection,
        id: this.formID,
        key: this.name,
        value: ""
      });
    },
  },
}
</script>

<style lang="scss">

</style>