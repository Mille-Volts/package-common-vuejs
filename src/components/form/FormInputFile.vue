<template>
  <input ref="file" type="file" :placeholder="placeholder" v-bind="$attrs" />
</template>

<style type="text/less" lang="less">
  @import "../../less/_global/global.less";
  @import "../../less/components/plugins/uploaders/file-input.less";
</style>

<script>
  import $ from 'jquery';
  import '../../vendor/jquery.uniform.standalone.js'; // jquery.uniform import does not work :(

  export default {
    props: {
      placeholder: {type: String, default: 'Choisir un fichier...'},
      button: {type: String, default: 'Sélectionner...'},
    },
    computed: {
      opts() {
        return {
          fileButtonClass: 'action btn btn-default',
          fileDefaultHtml: this.placeholder,
          fileButtonHtml: this.button,
          filesButtonHtml: this.button,
        };
      }
    },
    mounted() {
      $(this.$refs.file).uniform(this.opts);
    },
    updated() {
      $(this.$refs.file).uniform(this.opts);
    },
  };
</script>
