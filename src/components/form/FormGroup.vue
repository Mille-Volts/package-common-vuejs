<template>
  <div class="form-group" :class="classNames">
    <label v-if="label || emptyLabel" :style="style">{{label || '&nbsp;'}}
      <span v-if="required" class="text-semibold text-warning">*</span>
    </label>
    <slot name="label"></slot>
    <div :style="style">
      <slot></slot>
    </div>
    <div v-if="$slots.feedback" class="form-control-feedback">
      <slot name="feedback"></slot>
    </div>
    <div v-if="$slots.help" class="help-block" :style="style">
      <slot name="help"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      label: {type: String},
      emptyLabel: Boolean,
      required: Boolean,
      success: Boolean,
      warning: Boolean,
      error: Boolean,
      disabled: Boolean,
      size: String,
    },
    computed: {
      classNames() {
        return {
          'has-success': !!this.success,
          'has-warning': !!this.warning,
          'has-error': !!this.error,
          'has-feedback': !!this.$slots.feedback,
          ...(this.size ? {[`form-group-${this.size}`]: true} : {}),
        };
      },
      style() {
        return this.disabled ? {opacity: 0.5} : {};
      }
    }
  }
</script>
