<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/todo">ToDo</RouterLink>
    </nav>
  </header>
</template>

<script setup lang="ts"></script>

<style scoped>
header {
  border-bottom: 1px solid gray;
  padding: 12px 24px;
}

nav {
  display: flex;
  gap: 12px;
}
</style>
