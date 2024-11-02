import Card from "./Card";
function MainBody() {
  return (
    <div className="container">
      <div className="row g-3">
        <Card id={1} />
        <Card id={2} />
        <Card id={3} />
        <Card id={4} />
        <Card id={5} />
        <Card id={6} />
        <Card id={7} />
      </div>
    </div>
  );
}

export default MainBody;
