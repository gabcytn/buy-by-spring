import Card from "./Card";
function MainBody({ items }: any) {
  return (
    <div className="container">
      <div className="row g-3">
        {items.map((item: Object, idx: number) => (
          <Card key={idx} render={item} />
        ))}
      </div>
    </div>
  );
}

export default MainBody;
