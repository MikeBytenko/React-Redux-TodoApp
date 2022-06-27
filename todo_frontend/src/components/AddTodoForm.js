import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodoAsync } from '../redux/todoSlice';
import {Button, Grid, TextField } from '@mui/material'

const AddTodoForm = () => {
	const [value, setValue] = useState('');
	const dispatch = useDispatch();

	const onSubmit = (event) => {
		event.preventDefault();
		if (value) {
			dispatch(
				addTodoAsync({
					note: value,
				})
			);
		}
		setValue('')
	};

	return (
		<form onSubmit={onSubmit}>
			<Grid container spacing={2}>
				<Grid item>
			<TextField
				type='text'
				multiline
				maxRows={5}
				inputProps={{ maxLength: 255 }}
				placeholder='Add todo...'
				value={value}
				size="small"
				onChange={(event) => setValue(event.target.value)}
			></TextField>
			</Grid>
			<Grid item>
			<Button type='submit' variant="contained" >
				Add
			</Button>
			</Grid>
			</Grid>
		</form>
	);
};

export default AddTodoForm;
