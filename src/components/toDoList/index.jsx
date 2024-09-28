'use client';
import React, { useEffect } from 'react';
import './toDoList.scss';

const ToDoList = () => {
		let idTask = 0;
		let tasks = [];
		
		const saveTasksLoc = () => {
				localStorage.setItem('tasks', JSON.stringify(tasks));
		};
		
		const loadTasks = () => {
				const savedTasks = localStorage.getItem('tasks');
				if (savedTasks) {
						tasks = JSON.parse(savedTasks);
						idTask = tasks.length ? Math.max(...tasks.map(task => task.id)) + 1 : 0;
						tasks = tasks.map(task => ({ ...task, isEditing: false }));
				}
		};
		
		const addTask = () => {
				let input = document.querySelector('#todo-input');
				
				if (input.value.trim()) {
						tasks.push({text: input.value, isCompleted: false, isEditing: false, id: idTask});
						input.value = '';
						idTask++;
						renderTasksList();
						saveTasksLoc();
						
				}
		};
		
		const deleteTask = ( id ) => {
				tasks = tasks.filter(task => task.id !== id);
				renderTasksList();
				saveTasksLoc();
		};
		
		const completedTask = (id) => {
				tasks = tasks.map(task => task.id == id ? {...task, isCompleted: !task.isCompleted} : task);
				renderTasksList();
				saveTasksLoc();
		};

		const editTask = (id, newText) => {
			tasks = tasks.map(task => task.id === id ? { ...task, text: newText, isEditing: false } : task);
			renderTasksList();
			saveTasksLoc();
		};
		  
		const toggleEditing = (id) => {
			tasks = tasks.map(task => task.id === id ? { ...task, isEditing: !task.isEditing } : task);
			renderTasksList();
			saveTasksLoc();
		};
		
		
		const tasksList = () => {
				const toDoList = document.querySelector('.todolist__list');
				toDoList.innerHTML = '';
				tasks.forEach((task, index) => {
						const taskElement = document.createElement('div');
						taskElement.className = 'todolist__list-item';
						if (task.isEditing) {
							taskElement.classList.add('editing');
						  }
						taskElement.innerHTML = `
							<label class="custom-checkbox" title="Status">
								<input type="checkbox" ${task.isCompleted ? 'checked' : ''}/>
								<span></span>
							</label>
							<input class="todolist__list-item-text" type="text" ${task.isEditing ? "" : "readonly"} value="${task.text}"></input>
							<button class="todolist__list-item-edit" title="${task.isEditing ? 'Save' : 'Edit'}"></button>
							<button class="todolist__list-item-delete" title="Delete"></button>
						`;
						
						taskElement.querySelector('.todolist__list-item-delete').addEventListener('click', () => {
								deleteTask(task.id);
						});
						
						taskElement.querySelector('input[type="checkbox"]').addEventListener('change', () => {
								completedTask(task.id);
						});

						taskElement.querySelector('.todolist__list-item-edit').addEventListener('click', () => {
							if (task.isEditing) {
							    const newText = taskElement.querySelector('.todolist__list-item-text').value;
							    editTask(task.id, newText); 
							} else {
							    toggleEditing(task.id);
							}
						});
						
						toDoList.appendChild(taskElement);
				});
		};
		
		const renderTasksList = () => {
				tasksList();
		};
		
		useEffect(() => {
				loadTasks();
				renderTasksList();
		}, [])
		
		return (
				<div className="container">
						<div className="todolist">
								<h2 className='todolist__title'>To Do List</h2>
								<div className="todolist__add">
										<input
												type="text"
												placeholder="Add new task"
												id="todo-input"
										/>
										<button
												className='todolist__add-btn button button-default button-green'
												onClick={addTask}>
												<span>Add +</span>
										</button>
								</div>
								
								<div className="todolist__list"></div>
						</div>
				</div>
		);
};

export default ToDoList;



