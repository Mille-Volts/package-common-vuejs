<template>
  <div :class="{checkbox: !this.inline, 'checkbox-inline': !!this.inline, disabled: !!disabled}">
    <label>
      <input ref="checkbox" v-model="model" :value="value" type="checkbox" :disabled="disabled"/>
      <slot></slot>
    </label>
  </div>
</template>
<script>
import $ from "jquery";
import "../../vendor/jquery.uniform.standalone.js"; // jquery.uniform import does not work :(

export default {
  model: {
    prop: "m"
  },
  props: {
    m: [String, Boolean, Array],
    inline: Boolean,
    value: { type: [String, Boolean], default: true },
    disabled: Boolean
  },
  computed: {
    model: {
      get() {
        return this.m;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  },
  mounted() {
    $(this.$refs.checkbox).uniform({ radioClass: "choice" });
  },
  updated() {
    $.uniform.update(this.$refs.checkbox);
  }
};
</script>
