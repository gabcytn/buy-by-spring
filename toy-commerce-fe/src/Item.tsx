import Header from "./Header";
import { useParams } from "react-router-dom";

function Item() {
  const { id } = useParams();

  return (
    <>
      <Header />
      <div>
        <p>Item {id}</p>
      </div>
    </>
  );
}

export default Item;
