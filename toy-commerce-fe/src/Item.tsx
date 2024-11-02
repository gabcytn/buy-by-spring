import Header from "./Header";
import { useParams } from "react-router-dom";

function Item() {
  const { id } = useParams();

  return (
    <>
      <Header />
      <div className="bg-dark" style={{ minHeight: "calc(100dvh - 5.5rem)" }}>
        <div className="container pt-3">
          <div className="row">
            <div className="col-6 justify-content-end d-flex">
              <img src="https://placehold.co/400" alt="Placeholder image" />
            </div>
            <div className="col-6">
              <h2 className="text-light">Title {id}</h2>
              <p className="text-light">Description</p>
              <p className="text-light">P100.00</p>
              <p className="text-light">Qty: 1</p>
              <button className="btn btn-warning me-2">Update</button>
              <button className="btn btn-danger">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Item;
