function Card({ render }: any) {
  return (
    <div className="col-sm-6 col-lg-3 col-12">
      <a
        href={`/product/${render.id}`}
        className="card"
        style={{ textDecoration: "none" }}
      >
        <img
          src={render.image}
          className="card-img-top"
          alt="Image of a Card"
          style={{
            width: "100%",
            height: "200px",
          }}
        />
        <div className="card-body">
          <h5 className="card-title">{render.name}</h5>
          <p className="card-text">{render.description}</p>
          <p className="card-text">
            <strong>P{render.price}.00</strong>
          </p>
          <a href="#" className="btn btn-primary">
            Add to Cart
          </a>
        </div>
      </a>
    </div>
  );
}

export default Card;
