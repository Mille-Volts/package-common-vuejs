<template>
  <div class="input-group">
    <span class="input-group-addon"><i class="icon icon-calendar"></i></span>
    <input type="date" ref="input" class="form-control" :disabled="disabled" :min="min" :max="max" :value="model" @input="onInput" @change="onChange" v-bind="$attrs"/>
  </div>
</template>


<style type="text/less" lang="less">
  @import "../../less/_global/global.less";
  @import "../../less/components/plugins/pickers/pickadate/base.less";
  @import "../../less/components/plugins/pickers/pickadate/date.less";
  @import "../../less/components/plugins/pickers/pickadate/time.less";
</style>

<script>
  import $ from 'jquery';
  import moment from 'moment';
  import 'pickadate/lib/picker.date.js';
  import 'pickadate/lib/picker.time.js';
  import 'pickadate/lib/translations/fr_FR.js';

  export default {
    props: {
      value: String,
      disabled: Boolean,
      min: {type: Date},
      max: {type: Date},
      custom: {type: Object, default: () => ({})}, // Specific Pick-a-date options
    },
    computed: {
      model() {
        return this.value ? moment(this.value).format('YYYY-MM-DD') : null;
      },
      options() {
        return {
          ...(this.model ? {select: moment(this.model).toDate()} : null),
          min: this.min || false,
          max: this.max || false,
          disable: !!this.disabled,
          enable: !this.disabled,
          ...this.custom,
        }
      },
      picker() {
        return $(this.$refs.input).pickadate('picker');
      },
    },
    mounted() {
      $(this.$refs.input).pickadate({
        ...this.options,
        onSet: ({select, highlight}) => {
          if (highlight) return;
          const date = select ? moment(select).format('YYYY-MM-DD') : null;
          this.$emit('input', date);
          this.$emit('change', date);
        }
      });
      this.updateValue();
    },
    updated() {
      this.picker.set(this.options);
      this.updateValue();
    },
    beforeDestroy() {
      this.picker.stop();
    },
    methods: {
      onInput({target: {value}}) {
        this.$emit('input', value);
      },
      onChange({target: {value}}) {
        this.$emit('change', value);
      },
      updateValue() {
        if (this.options.select) {
          this.picker.set('select', this.options.select); // Force refresh display
        } else {
          this.picker.set('clear');
        }
      },
    }
  };
</script>
