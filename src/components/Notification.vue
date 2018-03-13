<template>
  <div class="hidden" ref="content">
    <slot></slot>
  </div>
</template>

<style type="text/less" lang="less">
  @import "../less/_global/global.less";
  @import "../less/components/plugins/notifications/pnotify.less";
</style>

<script>
  export default {
    props: {
      className: String,
      type: {type: String, default: 'info'},
      title: String,
      icon: {type: String, default: null},
      keep: Boolean,
      options: {type: Object, default: () => ({})},
    },
    computed: {
      opts() {
        return {
          text: this.$refs.content.innerHTML.trim(),
          // icon: this.icon,
          hide: !this.keep,
          addclass: `alert alert-styled-left bg-${this.type} ${this.className}`,
          type: this.type,
          buttons: {
            closer: true,
            sticker: !this.keep,
          },
          ...(this.title ? {title: this.title} : {}),
          ...this.options
        };
      },
    },
    mounted() {
      const PNotify = require('pnotify');
      this._notice = new PNotify({
        after_open: () => {
          this.$emit('open', this);
        },
        after_close: () => {
          this.$emit('close', this);
        },
        ...this.opts,
      });
    },
    updated() {
      this._notice.update(this.opts);
    },
    destroyed() {
      if (this._notice) {
        this._notice.remove();
      }
    },
  }
</script>
