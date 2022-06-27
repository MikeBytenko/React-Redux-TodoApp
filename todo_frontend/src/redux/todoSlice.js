import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getTodosAsync = createAsyncThunk(
	'todos/getTodosAsync',
	async () => {
		const resp = await fetch('http://localhost:5000/todos');
		if (resp.ok) {
			const todos = await resp.json();
			console.log(todos.data)
			return { todos: todos.data };
		}
	}
);

export const addTodoAsync = createAsyncThunk(
	'todos/addTodoAsync',
	async (payload) => {
		const resp = await fetch('http://localhost:5000/todos', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ note: payload.note }),
		});

		if (resp.ok) {
			const todo = await resp.json();
			return { todo };
		}
	}
);

export const toggleCompleteAsync = createAsyncThunk(
	'todos/completeTodoAsync',
	async (payload) => {
		const resp = await fetch(`http://localhost:5000/todos/checked/${payload.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ checked: payload.checked }),
		});

		if (resp.ok) {
			const todo = await resp.json();
			console.log(todo)
			return { todo };
		}
	}
);

export const updateTodoAsync = createAsyncThunk(
	'todos/updateTodoAsync',
	async (payload) => {
		console.log('1')
		const resp = await fetch(`http://localhost:5000/todos/${payload.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ note: payload.note }),
			
		});

		if (resp.ok) {
			const todo = await resp.json();
			console.log(todo)
			return { todo };
		}
	}
);

export const deleteTodoAsync = createAsyncThunk(
	'todos/deleteTodoAsync',
	async (payload) => {
		const resp = await fetch(`http://localhost:5000/todos/${payload.id}`, {
			method: 'DELETE',
		});

		if (resp.ok) {
			return { id: payload.id };
		}
	}
);

export const todoSlice = createSlice({
	name: 'todos',
	initialState: [],
	reducers: {
		addTodo: (state, action) => {
			const todo = {
				note: action.payload.note,
				completed: false,
			};
			state.push(todo);
		},
		toggleComplete: (state, action) => {
			const index = state.findIndex((todo) => todo.id === action.payload.id);
			state[index].checked = action.payload.checked;
		},
		updateTodo: (state, action) => {
			const index = state.findIndex((todo) => todo.id === action.payload.id);
			state[index].title = action.payload.title;
		},
		deleteTodo: (state, action) => {
			return state.filter((todo) => todo.id !== action.payload.id);
		},
	},
	extraReducers: {
		[getTodosAsync.fulfilled]: (state, action) => {
			return action.payload.todos;
		},
		[addTodoAsync.fulfilled]: (state, action) => {
			state.push(action.payload.todo);
		},
		[toggleCompleteAsync.fulfilled]: (state, action) => {
			const index = state.findIndex(
				(todo) => 
					
					 todo.id === action.payload.todo.id
				
			);
			console.log(index)
			state[index].checked = action.payload.todo.checked;
		},
		[updateTodoAsync.fulfilled]: (state, action) => {
			const index = state.findIndex(
				(todo) => todo.id === action.payload.todo.id
			);
			state[index].title = action.payload.todo.title;
		},
		[deleteTodoAsync.fulfilled]: (state, action) => {
			return state.filter((todo) => todo.id !== action.payload.id);
		},
	},
});

export const { addTodo, toggleComplete,updateTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
