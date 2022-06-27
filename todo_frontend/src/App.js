import React from 'react';
import { ThemeProvider } from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
import TotalCompleteItems from './components/TotalCompleteItems';
import theme from './styles/theme';

const App = () => {
	return (
		<ThemeProvider theme={theme}>
		<div className='container bg-white p-4 mt-5'>
			<h1>My Todo List</h1>
			<AddTodoForm />
			<TodoList />
			<TotalCompleteItems />
		</div>
		</ThemeProvider>
	);
};

export default App;
