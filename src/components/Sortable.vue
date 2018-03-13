<template>
  <div ref="sortable">
    <slot></slot>
  </div>
</template>

<style type="text/less" lang="less">
  @import "../less/_global/global.less";
  @import "../less/components/extensions/jquery_ui/interactions.less";
  @import "../less/components/extensions/jquery_ui/widgets.less";
</style>

<script>
  import $ from 'jquery';
  import 'jquery-ui/ui/widgets/sortable';

  export default {
    name: 'sortable',
    props: {
      value: Array,
      options: Object,
    },
    computed: {
      $sortable() {
        return $(this.$refs.sortable);
      },
      opts() {
        return {
          ...this.options,
          start: this.onStart,
          stop: this.onStop,
        };
      },
    },
    updated() {
      this.initKeysWithIndices();
      this.$sortable.sortable('refresh');
    },
    mounted() {
      this.initKeysWithIndices();
      this.$sortable.sortable(this.opts);
    },
    methods: {
      initKeysWithIndices() {
        const children = this.$sortable.children();
        (this.value || []).forEach((value, index) => {
          if (!children[index]) throw new Error(`Inconsistent state between value and children`);
          $(children[index]).attr('data-key', index);
        });
      },
      onStart(event, ui) {
        this.$emit('start', {event, ui});
      },
      onStop(event, ui) {
        this.$emit('stop', {event, ui});
        const keys = this.$sortable.sortable('toArray', {attribute: 'data-key'});
        const valuesInOrder = [];
        const currentValue = (this.value || []);
        (keys || []).forEach(key => {
          const index = Number(key);
          if (!currentValue[index]) throw new Error(`Inconsistent state between value and children`);
          valuesInOrder.push(currentValue[index]);
        });
        this.$sortable.sortable('cancel'); // IMPORTANT: cancel move for the v-for loop to re-order elements
        this.$emit('input', valuesInOrder);
        this.$emit('change', valuesInOrder);
      }
    },
  }
</script>
