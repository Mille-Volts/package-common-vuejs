<template>
  <div class="row">
    <div class="col-md-4"><slot name="left"></slot></div>
    <div class="col-md-8">
      <div class="text-right">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
  export default {};
</script>
