import { useState, useEffect } from "react";
import Dropzone from "./components/Dropzone";
import Video from "./components/Video";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios({ method: "get", url: "http://localhost:5000/videos" })
      .then((result) => {
        setData(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [data]);

  return (
    <div className="App">
      <div>
        <Dropzone />
        {data.map((d, idx) => {
          return <Video key={idx} url={d.url} />;
        })}
      </div>
    </div>
  );
};

export default App;
