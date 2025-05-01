import AddItem from './AddItem';
import Content from './Content';
import Footer from './Footer';
import Header from './Header';
import {useState, useEffect } from 'react';
import SearchItem from './SearchItem';

function App() {

  const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppingList')) || []);
  const [newItem, setNewItem] = useState('');
  const [search, setSearch ] = useState('');

  useEffect(() => {
    localStorage.setItem("shoppingList", JSON.stringify(items));
  }, [items])

  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const newItem = { id, checked: false, item};
    setItems([...items, newItem]);
  }

  const handleCheck = (id) => {
    const listItems = items.map((item) => item.id === id ? { ...item, checked:!item.checked} : item)
    setItems(listItems);
    localStorage.setItem("shoppingList", JSON.stringify(listItems));
  }

  const handleDelete = (id) => {
      const listItems = items.filter((item) => { return item.id !== id});
      setItems(listItems);
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if(!newItem) return
    addItem(newItem)
    setNewItem('')
    console.log("Submitted")
  }

  return (
    <div className="App">
      <Header title="Grocery List" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem
        search={search}
        setSearch={setSearch}
      />
      <Content
        items={items.filter(item => ((item.item).toLowerCase().includes(search.toLowerCase())))}
        handleCheck={handleCheck}
        handleDelete={handleDelete}/>
      <Footer count={items.length}/>
    </div>
  );
}

export default App;
//A default export is like saying, "This is the main thing I want to share from this file."
// When other parts of your project want to use something from this file, they will get whatever is marked as the default export.
