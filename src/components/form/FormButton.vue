<template>
  <button :class="`btn ${kindClasses}`" :type="type" v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </button>
</template>
<script>
  export default {
    computed: {
      kindClasses() {
        switch (this.kind) {
          case 'submit':
            return 'btn-success pull-right ml-10';
          case 'delete':
            return 'btn-warning pull-right ml-10';
          case 'cancel':
            return 'btn-default pull-left mr-10';
          case 'default':
            return 'btn-default';
        }
        return `btn-${this.kind}`;
      }
    },
    props: {
      type: {type: String, default: 'button'},
      kind: {type: String, default: 'default'}, // default - submit - delete - cancel
    },
  };
</script>
