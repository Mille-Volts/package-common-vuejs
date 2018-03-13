<template>
  <input :type="type" class="form-control" :value="value" @input="onInput" @change="onChange" v-bind="$attrs"/>
</template>
<script>
  export default {
    props: ['type', 'value'],
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
