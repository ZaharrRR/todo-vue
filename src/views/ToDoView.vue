<template>
  <div class="page-layout">
    <h1>ToDo</h1>

    <div class="task-add">
      <input
        type="text"
        @keypress.enter="AddTask(taskTitle)"
        v-model="taskTitle"
        placeholder="what to do..."
        class="input"
      />
      <button @click="AddTask(taskTitle)" class="btn">Add</button>
    </div>

    <div class="task-list">
      <div v-if="selectedTasks.length" class="all-task-actions">
        <button @click="CompleteSelectedTask()" class="btn">complete</button>
        <button @click="DeleteSelectedTask()" class="btn">delete</button>
      </div>

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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { ToDoTask } from '../domain/ToDo'

const taskTitle = ref('')

const tasks = ref<ToDoTask[]>([])
const selectedTasks = ref<ToDoTask[]>([])

function AddTask(title: string) {
  if (title) {
    tasks.value.push({
      id: tasks.value.length + 1,
      title: title,
      completed: false,
      editing: false
    })
  } else {
    alert('write something...')
  }
  taskTitle.value = ''
}

function DeleteTask(id: number) {
  tasks.value = tasks.value.filter((task) => task.id !== id)
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
    task.editing = false
  } else {
    alert('write something...')
  }
}

function CompleteTask(id: number) {
  tasks.value = tasks.value.map((task) => {
    if (task.id === id) {
      task.completed = !task.completed
    }
    return task
  })
}

function CompleteSelectedTask() {
  tasks.value = tasks.value.map((task) => {
    if (selectedTasks.value.includes(task)) {
      task.completed = true
    }
    return task
  })
  selectedTasks.value = []
}

function DeleteSelectedTask() {
  tasks.value.forEach((task) => {
    if (selectedTasks.value.includes(task)) {
      tasks.value = tasks.value.filter((t) => t.id !== task.id)
    }
  })
  selectedTasks.value = []
}
</script>

<style scoped>
.task-add {
  display: flex;
  gap: 12px;
  margin-bottom: 46px;
}

.task-add input {
  flex: 1;
  padding: 12px 24px;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.all-task-actions {
  display: flex;
  gap: 12px;
  justify-content: end;
}

.all-task-actions .btn {
  padding: 8px 16px;
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
}

.completed span {
  text-decoration: line-through;
}
</style>
