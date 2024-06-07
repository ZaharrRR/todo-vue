<template>
  <div class="task-list">
    <div
      v-for="task in tasks"
      :key="task.id"
      class="task"
      :class="task.completed ? 'completed' : ''"
    >
      <input v-model="selectedTasks" :value="task" :disabled="task.completed" type="checkbox" />
      <span v-if="!task.editing" @click="CompleteTask(task.id)">{{ task.title }}</span>

      <input
        v-else
        type="text"
        @keypress.enter="SaveTask(task)"
        v-model="task.title"
        placeholder="write title..."
        style="flex: 1"
        class="input"
      />

      <div class="task-buttons">
        <button @click="DeleteTask(task.id)" class="btn">Delete</button>
        <button
          v-if="!task.editing"
          :disabled="task.completed"
          @click="EditTask(task.id)"
          class="btn"
        >
          Edit
        </button>
        <button v-else @click="SaveTask(task)" class="btn">Save</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ToDoTask } from '@/domain/ToDo'

import { useToDoStore } from '@/stores/ToDoStore'
import { storeToRefs } from 'pinia'

const toDoStore = useToDoStore()
const { tasks, selectedTasks } = storeToRefs(toDoStore)

function DeleteTask(id: number) {
  toDoStore.deleteTask(id)
}

function EditTask(id: number) {
  tasks.value = tasks.value.map((task) => {
    if (task.id === id) {
      task.editing = true
    }
    return task
  })
}

function SaveTask(task: ToDoTask) {
  if (task.title) {
    toDoStore.saveTask(task)
  } else {
    alert('write something...')
  }
}

function CompleteTask(id: number) {
  if (id) {
    toDoStore.completeTask(id)
  } else {
    alert('something wrong...')
  }
}
</script>

<style scoped>
.task-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.task {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid gray;
  padding: 12px 24px;
}

.task span {
  flex: 1;
  margin: auto 0;
  cursor: pointer;
}

.task-buttons {
  display: flex;
  gap: 12px;
}

.completed {
  background-color: #646464;
  opacity: 0.5;
  border-radius: 50px;
}

.completed span {
  text-decoration: line-through;
}
</style>
