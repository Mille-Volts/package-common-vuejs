<template>
  <div class="page-container">
    <div class="page-content">
      <div class="content-wrapper">

        <div class="text-center content-group">
          <h1 class="error-title">404</h1>
          <h5>La page demandée n'existe pas !</h5>

          <a class="btn btn-warning" href="/">Revenir à l'accueil</a>
        </div>
      </div>

    </div>

  </div>
</template>

<style type="text/less" lang="less">
  @import "../less/_global/global.less";
  @import "../less/components/pages/error.less";
</style>

<script>
  import 'jquery';
  import 'bootstrap';

  export default {
    name: 'error-404-layout',
    mounted() {
      require('../vendor/app.js');
    },
  }
</script>
