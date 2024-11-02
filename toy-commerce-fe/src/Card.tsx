function Card() {
  return (
    <div className="col-sm-6 col-lg-3 col-12">
      <a
        href="#"
        className="card"
        style={{ width: "18rem;", textDecoration: "none" }}
      >
        <img src="#" className="card-img-top" alt="Image of a Card" />
        <div className="card-body">
          <h5 className="card-title">Lorem Ipsum</h5>
          <p className="card-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
            ipsam, quas veritatis reiciendis consequatur earum
          </p>
          <a href="#" className="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </a>
    </div>
  );
}

export default Card;
