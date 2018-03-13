<template>
  <div class="page-container">

    <div class="page-content">

      <div class="content-wrapper">

        <form @submit.prevent="$emit('tryLogin', {username, password})" class="login-form">
          <div class="panel panel-body">
            <div class="text-center">
              <h5 class="content-group-lg">
                {{title}}
                <small class="display-block">Identifiez-vous</small>
              </h5>
            </div>

            <div class="form-group has-feedback has-feedback-left">
              <input type="text" class="form-control" v-model="username" placeholder="Identifiant">
              <div class="form-control-feedback">
                <i class="icon-user text-muted"></i>
              </div>
            </div>

            <div class="form-group has-feedback has-feedback-left">
              <input type="password" class="form-control" v-model="password" placeholder="Mot de passe">
              <div class="form-control-feedback">
                <i class="icon-lock2 text-muted"></i>
              </div>
            </div>

            <div class="form-group">
              <button type="submit" class="btn bg-success btn-block" :disabled="loading">
                <span v-if="loading">Authentification en cours...</span><span v-else>Connexion <i class="icon-arrow-right14 position-right"></i></span>
              </button>
            </div>

            <div class="row" v-if="error">
              <div class="col-lg-12">
                <div class="alert alert-styled-left bg-warning">
                  <button class="close" type="button" data-dismiss="alert">
                    <span>&times;</span>
                    <span class="sr-only">Fermer</span>
                  </button>
                  <p>{{error}}</p>
                </div>
              </div>
            </div>
          </div>
        </form>

      </div>

    </div>

  </div>
</template>

<style type="text/less" lang="less">
  @import "../less/_global/global.less";
  @import "../less/components/pages/login.less";
</style>

<script>
  import $ from 'jquery';

  export default {
    props: {
      title: {type: String, default: 'Administration'},
      error: {type: String, default: null},
      loading: {type: Boolean, default: false},
    },
    data() {
      return {
        username: '',
        password: '',
      };
    },
    mounted() {
      require('../vendor/app.js');
      $('.styled').uniform();
    },
  }
</script>
