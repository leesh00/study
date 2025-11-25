/* eslint-disable react-refresh/only-export-components */
import './App.css'
import { useReducer, useRef, createContext, useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Diary from './pages/Diary'
import New from './pages/New'
import Edit from './pages/Edit'
import Notfound from './pages/Notfound'

function reducer(state, action) {
  let nextState;
  switch (action.type) {
    case "INIT":
      return action.data;
    case "CREATE":
      { nextState = [action.data, ...state]; }
      break;
    case "UPDATE":
      { nextState = state.map((item) => String(item.id) === String(action.data.id) ? action.data : item) } // id가 일치하는 item만 수정
      break;
    case "DELETE":
      { nextState = state.filter((item) => String(item.id) !== String(action.id)); }
      break;
    default:
      return state;
  }
  
  localStorage.setItem("diary", JSON.stringify(nextState));
  return nextState;
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  useEffect(() => {
    const storeDate = localStorage.getItem("diary");
    if (!storeDate) {
      setIsLoading(false);
      return;
    }

    let maxId = 0;
    const parsedDate = JSON.parse(storeDate);
    if (!Array.isArray(parsedDate)) {
       setIsLoading(false);
      return;
    }
    parsedDate.forEach((item) => {
      if (Number(item.id) > maxId) {
        maxId = Number(item.id);
      }
    });

    idRef.current = maxId + 1;
    dispatch({
      type: "INIT",
      data: parsedDate,
    });
    setIsLoading(false);
  }, []);

  
  // 생성
  const onCreate = (createDate, emotionId, content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createDate,
        emotionId,
        content,
      }
    })
  }

  // 수정
  const onUpdate = (id, createDate, emotionId, content) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createDate,
        emotionId,
        content,
      }
    })
  }

  // 삭제
  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      id
    })
  }

  if (isLoading) {
    return <div>데이터 로딩중입니다...</div>
  }
  return (
    <>
      <DiaryStateContext value={data}>
        <DiaryDispatchContext
          value={{
            onCreate,
            onDelete,
            onUpdate
          }}>
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/new' element={<New />}></Route>
              <Route path='/diary/:id' element={<Diary />}></Route>
              <Route path='/edit/:id' element={<Edit />}></Route>
              <Route path='*' element={<Notfound />}></Route>
            </Routes>
          </DiaryDispatchContext>
      </DiaryStateContext>
    </>
  );
}

export default App
