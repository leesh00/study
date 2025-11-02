/* eslint-disable react-refresh/only-export-components */
import './App.css'
import { useReducer, useRef, createContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Diary from './pages/Diary'
import New from './pages/New'
import Edit from './pages/Edit'
import Notfound from './pages/Notfound'

const mockData = [
  {
    id: 1,
    createDate: new Date("2025-11-02").getTime(),
    emotionId: 1,
    content:"1번째 날"
  },
  {
    id: 2,
    createDate: new Date("2025-11-01").getTime(),
    emotionId: 2,
    content:"2번째 날"
  },
  {
    id: 3,
    createDate: new Date("2025-10-31").getTime(),
    emotionId: 3,
    content:"3번째 날🎃"
  },
]
function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state];
    case "UPDATE":
      return state.map((item) => String(item.id) === String(action.data.id) ? action.data : item) // id가 일치하는 item만 수정
    case "DELETE":
      return state.filter((item) => String(item.id) !== String(action.id));
    default:
      return state;
    }   
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);
  
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
