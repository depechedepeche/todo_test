//다크모드로 변환 토글링 버튼 만들어 줘야 함
//버튼 추가(아이콘표시 )
//onClick하면 toggleDarkMode바로 발생  -> 컨텍스트로 갈것

import React from 'react';
import { useDarkMode } from '../../context/DarkModeContext';
import styles from './Header.module.css';
import { HiMoon, HiSun } from 'react-icons/hi';

export default function Header({ filters, filter, onFilterChange }) {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <header className={styles.header}>
      <button onClick={toggleDarkMode} className={styles.toggle}>
        {!darkMode && <HiMoon />}
        {darkMode && <HiSun />}
      </button>
      <ul className={styles.filters}>
        {filters.map((value, index) => (
          <li key={index}>
            <button
              className={`${styles.filter} ${
                filter === value && styles.selected
              }`}
              onClick={() => onFilterChange(value)}
            >
              {value}
            </button>
          </li>
        ))}
      </ul>
    </header>
  );
}

/*
버튼의 className={styles.filter} 부분  ->
문자, 프로그래밍 된 부분 섞어서 쓰기 위해선 ``
전달받은 값과 버튼의 값이 동일하다면 클라스 selected 도 써줄꺼임

*/
