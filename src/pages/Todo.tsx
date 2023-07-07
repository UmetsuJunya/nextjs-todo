import Layout from "@/components/Layout";
import React, { useState } from "react";
import { useModal } from "react-hooks-use-modal";
import { TodoCreateModal, TodoEditModal } from "@/components/Modal";
import { tasksAtom } from "@/atoms/todoAtoms";
import { useAtom } from "jotai";
import Link from "next/link";

const Todo = () => {
  const [tasks, setTasks] = useAtom(tasksAtom);
  const [taskIndex, setTaskIndex] = useState<number>();
  const [Modal, open, close, isOpen] = useModal("__next", {
    preventScroll: true,
  });
  const [EditModal, editOpen, editClose, editIsOpen] = useModal("__next", {
    preventScroll: true,
  });
  const openModal = () => {
    open();
  };
  const openEditModal = (index: number) => {
    setTaskIndex(index);
    editOpen();
  };

  const deleteTask = (index: number) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks.splice(index, 1);
      return updatedTasks;
    });
  };

  const toggleTaskSolved = (index: number) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks[index].solved = !updatedTasks[index].solved;
      return updatedTasks;
    });
  };

  return (
    <Layout title="todo">
      <div>
        <button
          type="button"
          className="mt-3 px-4 py-2 text-sm font-semibold text-center text-white transition duration-200 ease-in bg-blue-500 rounded-lg shadow-md hover:bg-blue-800 focus:ring-blue-500 focus:ring-offset-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 "
          onClick={openModal}
        >
          <div className="flex justify-center">
            <svg
              width="20"
              height="20"
              fill="currentColor"
              className=""
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1344 1472q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm256 0q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm128-224v320q0 40-28 68t-68 28h-1472q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h427q21 56 70.5 92t110.5 36h256q61 0 110.5-36t70.5-92h427q40 0 68 28t28 68zm-325-648q-17 40-59 40h-256v448q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-448h-256q-42 0-59-40-17-39 14-69l448-448q18-19 45-19t45 19l448 448q31 30 14 69z"></path>
            </svg>
            <div className="mx-2">Add Task</div>
          </div>
        </button>
      </div>
      <div className="pt-4">
        {tasks.map((task, index) => (
          <div key={index} className="grid grid-cols-4 gap-4 py-2">
            <p className="">{task.title}</p>
            <p className="">
              {task.content || <span className="invisible">&nbsp;</span>}
            </p>
            <p className="" onClick={() => toggleTaskSolved(index)}>
              {task.solved ? (
                <div className="flex text-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 mr-3"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  Solved
                </div>
              ) : (
                <div className="flex text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 mr-3"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"
                    />
                  </svg>
                  Unsolved
                </div>
              )}
            </p>
            <div className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 mx-2"
                onClick={() => {
                  openEditModal(index);
                }}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 mx-2"
                onClick={() => deleteTask(index)}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
      <Modal>
        <TodoCreateModal open={open} close={close} />
      </Modal>
      <EditModal>
        <TodoEditModal open={editOpen} close={editClose} index={taskIndex} />
      </EditModal>
      <Link href="/">
        <div className="flex cursor-pointer mt-8">
          <svg
            className="w-6 h-6 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
          <span>Back to top page</span>
        </div>
      </Link>
    </Layout>
  );
};

export default Todo;
