import Header from "./Header";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Item = {
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
};
function Item() {
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  const { id } = useParams();
  const [item, setItem] = useState<Item | undefined>();

  function deleteItem() {
    fetch(`${SERVER_URL}/item/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        location.href = "/home";
      }
    });
  }
  useEffect(() => {
    const fetchItem = async () => {
      const res = await fetch(`${SERVER_URL}/item/${id}`);
      const data = await res.json();
      setItem(data);
      console.log(data);
    };

    fetchItem();
  }, []);
  return (
    <>
      <Header />
      <div className="bg-dark" style={{ minHeight: "calc(100dvh - 5.5rem)" }}>
        <div className="container pt-3">
          <div className="row">
            <div className="col-6 justify-content-end d-flex">
              <img
                src={item?.image}
                alt="Placeholder image"
                style={{ width: "400px", height: "400px" }}
              />
            </div>
            <div className="col-6">
              <h2 className="text-light">{item?.name}</h2>
              <p className="text-light">{item?.description}</p>
              <p className="text-light">P{item?.price}.00</p>
              <p className="text-light">Qty: {item?.quantity}</p>
              <button
                className="btn btn-warning me-2"
                onClick={() => {
                  location.href = `/product/update/${id}`;
                }}
              >
                Update
              </button>
              <button className="btn btn-danger" onClick={deleteItem}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Item;
