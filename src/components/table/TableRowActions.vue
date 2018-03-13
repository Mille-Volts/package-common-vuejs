<template>
  <ul class="icons-list">
    <li class="dropdown">
      <a class="dropdown-toggle cursor-pointer" data-toggle="dropdown">
        <i class="icon-menu9"></i>
      </a>
      <ul class="dropdown-menu dropdown-menu-right">
        <slot></slot>
      </ul>
    </li>
  </ul>
</template>

<script>
  export default {
  }
</script>
