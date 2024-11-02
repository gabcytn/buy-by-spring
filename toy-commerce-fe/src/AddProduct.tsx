import Header from "./Header";
function AddProduct() {
  return (
    <>
      <Header />
      <div>
        <h1>Add Product</h1>
        <form>
          <label>
            Name:
            <input type="text" name="name" />
          </label>
          <label>
            Price:
            <input type="number" name="price" />
          </label>
          <label>
            Description:
            <input type="text" name="description" />
          </label>
          <label>
            Image:
            <input type="text" name="image" />
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    </>
  );
}

export default AddProduct;
