import type { ToDoTask } from '@/domain/ToDo'
import { defineStore } from 'pinia'

type State = {
  tasks: ToDoTask[]
  selectedTasks: ToDoTask[]
}

export const useToDoStore = defineStore('toDoStore', {
  state: (): State => ({
    tasks: [],
    selectedTasks: []
  }),
  getters: {},
  actions: {
    async addTask(task: ToDoTask) {
      if (task) {
        this.tasks.push(task)
      }
    },

    async deleteTask(id: number) {
      this.tasks = this.tasks.filter((task) => task.id !== id)
    },

    async saveTask(task: ToDoTask) {
      const currentTask = this.tasks.find((t) => task.id === t.id)

      if (currentTask) {
        currentTask.title = task.title
        currentTask.editing = false
      }
    },

    async completeTask(id: number) {
      const currentTask = this.tasks.find((t) => t.id === id)

      if (currentTask) {
        currentTask.completed = !currentTask.completed
      }
    },

    async completeTasks(array: ToDoTask[]) {
      this.tasks = this.tasks.map((task) => {
        if (array.includes(task)) {
          task.completed = true
        }
        return task
      })
    },

    async deleteTasks(array: ToDoTask[]) {
      this.tasks.forEach((task) => {
        if (array.includes(task)) {
          this.tasks = this.tasks.filter((t) => t.id !== task.id)
        }
      })
    }
  }
})
