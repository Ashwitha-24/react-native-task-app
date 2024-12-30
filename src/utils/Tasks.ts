
export interface Task {
  id: string;
  name: string;
  description: string;
  date: string;
  images: string[];
  videos: string[];
}
export const tasks = [

]

export const saveTask = (task: Task) => {
  tasks.push(task);
  console.log('New Task Added:', task);
};