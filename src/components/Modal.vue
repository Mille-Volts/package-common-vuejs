<template>
  <div ref="modal" class="modal">
    <slot name="modal">
      <div class="modal-dialog" :class="`modal-${size}`">
        <div class="modal-content">
          <slot name="modal-content">
            <div class="modal-header">
              <slot name="header">
                <button type="button" class="close" @click.prevent="close">&times;</button>
                <h5 v-if="title" class="modal-title">{{title}}</h5>
              </slot>
            </div>
            <div class="modal-body">
              <slot></slot>
            </div>
            <div class="modal-footer">
              <slot name="footer"></slot>
            </div>
          </slot>
        </div>
      </div>
    </slot>
  </div>
</template>

<style type="text/css" lang="css">
  .modal .modal-content .modal-header {
    position: relative;
    z-index: 2;
  }

  .modal .modal-content .modal-body {
    position: relative;
    z-index: 1;
  }
</style>

<script>
  import $ from 'jquery';
  import "bootstrap";

  export default {
    props: {
      size: {type: String, default: 'md'},
      title: String,
    },
    computed: {
      modal() {
        return $(this.$refs.modal);
      },
      opts() {
        return {};
      },
    },
    mounted() {
      this.modal.modal(this.opts);
      this.modal.on('shown.bs.modal', () => this.$emit('open'));
      this.modal.on('hidden.bs.modal', () => this.$emit('close'));
    },
    beforeDestroy() {
      if (this.modal) this.modal.modal('hide');
    },
    methods: {
      close() {
        this.modal.modal('hide');
      },
    }
  }
</script>
