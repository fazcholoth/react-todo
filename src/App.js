import './App.css';
import { useState ,useEffect} from 'react';


function App() {
  const [list,setList]=useState([])
  const [toDo,setTodo]=useState('')

    useEffect(() => {
    const storedList = localStorage.getItem('list');
    if (storedList) {
      setList(JSON.parse(storedList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  const handleAddItem = () => {
    if (toDo.trim() === '') {
      return;
    }

    const newItem = {
      id: Date.now(),
      text: toDo,
      status: false,
    };

    setList((list) => [...list, newItem]);
    setTodo('');
  };


  const handleDelete = (id) => {
    setList((list) => list.filter((item) => item.id !== id));
  };


  const handleCheckboxChange = (id, checked) => {
    setList((list) =>
      list.map((item) => {
        if (item.id === id) {
          return { ...item, status: checked };
        }
        return item;
      })
    );
  };
 
  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>  </h2>
      </div>
      <div className="input">
        <input value={toDo} onChange={(e)=>setTodo(e.target.value)} type="text" placeholder="🖊️ Add item..." />
        <i onClick={handleAddItem} className="fas fa-plus"></i>
      </div>
      <div className="todos">
      
      {list.map((value) => (
  <div className="todo" key={value.id}>
    <div className="left">
      <input
        onChange={(e) => handleCheckboxChange(value.id, e.target.checked)}
        checked={value.status}
        type="checkbox"
        name=""
        id=""
      />
      <p>{value.text}</p>
    </div>
    <div className="right">
      <i onClick={() => handleDelete(value.id)} className="fas fa-times"></i>
    </div>
  </div>
))}

      </div>
    </div>
  );
}

export default App;
