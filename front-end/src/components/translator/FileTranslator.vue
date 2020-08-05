<template>
  <div class="file-translator-wrapper">
    <div class="file-translator-content">
      <label class="file-label" v-if="!file">
        <input
          type="file"
          ref="file"
          @change="selectFile"
        />
        <div class="file-label-text">
          Selecteer een bestand...
        </div>
      </label>
      <span class="error" v-if="error">{{ error }}</span>
      <Loader v-if="loading" />
      <div class="download-file">
        <!-- TODO download button -->
      </div>
    </div>
  </div>
</template>

<script>
import config from "../../config";

import Loader from "../Loader.vue";

export default {
  name: "FileTranslator",
  components: {
    Loader
  },
  data() {
    return {
      file: "",
      loading: false,
      error: ""
    }
  },
  methods: {
    selectFile() {
      this.file = this.$refs.file.files[0];
      this.error = "";
      this.sendFile();
    },

    sendFile() {
      this.loading = true;
      const formData = new FormData();
      formData.append('file', this.file);

      this.$http
        .post(config.API_URL + "/translate/file", formData, {
          params: {
            sl: 'nl',
            tl: 'fr'
          }
        })
        .then(response => {
          // download file
          var fileURL = window.URL.createObjectURL(new Blob([response.data]));
          var fileLink = document.createElement('a');

          fileLink.href = fileURL;
          fileLink.setAttribute('download', "translated-" + this.file.name);
          document.body.appendChild(fileLink);
          fileLink.click();

          // reset
          this.file = "";
          this.error = "";
        })
        .catch(error => {
          console.error(error);
          this.file = "";
          this.error = error.response.data.message;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style scoped lang="scss">
$bg-color: #f7f3f8;

.file-translator-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.error {
  display: block;
  padding: 20px;
  margin-top: 10px;

  border-radius: 8px;
  background-color: #f5c9c9;
}

.file-label {
  display: block;
  width: fit-content;
  margin: 0 auto;
  padding: 10px 20px;

  background-color: $bg-color;
  border-radius: 8px;
  text-align: center;

  input {
    display: none;
  }

  &-text {
    color: #5D4B75;
  }

  &:hover {
    background-color: darken($bg-color, 5);
  }
}
@media (min-width:1025px) {
}
</style>
