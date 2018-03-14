<template>
  <div class="radio" :class="{disabled: !!disabled}">
    <label>
      <input ref="radio" v-model="model" :value="value" type="radio" :disabled="disabled" />
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
          this.$emit('input', val);
          this.$emit('change', val);
        },
      },
    },
    mounted() {
      $(this.$refs.radio).uniform({radioClass: 'choice'});
    },
    updated() {
      $.uniform.update(this.$refs.radio);
    },
  };
</script>
