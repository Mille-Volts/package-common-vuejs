<template>
  <body :class="authenticated? 'navbar-bottom layout-boxed': 'login-container'">
  <slot></slot>
  </body>
</template>

<style type="text/less" lang="less">
  @import "../less/bootstrap.less";
  @import "../less/core.less";
  @import "../less/components.less";
  @import "../less/colors.less";

  .table-responsive {
    overflow-x: visible;
    @media screen and (max-width: @screen-xs-max) {
      overflow-x: auto;
    }
  }
</style>

<script>
  import 'jquery';
  import 'bootstrap';

  export default {
    name: 'app-layout',
    props: {
      authenticated: Boolean,
    },
  }
</script>
