import Header from "./Header";
import MainBody from "./MainBody";
import { useEffect, useState } from "react";
function App() {
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const res = await fetch(`${SERVER_URL}/items`);
      const data = await res.json();
      setItems(data);
    };

    fetchItems();
  }, []);

  function handleSearch(e: React.FormEvent, keyword: string) {
    e.preventDefault();

    fetch(`${SERVER_URL}/search/${keyword}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setItems(data);
      });
  }
  return (
    <>
      <Header handleSearch={handleSearch} />
      <main className="bg-dark" style={{ minHeight: "calc(100dvh - 4.5rem)" }}>
        <MainBody items={items} />
      </main>
    </>
  );
}

export default App;
