<template>
  <div>
    <input class="form-control" type="range" v-model="model" :min="minInt" :max="maxInt" :step="stepInt" :disabled="disabled" :required="required" />
    <div slot="help">
      <span class="pull-right text-muted">Position : {{model}}</span>
      <span v-if="model === maxInt" class="text-muted"><slot name="max">En dernier</slot></span>
      <span v-else-if="model === minInt" class="text-orange text-semibold"><slot name="min">En premier</slot></span>
      <span v-else-if="model >= maxInt - (maxInt - minInt) / 3" class="text-slate"><slot name="near-max">Vers la fin</slot></span>
      <span v-else-if="model <= minInt + (maxInt - minInt) / 3" class="text-green-700 text-semibold"><slot name="near-min">Vers le début</slot></span>
      <span v-else class="text-blue-600"><slot name="middle">Vers le milieu</slot></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: [Number, String],
    min: { type: [Number, String], default: 0 },
    max: { type: [Number, String], default: 100 },
    step: { type: [Number, String], default: 1 },
    disabled: Boolean,
    required: Boolean
  },
  computed: {
    minInt() {
      return parseInt(this.min, 10);
    },
    maxInt() {
      return parseInt(this.max, 10);
    },
    stepInt() {
      return parseInt(this.step, 10);
    },
    model: {
      get() {
        return parseInt(this.value, 10) || 0;
      },
      set(value) {
        const order = parseInt(value, 10) || 0;
        this.$emit("input", order);
        this.$emit("change", order);
      }
    }
  }
};
</script>
