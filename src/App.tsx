import { useEffect, useState } from "react";
import "./App.css";

type Item = {
  id: number;
  name: string;
};

type Store = {
  id: number;
  name: string;
  location: string;
  items: Item[];
};

function App() {
  const [stores, setStores] = useState<Store[]>([]);

  useEffect(() => {
    fetch("http://localhost:4000/stores")
      .then((res) => res.json())
      .then((storesFromPrisma) => setStores(storesFromPrisma));
  }, []);

  function deleteItem(item: Item) {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "DELETE",
    });

    const storesCopy = JSON.parse(JSON.stringify(stores))
    let items = storesCopy.find((store: Store) => store.items)
    let updatedItems = items.filter((target: Item) => target.id !== item.id)
    setStores(updatedItems)
  }

  return (
    <div className="App">
      <h1>We are broke, please buy our stuff!</h1>
      <ul>
        {stores.map((store) => (
          <div>
            <h2>{store.name.toUpperCase()}</h2>
            <h3>{store.location.toUpperCase()}</h3>
            <ul>
              {store.items.map((item) => (
                <div>
                  <li>{item.name}</li>
                  <button 
                  onClick={() => {
                    deleteItem(item)
                  }}>Sold</button>
                </div>
              ))}
            </ul>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;


