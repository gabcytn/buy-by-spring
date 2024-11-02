import Header from "./Header";
function AddProduct() {
  return (
    <>
      <Header />
      <div className="bg-dark" style={{ minHeight: "calc(100dvh - 5.5rem)" }}>
        <div className="container">
          <h1 className="text-center text-light">Add Product</h1>
          <form className="row">
            <div className="col-12">
              <label htmlFor="name" className="form-label text-light">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
              />
            </div>
            <div className="col-12">
              <label htmlFor="name" className="form-label text-light">
                Description
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
              />
            </div>
            <div className="col-12">
              <label htmlFor="price" className="form-label text-light">
                Price
              </label>
              <div className="input-group">
                <span className="input-group-text">$</span>
                <input
                  type="text"
                  name="price"
                  id="price"
                  className="form-control"
                />
                <span className="input-group-text">.00</span>
              </div>
            </div>
            <div className="col-12">
              <label className="form-label text-light" htmlFor="quantity">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                id="quantity"
                className="form-control"
              />
            </div>
            <div className="col-12">
              <label className="form-label text-light" htmlFor="image">
                Image
              </label>
              <input
                type="file"
                name="image"
                id="image"
                className="form-control"
              />
            </div>
          </form>
          <button className="mt-3 btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
