import Dropzone from "./components/Dropzone";
function App() {
  return (
    <div className="App">
      <div>
        <Dropzone />
        <video controls muted>
          <source
            src="http://localhost:5000/video/test.mp4"
            type="video/mp4"
          ></source>
        </video>
      </div>
    </div>
  );
}

export default App;
