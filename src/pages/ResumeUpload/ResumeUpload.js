import React, { Component } from "react";
import "firebase/storage";
import Button from "react-bootstrap/Button";
import { fileURLToPath } from "url";

let firebase = require("firebase");
const { text } = require("body-parser");
firebase.initializeApp(config);
let storage = firebase.storage();

class ResumeUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: "",
      progress: 0,
    };
  }

  handleChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
    }
  };

  handleUpload = () => {
    const { image } = this.state;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress });
      },
      (error) => {
        // Error function ...
        console.log(error);
      },
      () => {
        // complete function ...
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            this.setState({ url });
            this.props.changeImage(url);
          });
      }
    );
  };
  render() {
    return (
      <div className="loginContainer">
        <div className="loginButton">
          <div className="btn">
            <span>File</span>
            <input type="file" onChange={this.handleChange} />
          </div>
          {/* <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div> */}
        </div>
        <Button
          onClick={this.handleUpload}
          className="waves-effect waves-light btn"
        >
          Upload
        </Button>
        <div className="row">
          <p>Upload Progress : </p>
          <progress
            value={this.state.progress}
            max="100"
            className="progress"
          />
        </div>
        <br />
        <br />
      </div>
    );
  }
}

export default ResumeUpload;
