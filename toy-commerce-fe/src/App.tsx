import Header from "./Header";
import MainBody from "./MainBody";

function App() {
  return (
    <>
      <Header />
      <main className="bg-dark" style={{ minHeight: "calc(100dvh - 4.5rem)" }}>
        <MainBody />
      </main>
    </>
  );
}

export default App;
