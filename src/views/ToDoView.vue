<template>
  <div class="page-layout">
    <h1>ToDo</h1>

    <ToDoAdd />
    <ToDoList />
  </div>
</template>

<script setup lang="ts">
import ToDoAdd from '@/components/ToDo/ToDoAdd.vue'
import ToDoList from '@/components/ToDo/ToDoList.vue'
</script>
