<template>
  <div class="home">
    <h1>This is A Home page</h1>
    <h1>{{ todo.title }}</h1>
  </div>
</template>

<script lang="ts">
import TodoService from "@/services/TodoService";
import Todo, { emptyTodo } from "@/types/TodoType";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class Home extends Vue {
  private todo: Todo = emptyTodo;

  async initTodo() {
    this.todo = (await TodoService.getTodo("1")).data;
  }

  created() {
    this.initTodo();
  }
}
</script>
