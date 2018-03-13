<template>
  <textarea class="form-control" :value="value" @input="onInput" @change="onChange" v-bind="$attrs"/>
</template>

<style type="text/css" lang="css" scoped>
  textarea {
    resize: vertical;
  }
</style>

<script>
  export default {
    props: ['value'],
    methods: {
      onInput($evt) {
        this.$emit('input', $evt.target.value);
      },
      onChange($evt) {
        this.$emit('change', $evt.target.value);
      },
    },
  };
</script>
