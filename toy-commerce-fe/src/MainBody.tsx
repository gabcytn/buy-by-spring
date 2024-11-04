import { useState, useEffect } from "react";
import Card from "./Card";
function MainBody() {
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

  return (
    <div className="container">
      <div className="row g-3">
        {items.map((item, idx) => (
          <Card key={idx} render={item} />
        ))}
      </div>
    </div>
  );
}

export default MainBody;
