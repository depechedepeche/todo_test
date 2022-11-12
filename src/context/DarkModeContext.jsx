//다크모드를 설정 한뒤 화면을 껐다 켜도 다크모드가 유지되는 상태
//useEffect()이용

import { createContext, useState, useContext, useEffect } from 'react';
//useEffect사용
const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    updateDarkMode(!darkMode);
  };
  //컨텍스트가 마운트 되었을때, 마지막 상태를 계속 기억해놓은 상태로 유지
  //https://tailwindcss.com/docs/dark-mode 에서 spaghetti.js 첫 부분 복사 수정
  //제일 처음 마운트(로딩) 될때 다크모드인지 아닌지 판단하고 그대로 초기값 설정
  useEffect(() => {
    const isDark =
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches); //다크모드인지 아닌지 변수에 먼저 저장
    setDarkMode(isDark); //다크모드인지 아닌지 내부상태업데이트
    updateDarkMode(isDark); //아래 정의된 함수호출
  }, []);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function updateDarkMode(darkMode) {
  if (darkMode) {
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark'; //업데이트 될대마다 로컬스토리지에 저장
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light'; //업데이트 될대마다 로컬스토리지에 저장
  }
}

export const useDarkMode = () => useContext(DarkModeContext);
