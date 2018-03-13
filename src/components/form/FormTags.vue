<template>
  <input type="text" :value="model" ref="input" data-role="tagsinput" class="form-control" v-bind="$attrs" />
</template>

<style type="text/less" lang="less">
  @import "../../less/_global/global.less";
  @import "../../less/components/plugins/forms/tags/tags-input.less";
</style>

<script>
  import $ from 'jquery';
  import 'bootstrap';
  import 'bootstrap-tagsinput';

  export default {
    props: {
      value: Array,
    },
    computed: {
      model() {
        return (this.value || []).join(',');
      },
      opts() {
        return {
          allowDuplicates: false,
          trimValues: true,
        }
      },
      $input() {
        return $(this.$refs.input);
      },
    },
    mounted() {
      this.$input
        .on('itemAdded', this.itemsChanged)
        .on('itemRemoved', this.itemsChanged);
      this.$input.tagsinput(this.opts);
    },
    updated() {
      this.$input.tagsinput(this.opts);
      this.$input.tagsinput('refresh');
    },
    methods: {
      itemsChanged() {
        this.$emit('input', this.$input.tagsinput('items'));
      },
    },
  };
</script>
