<template>
  <div class="checkbox" :class="{disabled: !!disabled}">
    <label>
      <input ref="checkbox" v-model="model" :value="value" type="checkbox" :disabled="disabled" v-bind="$attrs"/>
      <slot></slot>
    </label>
  </div>
</template>
<script>
  import $ from 'jquery';
  import '../../vendor/jquery.uniform.standalone.js'; // jquery.uniform import does not work :(

  export default {
    model: {
      prop: 'm',
    },
    props: {
      m: [String, Boolean, Array],
      value: {type: [String, Boolean], default: true},
      disabled: Boolean,
    },
    computed: {
      model: {
        get() {
          return this.m;
        },
        set(val) {
          const value = val? this.value: false;
          this.$emit('input', value);
          this.$emit('change', value);
        },
      },
    },
    mounted() {
      $(this.$refs.checkbox).uniform({radioClass: 'choice'});
    },
    updated() {
      $.uniform.update(this.$refs.checkbox);
    },
  };
</script>
