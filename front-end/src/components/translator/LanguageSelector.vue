<template>
  <div class="language-box">
    <select
      name="lang-selector"
      id="selector"
      :value="value"
      @change="onChange"
    >
      <option v-for="(lang, key) in languages" :key="key" :value="lang.code">
        {{ lang.name }}
      </option>
    </select>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "LanguageSelector",
  props: {
    value: {
      type: String,
      default: "nl",
      required: true
    }
  },
  computed: mapGetters({
    languages: "getLanguagesSorted"
  }),
  data() {
    return {
      language: this.lang
    };
  },
  methods: {
    onChange(event) {
      this.$emit("changed", event.target.value);
      this.$emit("input", event.target.value);
    }
  }
};
</script>

<style scoped lang="scss"></style>
