import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Axios from "axios";

const Dropzone = (props) => {
  const onDrop = (files) => {
    let formData = new FormData();
    formData.append("file", files[0]);

    Axios({
      method: "post",
      url: "http://localhost:5000/upload",
      data: formData,
    })
      .then(function (response) {
        console.log(response.status);
      })
      .catch(function (response) {
        console.log(response.status);
      });
  };

  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: {
        "video/mp4": [".mp4"],
      },
      onDrop,
    });

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </section>
  );
};

export default Dropzone;
