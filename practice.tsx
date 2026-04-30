type Task = {
  id: number;
  text: string;
  done: boolean;
};

const tasks: Task[] = [
  { id: 1, text: "Reactを勉強する", done: false },
  { id: 2, text: "Supabaseを接続する", done: true },
  { id: 3, text: "AI機能を追加する", done: false },
];

function addTask(text: string) {
  const newTask = {
    id: tasks.length + 1,
    text: text,
    done: false,
  };

  tasks.push(newTask);
}

function toggleTask(id: number) {
  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return;
  }

  task.done = !task.done;
}

function deleteTask(id: number) {
  const filteredTasks = tasks.filter((task) => task.id !== id);

  return filteredTasks;
}

function printTasks() {
  tasks.forEach((task) => {
    console.log(task.text);
  });
}
