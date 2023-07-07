import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Task, tasksAtom } from "@/atoms/todoAtoms";
import { useAtom, useSetAtom } from "jotai";

interface Props {
  open: () => void;
  close: () => void;
  index?: number;
}
const modalStyle: React.CSSProperties = {
  backgroundColor: "#fff",
  padding: "30px 20px",
  borderRadius: "10px",
};
export const TodoCreateModal = ({ open, close }: Props) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskContent, setTaskContent] = useState("");
  const setTasks = useSetAtom(tasksAtom);

  const addTask = () => {
    const newTask: Task = {
      title: taskTitle,
      content: taskContent,
      solved: false,
    };

    setTasks((tasks) => [...tasks, newTask]);
  };

  return (
    <div style={modalStyle}>
      <div className="text-xl">create task</div>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        {/* <TextField id='outlined-basic' label='Outlined' variant='outlined' />
            <TextField id='filled-basic' label='Filled' variant='filled' /> */}
        <TextField
          id="setTaskTitle"
          label="title"
          variant="filled"
          onChange={(e) => setTaskTitle(e.target.value)}
        />
      </Box>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        {/* <TextField id='outlined-basic' label='Outlined' variant='outlined' />
            <TextField id='filled-basic' label='Filled' variant='filled' /> */}
        <TextField
          id="setTaskContent"
          label="description"
          variant="filled"
          multiline
          rows={4}
          maxRows={6}
          onChange={(e) => setTaskContent(e.target.value)}
        />
      </Box>
      <div className="flex mt-4">
        <button
          type="button"
          className={`mx-1 py-2 px-4 flex justify-center items-center ${
            !taskTitle ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          } focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg `}
          onClick={() => {
            addTask();
            close();
          }}
          disabled={!taskTitle}
        >
          <svg
            width="20"
            height="20"
            fill="currentColor"
            className="mr-3"
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1344 1472q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm256 0q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm128-224v320q0 40-28 68t-68 28h-1472q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h427q21 56 70.5 92t110.5 36h256q61 0 110.5-36t70.5-92h427q40 0 68 28t28 68zm-325-648q-17 40-59 40h-256v448q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-448h-256q-42 0-59-40-17-39 14-69l448-448q18-19 45-19t45 19l448 448q31 30 14 69z"></path>
          </svg>
          create
        </button>
        <button
          type="button"
          className="mx-1 py-2 px-4 bg-white-600 hover:bg-white-700 focus:ring-white-500 focus:ring-offset-white-200 border-2 border-slate-400 text-black transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
          onClick={close}
        >
          close
        </button>
      </div>
    </div>
  );
};

export const TodoEditModal = ({ open, close, index }: Props) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskContent, setTaskContent] = useState("");
  const [tasks, setTasks] = useAtom(tasksAtom);

  const addTask = () => {
    const newTask: Task = {
      title: taskTitle,
      content: taskContent,
      solved: false,
    };

    setTasks((tasks) => [...tasks, newTask]);
  };

  useEffect(() => {
    setTaskTitle(tasks[index!].title);
    setTaskContent(tasks[index!].content);
  }, []);

  return (
    <div style={modalStyle}>
      <div className="text-xl">edit task</div>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        {/* <TextField id='outlined-basic' label='Outlined' variant='outlined' />
              <TextField id='filled-basic' label='Filled' variant='filled' /> */}
        <TextField
          id="setTaskTitle"
          label="title"
          variant="filled"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
      </Box>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        {/* <TextField id='outlined-basic' label='Outlined' variant='outlined' />
              <TextField id='filled-basic' label='Filled' variant='filled' /> */}
        <TextField
          id="setTaskContent"
          label="description"
          variant="outlined"
          value={taskContent}
          multiline
          rows={4}
          maxRows={6}
          onChange={(e) => setTaskContent(e.target.value)}
        />
      </Box>
      <div className="flex mt-4">
        <button
          type="button"
          className={`mx-1 py-2 px-4 flex justify-center items-center ${
            !taskTitle ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          } focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg `}
          onClick={() => {
            addTask();
            close();
          }}
          disabled={!taskTitle}
        >
          <svg
            width="20"
            height="20"
            fill="currentColor"
            className="mr-3"
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1344 1472q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm256 0q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm128-224v320q0 40-28 68t-68 28h-1472q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h427q21 56 70.5 92t110.5 36h256q61 0 110.5-36t70.5-92h427q40 0 68 28t28 68zm-325-648q-17 40-59 40h-256v448q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-448h-256q-42 0-59-40-17-39 14-69l448-448q18-19 45-19t45 19l448 448q31 30 14 69z"></path>
          </svg>
          edit
        </button>
        <button
          type="button"
          className="mx-1 py-2 px-4 bg-white-600 hover:bg-white-700 focus:ring-white-500 focus:ring-offset-white-200 border-2 border-slate-400 text-black transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
          onClick={close}
        >
          close
        </button>
      </div>
    </div>
  );
};
