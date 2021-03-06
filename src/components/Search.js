import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function SelectDate({ setData }) {
  const classes = useStyles();
  const [date, setDate] = useState({
    day: 1,
    month: 1,
  });

  const handleChange = (event) => {
    setDate({
      ...date,
      [event.target.name]: event.target.value,
    });
  };

  const headerConfig = (method) => {
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3000",
    };
    return {
      method,
      headers,
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("submitting");
    try {
      const req = await fetch(
        "https://history.muffinlabs.com/date/" + date.day + "/" + date.month,
        headerConfig("GET")
      );
      const response = await req.json();
      setData(response);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ marginTop: "5rem", textAlign: "center" }}>
      <span>Select Date</span>
      <form
        onSubmit={handleSubmit}
        method="GET"
        noValidate
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="day">Day</InputLabel>
          <Select
            native
            onChange={handleChange}
            name="day"
            defaultValue={date.day}
            id="day"
          >
            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
              <option key={day} value={date.day}>
                {day}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="month">Month</InputLabel>
          <Select
            native
            onChange={handleChange}
            name="month"
            defaultValue={date.month}
            id="month"
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
              <option key={month} value={date.month}>
                {month}
              </option>
            ))}
          </Select>
        </FormControl>
        <Button variant="outlined" type="submit" color="primary">
          Get History
        </Button>
      </form>
    </div>
  );
}
