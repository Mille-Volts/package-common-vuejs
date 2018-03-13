<template>
  <div class="panel" :class="light? 'panel-default': (flat? 'panel-flat': (bg? `bg-${bg}`: ''))">
    <div class="panel-heading" :class="light || flat? '': bgHeading" v-if="$slots.heading || title">
      <slot name="heading">
        <h5 class="panel-title">{{title}}</h5>
      </slot>
    </div>

    <div class="panel-body" v-if="$slots.body">
      <slot name="body"></slot>
    </div>

    <div class="panel-body" v-if="!$slots.body && !$slots.content">
      <slot></slot>
    </div>

    <slot name="content"></slot>

    <div class="panel-footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'panel',
    props: {
      title: String,
      bg: String,
      bgHeading: {type: String, default: 'bg-slate-800'},
      light: Boolean,
      flat: Boolean,
    },
  }
</script>
