<template>
  <div class="multi-select-full">
    <select ref="select" :value="value" :multiple="multiple" :required="required" :disabled="disabled" @change="onChange" v-bind="$attrs">
      <slot></slot>
      <option v-if="options" v-for="option in options"
              :value="option.value || option">{{option.label || option.value || option}}
      </option>
    </select>
  </div>
</template>

<style type="text/less" lang="less">
  @import "../../less/_global/global.less";
  @import "../../less/components/plugins/forms/menus/multiselect.less";
</style>

<script>
  import $ from 'jquery';
  import 'bootstrap-multiselect';
  import '../../vendor/jquery.uniform.standalone.js'; // jquery.uniform import does not work :(

  export default {
    props: {
      value: [String, Array],
      placeholder: String,
      options: Array,
      disabled: Boolean,
      required: Boolean,
      multiple: Boolean,
      html: Boolean,
      filter: Boolean,
      selectAll: Boolean,
      filterPlaceholder: {type: String, default: 'Recherche...'},
      emptyValue: {type: [String, Array], default: null}
    },
    computed: {
      params() {
        return {
          nonSelectedText: this.placeholder || (this.required ? 'Choisir...' : 'Aucune sélection'),
          multiple: !!this.multiple,
          includeSelectAllOption: !!this.selectAll,
          disabledText: 'Sélection désactivée',
          allSelectedText: 'Tous',
          nSelectedText: ' sélectionnés',
          selectAllText: 'Tout sélectionner',
          enableHTML: !!this.html,
          enableFiltering: !!this.filter,
          enableCaseInsensitiveFiltering: true,
          templates: {
            filter: '<li class="multiselect-item multiselect-filter"><i class="icon-search4"></i> <input class="form-control" type="text"></li>'
          },
          filterPlaceholder: this.filterPlaceholder,
        };
      },
    },
    mounted() {
      const $select = $(this.$refs.select);
      $select.multiselect({
        ...this.params,
        onInitialized: () => {
          $.uniform.update();
        },
        onChange: () => {
          $.uniform.update();
          this.onChange();
        },
        onSelectAll: () => {
          $.uniform.update();
          this.onChange();
        },
        onDeselectAll: () => {
          $.uniform.update();
          this.onChange();
        },
      });
      $select.multiselect('select', this.value || (this.multiple ? [] : null));
      $(this.$el).find('input').uniform({radioClass: 'choice'});

      // Place le champ derrière pour avoir l'erreur affichée sur Chrome
      $(this.$el).css({position: 'relative'});
      $(this.$refs.select).css({
        display: '',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        height: 'auto',
        width: 'auto',
        opacity: 0,
      });
    },
    updated() {
      const $select = $(this.$refs.select);
      // this.model = this.value || (this.multiple ? [] : null);
      $select.multiselect('setOptions', this.params);
      $select.multiselect('rebuild');
      $select.multiselect('select', this.value || (this.multiple ? [] : null));
      $(this.$el).find('input').uniform({radioClass: 'choice'});
    },
    beforeDestroy() {
      $(this.$refs.select).multiselect('destroy');
    },
    methods: {
      onChange() {
        const value = $(this.$refs.select).val();
        this.$emit('input', value);
        this.$emit('change', value);
      },
    }
  };
</script>
