export interface Task {
	task: string;
	state: 'static' | 'editing' | 'delete';
}

export interface TaskList {
	name: string;
	tasks: Task[];
	state: 'static' | 'rename' | 'delete'
}