function App() {
  return (
    <div className="App">
      <div>
        <video controls muted>
          <source src="http://localhost:5000/video/1" type="video/mp4"></source>
        </video>
      </div>
    </div>
  );
}

export default App;
