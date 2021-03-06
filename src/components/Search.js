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
    dataLoading: false,
    day: 10,
    month: 5,
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
    };
    return {
      method,
      headers,
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const req = await fetch("/data.json", headerConfig("GET"));
      const response = await req.json();
      setData(response);
      setDate({
        ...date,
        dataLoading: false,
      });
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
        <Button
          onClick={() =>
            setDate({
              ...date,
              dataLoading: true,
            })
          }
          variant="outlined"
          type="submit"
          color="primary"
        >
          {date.dataLoading ? "Fetching..." : "Get History"}
        </Button>
      </form>
    </div>
  );
}
