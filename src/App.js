import AddItem from './AddItem';
import Content from './Content';
import Footer from './Footer';
import Header from './Header';
import {useState, useEffect } from 'react';
import SearchItem from './SearchItem';
import apiRequest from './apiRequest';

function App() {
  const API_URL = "http://localhost:3500/items"

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [search, setSearch ] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { 
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Did not receive expected data");
        const listItems = await response.json();
        setItems(listItems);
        setFetchError(null)
      } catch (error) {
        setFetchError(error.message)
      } finally {
        setIsLoading(false);
      }
    }
    setTimeout(() => {
      // simulate slow api
      (async () => await fetchItems())();
    }, 2000);
  }, [])

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const newItem = { id, checked: false, item};
    setItems([...items, newItem]);
    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newItem)
    }

    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchError(result)
  }

  const handleCheck = async (id) => {
    const listItems = items.map((item) => item.id === id ? { ...item, checked:!item.checked} : item)
    setItems(listItems);
    const myItem = listItems.filter((item) => item.id === id);
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({checked: myItem[0].checked})
    }

    const result = await apiRequest(API_URL + `/${id}`, updateOptions);
    if (result) setFetchError(result)
  }

  const handleDelete = async (id) => {
      const listItems = items.filter((item) => { return item.id !== id});
      setItems(listItems);
      const deleteOptions = {method: 'DELETE'};

      const result = await apiRequest(API_URL + `/${id}`, deleteOptions);
      if (result) setFetchError(result)
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
      <main>
        {isLoading && <p>Loading items</p>}
        {/* effectively here a th:if th:unless */}
        {fetchError && <p style={{color: "red"}}>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && <Content
          items={items.filter(item => ((item.item).toLowerCase().includes(search.toLowerCase())))}
          handleCheck={handleCheck}
          handleDelete={handleDelete}/>}
      </main>
      <Footer count={items.length}/>
    </div>
  );
}

export default App;
//A default export is like saying, "This is the main thing I want to share from this file."
// When other parts of your project want to use something from this file, they will get whatever is marked as the default export.
