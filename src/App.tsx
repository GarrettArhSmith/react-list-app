import { useState } from 'react'
import './App.css'

type ItemType = {
  _id: string;
  text: string;
  list: number;
}

function App() {
  const [inputs, setInputs] = useState({ search: "", add: "" });
  const [list, setList] = useState<ItemType[]>([]);

  const handleChange = (e: { target: { name: string, value: string } }) => {
    const { name, value } = e.target
    setInputs(prev => ({ ...prev, [name]: value }))
  }

  const addItem = (e) => {
    e.preventDefault();
    setList(prev => [
      ...prev,
      {
        _id: `${Math.floor(Math.random()*10000)}`,
        text: inputs.add,
        list: 0
      }
    ]);
    setInputs(prev => ({ ...prev, add: "" }));
  }

  const moveItem = (e) => {
    setList(prev => prev.map(
      item => item._id === e.target.parentNode.id ?
      { ...item, list: item.list === 0 ? 1 : 0 } : item
    ))
  }

  const formatItemText = (text: string) => {
    if (inputs.search.length > 0) {
      const matchIndex = text.indexOf(inputs.search);
      const match = text.substring(matchIndex, matchIndex + inputs.search.length);
      console.log(match, matchIndex);

      return (
        <p>
          {text.substring(0, matchIndex)}
          <span className="match">{match}</span>
          {text.substring(matchIndex + inputs.search.length)}
        </p>
      )
    }
    return <p>{text}</p>;
  }

  return (
    <>
    <div className="container">
      <div className="searchContainer">
        <label htmlFor="search">Search:</label>
        <input type="text" name="search" value={inputs.search} onChange={handleChange}/>
      </div>
      <form action="submit" onSubmit={addItem}>
        <input type="text" name="add" value={inputs.add} onChange={handleChange}/>
        <button type="submit">Add Item</button>
      </form>
    </div>
    <div className='list'>
      {list.map(item => item.text.includes(inputs.search) && (
        <div
          key={item._id}
          id={item._id}
          className={`listItem list${item.list}`}
        >
          {formatItemText(item.text)}
          <button onClick={moveItem} className="moveBtn">
            {item.list === 0 ? ">" : "<"}
          </button>
        </div>
      ))}
    </div>
    </>
    
  )
}

export default App
