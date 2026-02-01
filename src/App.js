import { useState } from "react";

// const initialList = [
//   {
//     name: "Gym",
//     description: "Go to gym at 2 p.m and do some chest exercises",
//     id: 1,
//   },

//   {
//     name: "English Class",
//     description: "Attend English class at 6 p.m and learn new grammar",
//     id: 2,
//   },

//   {
//     name: "Prepare presentation",
//     description:
//       "Prepare presentation about climate change to present the next at IBM conference",
//     id: 3,
//   },
//   {
//     name: "Do the chores",
//     description:
//       "Do the laundry, clean your room, arrange all of your items and get your cloths ready for tommarrow",
//     id: 4,
//   },
// ];

function App() {
  const [tasks, setTasks] = useState([]);

  function handleAddTask(task) {
    setTasks((tasks) => [...tasks, task]);
  }

  function handleDeleteTask(task) {
    setTasks((tasks) =>
      // eslint-disable-next-line array-callback-return
      tasks.filter((cur) => {
        if (cur.id !== task.id) return cur;
      }),
    );
  }

  return (
    <div className="app">
      <Title />
      <AddTask onAdd={handleAddTask} />
      <List tasks={tasks} onDelete={handleDeleteTask} />
    </div>
  );
}

function Title() {
  return (
    <>
      <h1>To-Do-List 📃</h1>
    </>
  );
}

function AddTask({ onAdd }) {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const id = crypto.randomUUID();
    const task = {
      id,
      taskName,
      taskDescription,
    };
    onAdd(task);
    setTaskName("");
    setTaskDescription("");
  }

  return (
    <>
      <form className="form-add-task" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add your task name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Add your task description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <Button>Add</Button>
      </form>
    </>
  );
}

function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>;
}

function List({ tasks, onDelete }) {
  return (
    <ul className="list">
      {tasks.map((task) => {
        return <Task task={task} key={task.id} onDelete={onDelete} />;
      })}
    </ul>
  );
}

function Task({ task, onDelete }) {
  const [checked, setChecked] = useState(false);

  function handleDelete(e) {
    e.preventDefault();
    onDelete(task);
  }

  return (
    <li className={checked ? "checked task" : "task"}>
      <h3>{task.taskName}</h3>
      <div className="task-info">
        <input
          type="checkbox"
          value={checked}
          onChange={() => {
            setChecked((checked) => !checked);
          }}
        />
        <p>{task.taskDescription}</p>
      </div>
      <Button onClick={handleDelete}>❌</Button>
    </li>
  );
}

export default App;
