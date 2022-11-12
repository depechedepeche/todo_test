//다크모드 사용을 위해 우산 씌워줘야함
import './App.css';
import TodoList from './components/TodoList/TodoList';
import Header from './components/Header/Header';
import { useState } from 'react';
import { DarkModeProvider } from './context/DarkModeContext';

//어떤 필터가 있는 지 컴포넌트 밖에서 정의
const filters = ['all', 'active', 'completed'];

function App() {
  const [filter, setFilter] = useState(filters[0]); //초기값으로는 필터중 all아이템 선택
  console.log('현재 filter값은?', filter);

  return (
    <DarkModeProvider>
      <Header filters={filters} filter={filter} onFilterChange={setFilter} />
      <TodoList filter={filter} />
    </DarkModeProvider>
  );
}

export default App;
// 헤더, 투두리스트 동시에 작동이 되어야 되서 app에 넣는게 어울림
//Header컴퍼넌트에 전체 filters배열과 선택된 filter를 전달
//필터를 받아서 setFilter를 호출
//{(filter) => setFilter(filter)} -전달하는 인자값과 호출하는 것이 같으니 함수의 참조값만 전달해줘도 됨 {setFilter}
//<TodoList filter={filter}/> -변경된 필터는 이거야  전달해줌
