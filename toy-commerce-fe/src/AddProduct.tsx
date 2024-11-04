import { useParams } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";

type PropType = {
  createOrUpdate: string;
};
function AddProduct({ createOrUpdate }: PropType) {
  const { id } = useParams();
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };
  async function handleSubmit(e: React.FormEvent, method: string) {
    e.preventDefault();
    const formData = new FormData();
    formData.append(
      "item",
      new Blob(
        [
          JSON.stringify({
            name: name,
            description: description,
            price: price,
            quantity: quantity,
          }),
        ],
        { type: "application/json" }
      )
    );
    if (file !== null) {
      formData.append("image", file);
    }
    if (method === "create") {
      const res = await fetch(`${SERVER_URL}/item`, {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        location.href = "/home";
      }
    } else {
      const res = await fetch(`${SERVER_URL}/item/${id}`, {
        method: "PUT",
        body: formData,
      });
      if (res.ok) {
        location.href = "/home";
      }
    }
  }
  return (
    <>
      <Header />
      <div className="bg-dark" style={{ minHeight: "calc(100dvh - 5.5rem)" }}>
        <div className="container">
          <h1 className="text-center text-light">
            {createOrUpdate === "create" ? "Add " : "Update "} Product
          </h1>
          <form
            className="row"
            onSubmit={(e) => {
              createOrUpdate === "create"
                ? handleSubmit(e, "create")
                : handleSubmit(e, "update");
            }}
          >
            <div className="col-12">
              <label htmlFor="name" className="form-label text-light">
                Name
              </label>
              <input
                required
                type="text"
                name="name"
                id="name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-12">
              <label htmlFor="name" className="form-label text-light">
                Description
              </label>
              <input
                required
                type="text"
                name="description"
                id="description"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="col-12">
              <label htmlFor="price" className="form-label text-light">
                Price
              </label>
              <div className="input-group">
                <span className="input-group-text">$</span>
                <input
                  required
                  type="text"
                  name="price"
                  id="price"
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
                <span className="input-group-text">.00</span>
              </div>
            </div>
            <div className="col-12">
              <label className="form-label text-light" htmlFor="quantity">
                Quantity
              </label>
              <input
                required
                type="number"
                name="quantity"
                id="quantity"
                className="form-control"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>
            <div className="col-12">
              <label className="form-label text-light" htmlFor="image">
                Image
              </label>
              <input
                required
                type="file"
                name="image"
                id="image"
                className="form-control"
                onChange={handleFileChange}
              />
            </div>
            <div className="col">
              <button className="mt-3 btn btn-primary" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
