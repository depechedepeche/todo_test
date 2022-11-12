//useState가 계속 초기값 readTodosFromLocalStorage() 인식하는 것을 방지

import React, { useState } from 'react';
import { useEffect } from 'react';
import AddTodo from '../AddTodo/AddTodo';
import Todo from '../Todo/Todo';
import styles from './TodoList.module.css';

export default function TodoList({ filter }) {
  const [todos, setTodos] = useState(() => readTodosFromLocalStorage());
  /*  useState는 상태가 바뀔때마다 다시상태 인식-초기값을 읽음(물론 변한 상태를 인지해서 초기화 해주는건 아님) 
    -이걸 방지하기 위해 바로 전달하는게 아니라 콜백함수로 감싸줌*/

  const handleAdd = (todo) => setTodos([...todos, todo]);
  const handleUpdate = (updated) =>
    setTodos(todos.map((t) => (t.id === updated.id ? updated : t)));

  const handleDelete = (deleted) =>
    setTodos(todos.filter((t) => t.id !== deleted.id));

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const filtered = getFilteredItems(todos, filter);

  return (
    <section className={styles.container}>
      <ul className={styles.list}>
        {filtered.map((item) => (
          <Todo
            key={item.id}
            todo={item}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </ul>
      <AddTodo onAdd={handleAdd} />
    </section>
  );
}

function getFilteredItems(todos, filter) {
  if (filter === 'all') {
    return todos;
  }
  return todos.filter((todo) => todo.status === filter);
}

//localStorage에 저장된 todos를 가져와서 오브젝트형식으로 변환, 없으면 빈배열
function readTodosFromLocalStorage() {
  console.log('readTodos함수 호출'); //먼일 할때마다 함수 호출
  const todos = localStorage.getItem('todos');
  return todos ? JSON.parse(todos) : [];
}
