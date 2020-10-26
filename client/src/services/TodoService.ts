import HttpClient from "./http-client";
import Todo from "@/types/TodoType";

class TodoApi extends HttpClient {
  public constructor() {
    super("https://jsonplaceholder.typicode.com/");
  }

  public getTodos = () => this.instance.get<Todo[]>("/todos");

  public getTodo = (id: string) => this.instance.get<Todo>(`/todos/${id}`);
}

export default new TodoApi();
