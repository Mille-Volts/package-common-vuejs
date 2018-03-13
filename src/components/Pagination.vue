<template>
  <div class="heading-elements">
      <span class="heading-text text-semibold">Résultats {{Math.min(totalInt, 1 + page * perPage)}}
						à {{Math.min(totalInt >= 0? totalInt: Infinity, (page + 1) * perPage)}}
						<span v-show="!(totalInt < 0)">sur {{totalInt}}</span></span>
    <ul class="pager pager-xs pull-right">
      <li :class="{disabled: !hasPreviousPage()}">
        <a @click="previousPage" :disabled="!hasPreviousPage()">&larr; Précédent</a>
      </li>
      <li :class="{disabled: !hasNextPage()}">
        <a @click="nextPage" :disabled="!hasNextPage()">Suivant &rarr;</a>
      </li>
    </ul>
    <form v-if="!fixedLimit" class="heading-form pull-right hidden-xs">
      <div class="form-group">
        <select class="form-control input-xs" style="width:10em" v-model="perPage" @change="changedPerPage">
          <option v-for="value in limits" :key="value" :value="value">{{value}} par page</option>
        </select>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        offset: {type: Number, default: 0},
        limit: {type: Number, default: (this.limits || [10])[0]},
      },
      total: {type: [String, Number], default: -1},
      limits: {type: Array, default: function () {
        const base = [10, 25, 50, 100];
        if (this.value && this.value.limit && base.indexOf(this.value.limit) === -1) {
          return [...base, this.value.limit].sort();
        }
        return base;
      }},
      fixedLimit: Boolean, // Pas de changement possible de la limite
    },
    data() {
      return {
        page: Math.floor(this.value.offset / this.value.limit) || 0,
        perPage: this.value.limit || 10,
      }
    },
    computed: {
      totalInt() {
        return Number(this.total);
      },
      totalPages() {
        return this.totalInt >= 0 ? (Math.ceil(this.totalInt / this.perPage) - 1) : Infinity;
      },
    },
    updated() {
      this.perPage = this.value.limit || 10;
      this.page = Math.floor(this.value.offset / this.value.limit) || 0;
    },
    methods: {
      onChange() {
        this.$emit('input', {
          offset: this.page * this.perPage,
          limit: this.perPage,
        });
        this.$emit('change', {
          offset: this.page * this.perPage,
          limit: this.perPage,
        });
      },
      hasPreviousPage() {
        return this.page > 0;
      },
      hasNextPage() {
        return this.totalInt >= 0 && this.page < this.totalPages;
      },
      previousPage() {
        this.page = Math.min(this.totalPages, Math.max(0, this.page - 1));
        this.onChange();
      },
      nextPage() {
        this.page = Math.min(this.totalPages, Math.max(0, this.page + 1));
        this.onChange();
      },
      changedPerPage() {
        this.page = 0;
        this.onChange();
      },
    }
  }
</script>
