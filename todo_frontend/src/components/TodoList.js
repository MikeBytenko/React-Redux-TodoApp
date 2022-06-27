import React, { useEffect } from 'react';
import TodoItem from './TodoItem';
import { useSelector, useDispatch } from 'react-redux';
import { getTodosAsync } from '../redux/todoSlice';
import { List } from '@mui/material';

const TodoList = () => {
	const dispatch = useDispatch();
	const todos = useSelector((state) => state.todos);

	useEffect(() => {
		dispatch(getTodosAsync());
	}, [dispatch]);

	return (
		<List >
			{todos && todos.map((todo) => (
				<TodoItem key={todo._id} id={todo._id} note={todo.note} checked={todo.checked} />
			))}
		</List>
	);
};

export default TodoList;
