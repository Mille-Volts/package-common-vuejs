<template>
  <input type="url" class="form-control" :value="value" @input="onInput" @change="onChange" v-bind="$attrs"/>
</template>
<script>
  export default {
    props: {
      value: String,
    },
    methods: {
      getCleanUrl(url) {
        const prefix = 'http';
        const length = Math.min(('' + url).length, prefix.length);
        return (!url || url.substr(0, length) === prefix.substr(0, length)) ? url : `http://${url}`;
      },
      onInput($evt) {
        this.$emit('input', this.getCleanUrl($evt.target.value));
      },
      onChange($evt) {
        this.$emit('change', this.getCleanUrl($evt.target.value));
      },
    },
  };
</script>
