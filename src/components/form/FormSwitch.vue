<template>
  <div class="checkbox checkbox-switchery display-inline-block" :class="`switchery-${size}`">
    <label>
      <span v-if="side === 'right'" class="text-semibold"><slot>&nbsp;</slot></span>
      <span><input ref="checkbox" type="checkbox" v-model="model" @change="onChange" /></span>
      <span v-if="side === 'left'" class="text-semibold"><slot>&nbsp;</slot></span>
    </label>
  </div>
</template>

<style type="text/less" lang="less">
  @import "../../less/_global/global.less";
  @import "../../less/components/plugins/forms/checkboxes/switchery.less";
</style>

<script>
  import Switchery from 'switchery';

  export default {
    props: {
    	value: Boolean,
      side: {type: String, default: 'left'}, // Alignement de la switchbox
      size: {type: String, default: 'default'},
    },
    data() {
      return {
        model: !!this.value,
      }
    },
    watch: {
      value() {
        if (!this.value !== !this.model) {
          this._switchery.setPosition(true);
        }
        this.model = !!this.value;
      },
    },
    mounted() {
      this._switchery = new Switchery(this.$refs.checkbox);
    },
    methods: {
      onChange() {
        this.model = !this._switchery.isChecked();
        this.$emit('input', this.model);
        this.$emit('change', this.model);
      },
    },
  };
</script>
