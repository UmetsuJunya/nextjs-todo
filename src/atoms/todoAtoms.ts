import { atom } from "jotai";

export interface Task {
  title: string;
  content: string;
  solved: boolean;
}
export const tasksAtom = atom<Task[]>([]);
