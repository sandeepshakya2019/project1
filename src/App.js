// import the react componets
import React, { useState } from "react";
// import the css file
import "./App.css";
// import the display user data compoents
import DisplayUserData from "./components/DisplayUserData";
// import thr form
import Form from "./components/Form";

function App() {
  // Defining state
  const [getuserData, setgetuserData] = useState([]);
  const [getapidata, setgetapidata] = useState([]);

  const setuserdata = (data) => {
    setgetuserData(data);
  };
  const setapidata = (apidata) => {
    setgetapidata(apidata);
  };

  // console.log(getuserData);
  return (
    <div className="App">
      <h1>Welcome to the Horoscope ! </h1>
      <Form setdata={setuserdata} setapidata={setapidata} />
      <DisplayUserData userdata={getuserData} apidata={getapidata} />

      <br />
    </div>
  );
}

export default App;
