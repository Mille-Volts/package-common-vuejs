<template>
  <div class="multi-select-full" :class="`multi-select-${this.multiple? 'multiple': 'single'}`">
    <select
      ref="select"
      :value="value"
      :multiple="multiple"
      :required="required"
      :disabled="disabled"
      @change="onChange"
      v-bind="$attrs"
    >
      <slot></slot>
      <option
        v-if="options"
        v-for="option in options"
        :value="option.value || option"
      >{{option.label || option.value || option}}</option>
    </select>
  </div>
</template>

<style type="text/less" lang="less">
@import "../../less/_global/global.less";
@import "../../less/components/plugins/forms/menus/multiselect.less";

.multi-select-full select {
  width: 100% !important;
}
</style>

<script>
import $ from "jquery";
import _debounce from "lodash/debounce";
import "bootstrap-multiselect";
import "../../vendor/jquery.uniform.standalone.js"; // jquery.uniform import does not work :(

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
    filterPlaceholder: { type: String, default: "Recherche..." },
    emptyValue: { type: [String, Array], default: null },
    parameters: Object
  },
  computed: {
    params() {
      return {
        nonSelectedText:
          this.placeholder ||
          (this.required ? "Choisir..." : "Aucune sélection"),
        multiple: !!this.multiple,
        includeSelectAllOption: !!this.selectAll,
        disabledText: "Sélection désactivée",
        allSelectedText: "Tous",
        nSelectedText: " sélectionnés",
        selectAllText: "Tout sélectionner",
        enableHTML: !!this.html,
        enableFiltering: !!this.filter,
        enableCaseInsensitiveFiltering: true,
        templates: {
          filter:
            '<li class="multiselect-item multiselect-filter"><i class="icon-search4"></i> <input class="form-control" type="text"></li>'
        },
        filterPlaceholder: this.filterPlaceholder,
        ...this.parameters
      };
    }
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
      }
    });
    this.rebuild(true);
    // $select.multiselect("select", this.value || (this.multiple ? [] : null));
    // $(this.$el)
    //   .find("input")
    //   .uniform({ radioClass: "choice" });

    // Place le champ derrière pour avoir l'erreur affichée sur Chrome
    $(this.$el).css({ position: "relative" });
    $(this.$refs.select).css({
      display: "",
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      height: "auto",
      width: "auto",
      opacity: 0
    });
  },
  updated() {
    const $select = $(this.$refs.select);
    // this.model = this.value || (this.multiple ? [] : null);
    $select.multiselect("setOptions", this.params);
    this.rebuild();
  },
  beforeDestroy() {
    $(this.$refs.select).multiselect("destroy");
  },
  methods: {
    rebuild: _debounce(function(first = false) {
      const $select = $(this.$refs.select);
      if (!first) {
        const doRebuild = this.options
          ? !this._previousOptions || this._previousOptions !== this.options
          : !this._previousChildren ||
            this._previousChildren.length !== this.$slots.default.length;
        if (doRebuild) {
          $select.multiselect("rebuild");
          this._previousOptions = this.options;
          this._previousChildren = this.$slots.default;
        }
      }
      $select.multiselect("select", this.value || (this.multiple ? [] : null));
      $(this.$el)
        .find("input")
        .uniform({ radioClass: "choice" });
    }, 50),
    onChange() {
      const value = $(this.$refs.select).val();
      this.$emit("input", value);
      this.$emit("change", value);
    }
  }
};
</script>
