<template>
  <ul class="breadcrumb heading-text">
    <li v-for="(route, index) in parentRoutes" :key="route.path">
      <router-link :to="route.path || '/'">
        <i v-if="!index" class="icon-home2 position-left"></i>
        {{getName(route)}}
      </router-link>
    </li>
    <li class="active">{{getName(activeRoute)}}</li>
  </ul>
</template>

<script>
  export default {
    name: 'breadcrumb',
    props: {
      routes: {type: Array, required: true},
    },
    computed: {
      parentRoutes() {
        return this.routes.slice(0, this.routes.length - 1);
      },
      activeRoute() {
        return this.routes[this.routes.length - 1];
      },
    },
    methods: {
      getName({name, meta}) {
        return (meta && (meta.breadcrumb || meta.menu || meta.title)) || name;
      },
    },
  }
</script>
