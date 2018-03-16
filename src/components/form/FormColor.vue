<template>
  <input ref="input" type="text" class="form-control" :value="value" :disabled="disabled" :required="required" />
</template>


<style type="text/less" lang="less">
@import "../../less/_global/global.less";
@import "../../less/components/plugins/pickers/spectrum.less";

.sp-container {
  z-index: @zindex-modal + 1;
}
</style>

<script>
import $ from "jquery";
import "spectrum-colorpicker";

export default {
  props: {
    value: String,
    disabled: Boolean,
    required: Boolean,
    options: Object,
    alpha: Boolean,
    palette: Array
  },
  computed: {
    opts() {
      return {
        allowEmpty: !this.required,
        showAlpha: !!this.alpha,
        disabled: !!this.disabled,
        palette: this.palette,
        chooseText: "OK",
        cancelText: "Annuler",
        ...(this.options || {})
      };
    },
    $input() {
      return $(this.$refs.input);
    }
  },
  mounted() {
    this.$input.spectrum({
      ...this.opts,
      change: color => {
        const value = color.toHexString();
        this.$emit("input", value);
        this.$emit("change", value);
      }
    });
  },
  updated() {
    this.$input.spectrum("set", this.value);
    for (let opt in this.opts) {
      this.$input.spectrum("option", opt, this.opts[opt]);
    }
    this.$input.spectrum(this.disabled ? "disable" : "enable");
  },
  beforeDestroy() {
    this.$input.spectrum("destroy");
  }
};
</script>
