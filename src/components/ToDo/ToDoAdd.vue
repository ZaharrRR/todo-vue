<template>
  <div class="task-add">
    <input
      type="text"
      @keypress.enter="AddTask(taskTitle)"
      v-model="taskTitle"
      placeholder="what to do..."
      class="input"
    />
    <button @click="AddTask(taskTitle)" class="btn">Add</button>

    <div v-if="selectedTasks.length" class="all-task-actions">
      <button @click="CompleteSelectedTask()" class="btn">complete</button>
      <button @click="DeleteSelectedTask()" class="btn">delete</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { useToDoStore } from '@/stores/ToDoStore'
import { storeToRefs } from 'pinia'

const toDoStore = useToDoStore()
const { tasks, selectedTasks } = storeToRefs(toDoStore)

const taskTitle = ref('')

function AddTask(title: string) {
  if (title) {
    const task = {
      id: tasks.value.length + 1,
      title: title,
      completed: false,
      editing: false
    }

    toDoStore.addTask(task)
  } else {
    alert('write something...')
  }
  taskTitle.value = ''
}

function CompleteSelectedTask() {
  if (selectedTasks.value) {
    toDoStore.completeTasks(selectedTasks.value)
  } else {
    alert('something wrong...')
  }
  selectedTasks.value = []
}

function DeleteSelectedTask() {
  if (selectedTasks.value) {
    toDoStore.deleteTasks(selectedTasks.value)
  } else {
    alert('something wrong...')
  }
  selectedTasks.value = []
}
</script>

<style scoped>
.task-add {
  display: flex;
  gap: 16px;
  margin-bottom: 46px;
}

.task-add input {
  flex: 1;
  padding: 12px 24px;
}

.all-task-actions {
  display: flex;
  gap: 8px;
}

.all-task-actions .btn {
  padding: 8px 16px;
}
</style>
