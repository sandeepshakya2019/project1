import React, { useState } from "react";
import axios from "axios";
import validator from "validator";

import "./Form.css";

function Form(props) {
  // const [apidata, setapidata] = useState([]);
  const [inputerror, setinputerror] = useState("");
  // to get the data of the forms
  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [sign, setsign] = useState("");
  const [date, setdate] = useState("");

  // Submit handler triggereed when the button is clicked or pressed
  const onSubmitHandler = (event) => {
    setinputerror("");
    event.preventDefault();

    const userData = {
      email: email,
      name: name,
      sign: sign,
      date: date,
    };
    // if no data is entered
    if (!userData.email || !userData.name || !userData.sign || !userData.date) {
      setinputerror("Please Fill the form Correctly All Fields are mandetory");
      return;
    }
    // Email Validator
    if (!validator.isEmail(userData.email)) {
      setinputerror("Email Is not Valid");
      return;
    }
    // Validating the zodia signs
    const zodiacsign = [
      "Aries",
      "Taurus",
      "Gemini",
      "Cancer",
      "Leo",
      "Virgo",
      "Libra",
      "Scorpio",
      "Sagittarius",
      "Capricorn",
      "Aquarius",
      "Pisces",
    ];
    // Taking the dates of the
    const newDate = Number(new Date().getDate());
    const arrDate = Number(userData.date.split("-")[2]);
    var day = "today";
    if (newDate === arrDate) {
      day = "today";
    } else if (newDate - arrDate === 1) {
      day = "yesterday";
    } else if (newDate - arrDate === -1) {
      day = "tomorrow";
    }

    // If zodia sign matched then fetch the data from the api
    zodiacsign.map((sig) => {
      if (sig.toLocaleLowerCase() === userData.sign.toLocaleLowerCase()) {
        axios
          .post(
            `https://aztro.sameerkumar.website?sign=${userData.sign}&day=${day}`
          )
          .then(function (response) {
            setinputerror("Fetching Data .... ");

            localStorage.setItem("apiData", JSON.stringify(response.data));
            localStorage.setItem("userData", JSON.stringify(userData));

            props.setdata(userData);
            props.setapidata(response.data);
            setemail("");
            setname("");
            setsign("");

            setinputerror("Data Fetched ");

            return userData;
          })
          .catch(function (error) {
            // console.error(error);
            setinputerror(
              "Sorry Unable to Find Data Please check zodiac sign and date"
            );
            localStorage.setItem(
              "apiData",
              "Data Not Found Please Check the Sign"
            );
            return 0;
          });
        return 0;
      } else {
        return 0;
      }
    });

    return 0;
  };
  // for max date validation for html
  const max = () => {
    var dtToday = new Date();

    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate() + 1;
    var year = dtToday.getFullYear();

    if (month < 10) month = "0" + month.toString();
    if (day < 10) day = "0" + day.toString();

    var maxDate = year + "-" + month + "-" + day;

    return maxDate;
  };
  // for validating the min date in html
  const min = () => {
    var dtToday = new Date();

    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate() - 1;
    var year = dtToday.getFullYear();

    if (month < 10) month = "0" + month.toString();
    if (day < 10) day = "0" + day.toString();

    var maxDate = year + "-" + month + "-" + day;

    return maxDate;
  };

  return (
    <>
      <form className="container mt-5  form  p-4">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(event) => setemail(event.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(event) => setname(event.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="sign" className="form-label">
            Horoscope Sign
          </label>
          <input
            type="text"
            className="form-control"
            id="sign"
            value={sign}
            onChange={(event) => setsign(event.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Horoscope Date
          </label>
          <input
            type="date"
            className="form-control"
            id="date"
            value={date}
            onChange={(event) => setdate(event.target.value)}
            max={max()}
            min={min()}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-success"
          onClick={onSubmitHandler}
        >
          Submit
        </button>
        {inputerror.length !== 0 ? (
          <>
            <br />
            <p className="inputerror">{inputerror}</p>
          </>
        ) : (
          ""
        )}
      </form>
    </>
  );
}

export default Form;
