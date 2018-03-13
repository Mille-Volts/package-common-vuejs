<template>
  <div :class="className">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'column',
    props: {
      sm: [Number, String],
      md: [Number, String],
      lg: [Number, String],
      smPush: [Number, String],
      mdPush: [Number, String],
      lgPush: [Number, String],
      smPull: [Number, String],
      mdPull: [Number, String],
      lgPull: [Number, String],
    },
    computed: {
      className() {
        return [
            this.sm && `col-sm-${this.sm}`,
            this.md && `col-md-${this.md}`,
            this.lg && `col-lg-${this.lg}`,
            this.smPush && `col-sm-push-${this.smPush}`,
            this.mdPush && `col-md-push-${this.mdPush}`,
            this.lgPush && `col-lg-push-${this.lgPush}`,
            this.smPull && `col-sm-pull-${this.smPull}`,
            this.mdPull && `col-md-pull-${this.mdPull}`,
            this.lgPull && `col-lg-pull-${this.lgPull}`,
          ].filter(x => !!x).join(' ') || 'col-lg-12';
      },
    },
  }
</script>
