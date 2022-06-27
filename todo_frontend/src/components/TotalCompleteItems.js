import { Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

const TotalCompleteItems = () => {
	const todos = useSelector((state) =>
		state.todos.filter((todo) => todo.checked === true)
	);

	return <Typography variant='h5' className='mt-3'>Total completed items: {todos.length}</Typography>;
};

export default TotalCompleteItems;
