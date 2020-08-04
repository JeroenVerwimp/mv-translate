<template>
  <div class="language-box">
    <select
      name="lang-selector"
      id="selector"
      :value="value"
      @change="onChange"
    >
      <option value="en">English</option>
      <option value="fr">Français</option>
      <option value="nl">Nederlands</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "LanguageSelector",
  props: {
    value: {
      type: String,
      default: "nl",
      required: true
    }
  },
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
