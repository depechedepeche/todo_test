import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import styles from './Todo.module.css';

export default function Todo({ todo, onUpdate, onDelete }) {
  const { id, text, status } = todo; //todo넘 많이 쓰게 되어서 todo에서 할당
  const handleChange = (e) => {
    //받아온게 아님 이 컴포넌트 내부에서만
    const status = e.target.checked ? 'completed' : 'active';
    onUpdate({ ...todo, status }); //브라우저 Conponents에서 status변하는거 확인
  };
  const handleDelete = () => onDelete(todo); //TodoList.jsx에서 정의한거 바로실행

  return (
    <li className={styles.todo}>
      <input
        className={styles.checkbox}
        type="checkbox"
        id={id}
        checked={status === 'completed'}
        onChange={handleChange}
      />
      <label className={styles.text} htmlFor={id}>
        {text}
      </label>
      <span className={styles.icon}>
        <button onClick={handleDelete} className={styles.button}>
          <FaTrashAlt />
        </button>
      </span>
    </li>
  );
}

//React icon이용 https://react-icons.github.io/react-icons/
// $ yarn add react-icons    -설치 후 앱 다시 재시작

// checked={todo.status === 'completed'} todo상태가 completed인지 아닌지에 따라 판단
//-> todo가 너무 많아
