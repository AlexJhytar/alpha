'use client';
import React from 'react';
import './toDoList.scss';

const ToDoList = () => {
		let idTask = 0;
		let tasks = [];
		JSON.stringify()
		const addTask = () => {
				let input = document.querySelector('#todo-input');
				
				if (input.value.trim()) {
						tasks.push({text: input.value, isCompleted: false, isEditing: false, id: idTask});
						input.value = '';
						idTask++;
						renderTasksList();
				}
		};
		
		const deleteTask = ( id ) => {			
			tasks = tasks.filter(task => task.id !== id);
    		renderTasksList(); 
		};
		
		const tasksList = () => {
				const toDoList = document.querySelector('.todolist__list');
				toDoList.innerHTML = '';
				tasks.forEach((task, index) => {
						const taskElement = document.createElement('div');
						taskElement.className = 'todolist__list-item';
						taskElement.innerHTML = `
        <label class="custom-checkbox">
          <input type="checkbox"/>
          <span></span>
        </label>
        <input class="todolist__list-item-text" type="text" readOnly value="${task.text}"></input>
        <button class="todolist__list-item-edit"></button>
        <button class="todolist__list-item-delete">
           Delete
        </button>
      `;

						taskElement.querySelector('.todolist__list-item-delete').addEventListener('click', () => {
							deleteTask(task.id);
						});
						toDoList.appendChild(taskElement);
				});
		};
		
		const renderTasksList = () => {
				tasksList();
		};
		
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



