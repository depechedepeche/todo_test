import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './AddTodo.module.css';

export default function AddTodo({ onAdd }) {
  const [text, setText] = useState(''); //처음엔 빈 문자열로 시작
  const handleChange = (e) => setText(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault(); //페이지가 리프레시 되지 않도록

    if (text.trim().length === 0) {
      return;
    } //텍스트 빈 부분을 잘라줬을때 0과 같다면 추가 안됨(!text는 스페이스는 못 걸러냄)

    text.trim();
    onAdd({ id: uuidv4(), text, status: 'active' }); //고유 id값 부여->콘솔확인,Components확인
    setText(''); //입력후 인풋창 초기화
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="Add Todo"
        value={text}
        onChange={handleChange} //변경될때마다 handleChange호출
      />
      <button className={styles.button}>Add</button>
    </form>
  );
}
