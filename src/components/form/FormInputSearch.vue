<template>
  <div class="input-group has-feedback">
    <input type="search" class="form-control" :value="value" @input="onInputDebounced" @change="onChange" :placeholder="placeholder" v-bind="$attrs"/>
    <div class="form-control-feedback">
      <i class="icon-search4 text-size-base text-muted"></i>
    </div>
  </div>
</template>
<script>
  import debounce from 'lodash/debounce';

  export default {
    props: {
      value: String,
      placeholder: {type: String, default: 'Rechercher...'},
      debounce: [Boolean, Number],
    },
    computed: {
      onInputDebounced() {
        return this.debounce ? debounce(this.onInput, typeof this.debounce === 'number' ? this.debounce : 750) : this.onInput;
      },
    },
    methods: {
      onInput($evt) {
        this.$emit('input', $evt.target.value);
      },
      onChange($evt) {
        this.$emit('change', $evt.target.value);
      },
    },
  };
</script>
