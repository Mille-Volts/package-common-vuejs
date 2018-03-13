<template>
  <fieldset class="content-group">
    <div class="row">
      <div class="col-md-4">
        <h3 class="" v-if="title">{{title}} <i class="icon-arrow-right8 position-right visible-md-inline-block visible-lg-inline-block"></i></h3>
        <slot name="description"></slot>
      </div>
      <div class="col-md-8">
        <div class="panel form-fieldset-panel">
          <div class="panel-body form-fieldset-panel-body">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </fieldset>
</template>

<style type="text/less" lang="less">
  @import "../../less/colors.less";

  .panel {
    .form-fieldset-panel {
      border: 0;
      border-radius: 0;
      border-bottom: 1px solid @gray-lighter;
      box-shadow: none;
      .form-fieldset-panel-body {
        padding-left: 0;
        padding-right: 0;
      }
    }
  }
</style>

<script>
  export default {
    props: {
      title: String,
    },
  }
</script>
