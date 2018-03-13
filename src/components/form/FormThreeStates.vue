<template>
  <div class="btn-group">
    <slot></slot>
    <button type="button" class="btn" :class="noClasses" v-text="noLabel" @click.prevent="toggleNo"></button>
    <button type="button" class="btn" :class="yesClasses" v-text="yesLabel" @click.prevent="toggleYes"></button>
  </div>
</template>
<script>
  export default {
    props: {
      value: {type: Boolean, default: null},
      disabled: Boolean,
      yesLabel: {type: String, default: 'Yes'},
      noLabel: {type: String, default: 'No'},
    },
    computed: {
      model: {
        get() {
          return this.value;
        },
        set(val) {
          this.$emit('input', val);
          this.$emit('change', val);
        },
      },
      yesClasses() {
        return (this.model === true? 'btn-primary active': 'btn-default') + (this.disabled? ' disabled': '');
      },
      noClasses() {
        return this.model === false? 'btn-primary active': 'btn-default' + (this.disabled? ' disabled': '');;
      },
    },
    methods: {
      toggleYes() {
        this.model = this.model === true? null: true;
      },
      toggleNo() {
        this.model = this.model === false? null: false;
      },
    }
  };
</script>
