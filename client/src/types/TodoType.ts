export default interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const emptyTodo: Todo = {
  userId: 0,
  id: 0,
  title: "",
  completed: false
};

export { emptyTodo };
