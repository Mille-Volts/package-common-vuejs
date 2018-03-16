<template>
  <div class="input-group has-feedback">
    <input type="text" ref="input" class="form-control" v-model="model" />
    <div class="form-control-feedback" v-if="loading">
      <i class="icon-spinner3 spinner"></i>
    </div>
    <slot name="input-group"></slot>
  </div>
</template>

<style type="text/less" lang="less">
  @import "../../less/_global/global.less";
  @import "../../less/components/plugins/forms/extensions/typeahead.less";
</style>

<script>
  import $ from 'jquery';
  import 'typeahead.js';

  export default {
    props: {
      value: {},
      dataset: {type: Object, required: true},
      highlight: Boolean,
      hint: Boolean,
      minLength: {type: Number, default: 1},
      options: Object,
    },
    data() {
      return {
        loading: false,
      }
    },
    computed: {
      model: {
        get() {
          return this.value;
        },
        set(value) {
          this.onChange(value);
        }
      },
      opts() {
        return {
          highlight: this.highlight,
          hint: this.hint,
          minLength: this.minLength,
          ...this.options,
        }
      },
      $input() {
        return $(this.$refs.input);
      },
    },
    mounted() {
      this.$input.typeahead({...this.opts}, {...this.dataset})
        .bind('typeahead:change', (ev, value) => {
          this.onChange(value);
        })
        .bind('typeahead:select', (ev, value) => {
          this.$emit('select', value);
          this.onChange(value);
        })
        .bind('typeahead:asyncrequest', () => {
          this.loading = true;
        })
        .bind('typeahead:asynccancel', () => {
          this.loading = false;
        })
        .bind('typeahead:asyncreceive', () => {
          this.loading = false;
        });
    },
    updated() {
      //this.$input.typeahead('val', this.value);
    },
    beforeDestroy() {
      this.$input.typeahead('destroy');
    },
    methods: {
      onChange(value) {
        this.$emit('input', value);
        this.$emit('change', value);
      },
    }
  };
</script>
