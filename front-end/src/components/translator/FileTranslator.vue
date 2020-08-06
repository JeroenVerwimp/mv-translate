<template>
  <div class="file-translator-wrapper">
    <div class="file-translator-content">
      <label class="file-label" v-if="!file">
        <input type="file" ref="file" @change="selectFile" />
        <div class="file-label-text">
          Selecteer een bestand...
        </div>
      </label>
      <span class="error" v-if="error">{{ error }}</span>
      <Loader v-if="loading" />
      <div class="download-wrapper" v-if="downloadedBlob">
        <span class="download" @click="downloadFile()">Download</span>
        <a href="#" @click="reset()">Selecteer een ander bestand.</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import config from "../../config";
import Loader from "../Loader.vue";

export default {
  name: "FileTranslator",
  components: {
    Loader
  },
  computed: mapState({
    sl: "sourceLanguage",
    tl: "targetLanguage"
  }),
  data,
  methods: {
    selectFile,
    translate,
    downloadFile,
    reset
  }
};

function data() {
  return {
    file: "",
    loading: false,
    error: "",
    downloadedBlob: ""
  };
}

function reset() {
  this.file = "";
  this.downloadedBlob = "";
}

function selectFile() {
  this.file = this.$refs.file.files[0];
  this.error = "";
  this.translate();
}

function translate() {
  this.loading = true;
  const formData = new FormData();
  formData.append("file", this.file);

  this.$http
    .post(config.API_URL + "/translate/file", formData, {
      params: {
        sl: this.sl,
        tl: this.tl
      }
    })
    .then(response => {
      // download file
      this.downloadedBlob = new Blob([response.data]);
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

function downloadFile() {
  var fileURL = window.URL.createObjectURL(this.downloadedBlob);
  var fileLink = document.createElement("a");

  fileLink.href = fileURL;
  fileLink.setAttribute("download", `translated-${this.file.name}`);
  document.body.appendChild(fileLink);
  fileLink.click();

  // reset
  this.file = "";
  this.downloadedBlob = "";
}
</script>

<style scoped lang="scss">
$bg-color: #f7f3f8;
$download-bg-color: #e6f0e8;
$error-bg-color: #f5c9c9;

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
  background-color: $error-bg-color;
}

.file-label, .download {
  display: block;
  padding: 10px 20px;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
}

.file-label {
  width: fit-content;
  margin: 0 auto;

  background-color: $bg-color;

  input {
    display: none;
  }

  &-text {
    color: #5d4b75;
  }

  &:hover {
    background-color: darken($bg-color, 5);
  }
}

.download-wrapper {
  .download {
    background-color: $download-bg-color;

    &:hover {
      background-color: darken($download-bg-color, 5);
    }
  }

  a {
    display: block;
    padding-top: 10px;
    text-decoration: none;
    color: #5d4b75;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
