import React, { useEffect, useState } from "react";
import "./DisplayUserData.css";

function DisplayUserData(props) {
  // const [date, setDate] = useState(new Date("March 16").toString());
  const [displayapidata, setdisplayapidata] = useState([]);
  const [displayuserdata, setdisplayuserdata] = useState([]);
  // At the time of first render of the components fecth the data from the props or the local storage
  useEffect(() => {
    if (props.userdata.length !== 0) {
      setdisplayuserdata(props.userdata);
    } else {
      let userData = localStorage.getItem("userData");
      if (!userData) {
        setdisplayuserdata([]);
      } else {
        setdisplayuserdata(JSON.parse(userData));
      }
    }
    if (props.apidata.length !== 0) {
      setdisplayapidata(props.apidata);
    } else {
      let apidata = localStorage.getItem("apiData");
      if (!apidata) {
        setdisplayapidata([]);
      } else {
        if (apidata !== "Data Not Found Please Check the Sign") {
          setdisplayapidata(JSON.parse(apidata));
        }
      }
    }
  }, [props.apidata, props.userdata]);

  // console.log("get", displayuserdata);
  // console.log("api", displayapidata);

  // function dateRange(range, cur) {
  //   const arr = range.split("-");
  //   const arr1 = cur.split(",");
  //   console.log(arr1);
  // const currentDate = new Date(arr1[0]);
  //   const currentDate = new Date("16 March").toDateString();
  //   const rangeDate1 = new Date(arr[0]);
  //   const rangeDate2 = new Date(arr[1]);
  //   console.log(currentDate);
  //   if (currentDate <= rangeDate2 && currentDate >= rangeDate1) {
  //     console.log("date contained");
  //   } else {
  //     console.log("nor");
  //   }
  // }

  // if (displayapidata.length !== 0) {
  //   dateRange(displayapidata.date_range, displayapidata.current_date);
  // }

  return (
    <div className="container">
      <br />
      {displayuserdata.length !== 0 ? (
        <>
          <h3>Hello {displayuserdata.name} Welcome to the Horoscope </h3>
          <p>
            You Have Entered the {DisplayUserData.sign} as your's Zodiac Sign
            Here is Your Detail According to Horoscope
          </p>

          <code>
            <span className="details">User Details :</span>
            <br />
            Name of the User : {displayuserdata.name}
            <br />
            Email of the User : {displayuserdata.email}
            <br />
            Horoscope date : {displayuserdata.date}
            <br />
            Horoscope sign : {displayuserdata.sign}
            <br />
          </code>
          <br />
        </>
      ) : (
        ""
      )}

      {displayapidata !== "Data Not Found Please Check the Sign" ||
      displayapidata.length !== 0 ? (
        <>
          {}
          <code>
            <span className="details">Horoscope Details :</span>
            <br />
            Date Range : {displayapidata.date_range}
            <br />
            Current Date : {displayapidata.current_date}
            <br />
            Description : {displayapidata.description}
            <br />
            Compatibility : {displayapidata.compatibility}
            <br />
            Mood : {displayapidata.mood}
            <br />
            Color : {displayapidata.color}
            <br />
            Lucky Number : {displayapidata.lucky_number}
            <br />
            Lucky Time : {displayapidata.lucky_time}
            <br />
          </code>
        </>
      ) : (
        "No Data Please Enter the Data"
      )}
    </div>
  );
}

export default DisplayUserData;
