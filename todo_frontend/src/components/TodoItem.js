import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import {Button, typography, Grid, TextField, List, Checkbox} from '@mui/material'
import { toggleCompleteAsync, deleteTodoAsync , updateTodoAsync} from '../redux/todoSlice';
import { useStyles } from './components.styles';

const TodoItem = ({ id, note, checked }) => {
	const dispatch = useDispatch();
	const [changedTodo, setChangedTodo] = useState(note);
	const [title, setTitle] = useState(note)
	const [isEdit, setIsEdit] = useState('0')
	const classes = useStyles()
	
	
	const handleCheckboxClick = () => {
		dispatch(toggleCompleteAsync({ id, checked: !checked }));
	};

	const onUpdate = (event) => {

		event.preventDefault();
			dispatch(
				updateTodoAsync({
					id,
					note: changedTodo,
				})
			);
		setTitle(changedTodo)
		setChangedTodo(changedTodo)
		setIsEdit('0')
	};

	const handleDeleteClick = () => {
		dispatch(deleteTodoAsync({ id }));
	};
	
	if(isEdit === '1'){
	return ( 
		<form onSubmit={onUpdate}   className={classes.editForm} >
			<Grid container spacing={2}>
				<Grid item>
			<TextField
				type='text'
				size = 'small'
				multiline
				maxRows={5}
				inputProps={{ maxLength: 255 }}
				placeholder='Add todo...'
				value={changedTodo}
				onChange={(event) => setChangedTodo(event.target.value)}
			></TextField>
			</Grid>
			<Grid item >
			<Button type='edit' variant='contained'  >
				Edit
			</Button>
			</Grid>
			</Grid>
		</form>
		)	}
	return (		
	<List className={`list-group-item ${checked && 'list-group-item-success'}`}>
	<Grid container justifyContent='space-between'>
		<Grid className='d-flex align-items-center'>
			<Checkbox
				checked={checked}
				onClick={handleCheckboxClick}
			></Checkbox>
			{title}
		</Grid>
		<Button onClick={handleDeleteClick} variant='contained' color="secondary">
			Delete
		</Button>
		<Button onClick={() => setIsEdit('1')}  variant='contained' >
			Update
		</Button>
	</Grid>
</List>)
}


export default TodoItem;
