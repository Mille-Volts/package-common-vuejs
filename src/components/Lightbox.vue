<template>
  <a class="cursor-pointer" :href="href" :title="title" ref="link" :data-fancybox="group">
    <slot></slot>
  </a>
</template>

<style type="text/css" lang="css">
  @import "../../node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.css";
</style>

<script>
  import $ from 'jquery';
  import "@fancyapps/fancybox";

  export default {
    props: {
      href: {type: String, required: true},
      title: String,
      group: String,
    },
    computed: {
      link() {
        return $(this.$refs.link);
      },
      type() {
        return this.href.toLowerCase().match(/\.(jpe?g|gif|png|webp)/) ? 'image' : 'iframe';
      },
      opts() {
        return {
          src: this.href,
          caption: this.title,
          toolbar: false,
          type: this.type,
        };
      },
    },
    mounted() {
      this.link.fancybox(this.opts)
    },
    beforeDestroy() {
      $.fancybox.close();
    },
  }
</script>
