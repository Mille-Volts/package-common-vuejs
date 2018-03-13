<template>
  <div class="input-group has-feedback">
    <input type="text" ref="input" class="form-control" v-bind="$attrs"/>
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
      dataset: {type: Object, required: true},
      highlight: Boolean,
      hint: Boolean,
      minLength: {type: Number, default: 1},
    },
    data() {
      return {
        loading: false,
      }
    },
    computed: {
      options() {
        return {
          highlight: this.highlight,
          hint: this.hint,
          minLength: this.minLength,
        }
      },
      input() {
        return $(this.$refs.input);
      },
    },
    mounted() {
      this.input.typeahead({...this.options}, {...this.dataset})
        .bind('typeahead:select', (ev, value) => {
          this.$emit('select', value);
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
    beforeDestroy() {
      this.input.typeahead('destroy');
    },
    methods: {}
  };
</script>
