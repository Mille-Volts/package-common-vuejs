<template>
  <select ref="select" class="form-control" :value="value" @input="onInput" @change="onChange" v-bind="$attrs">
    <option v-if="placeholder" value="">{{placeholder}}</option>
    <slot>
      <optgroup v-if="optionsGroups && optionsGroups.length" v-for="options in optionsGroups" :label="options.label" :disabled="options.disabled">
        <option v-for="option in options.children" :value="option.value" v-text="option.label" :disabled="option.disabled"></option>
      </optgroup>
      <option v-if="!optionsGroups || !optionsGroups.length" v-for="option in optionsStandalone" :value="option.value" :disabled="option.disabled" v-text="option.label"></option>
    </slot>
  </select>
</template>

<style type="text/less" lang="less">
@import "../../less/_global/global.less";
@import "../../less/components/plugins/forms/menus/bootstrap-select.less";
</style>

<script>
import $ from "jquery";

export default {
  props: {
    value: [String, Array],
    placeholder: String,
    options: [Object, Array]
  },
  computed: {
    optionsGroups() {
      if (!this.options) return null;
      if (Array.isArray(this.options)) {
        return this.options
          .map(({ label, group, disabled, children, options }) => ({
            label: label || group,
            disabled,
            children: this.getOptionsAsArray(children || options)
          }))
          .filter(this.isValidGroup);
      }
      const groupLabels = Object.keys(this.options);
      return groupLabels
        .map(label => ({
          label,
          children: this.getOptionsAsArray(this.options[label])
        }))
        .filter(this.isValidGroup);
    },
    optionsStandalone() {
      if (!this.options) return null;
      return this.getOptionsAsArray(this.options);
    },
    $select() {
      return $(this.$refs.select);
    }
  },
  updated() {
    // Forcing setting the value after options changed
    this.$select.val(this.value);
  },
  methods: {
    getOptionsAsArray(options) {
      if (!options) return [];
      if (typeof options === "string") return [];
      if (Array.isArray(options)) {
        return options.map(
          ({ label, text, name, title, value, id, disabled }) => ({
            label: label || name || title || text || value || id,
            value: value || id,
            disabled
          })
        );
      }
      const values = Object.keys(options);
      return values.map(value => ({
        label: options[value],
        value
      }));
    },
    isValidGroup({ label, children }) {
      return !!label && !!children && children.length;
    },
    onChange(evt) {
      this.$emit("change", evt.target.value);
    },
    onInput(evt) {
      this.$emit("input", evt.target.value);
    }
  }
};
</script>
