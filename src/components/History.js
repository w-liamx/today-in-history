import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SelectDate from "./Search";
import Results from "./Results";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function History({ ...props }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [activeGroup, setActiveGroup] = useState(false);
  const [searchResults, setSearchResults] = useState({});

  const handleChange = (panel, index) => {
    if (expanded === panel + index) {
      setExpanded(false);
    } else {
      setExpanded(panel + index);
    }
  };

  const changeActiveGroup = (panel) => {
    if (activeGroup === panel) {
      setActiveGroup(false);
    } else {
      setActiveGroup(panel);
    }
  };

  const displayResultsDetails = (resultArr, resultKey) => {
    return (
      <Accordion
        expanded={activeGroup === resultKey}
        onChange={() => changeActiveGroup(resultKey)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <h5 className={classes.heading}>{resultKey}</h5>
          <h5 className={classes.secondaryHeading}>
            {"All recorded " + resultKey + " on this day..."}
          </h5>
        </AccordionSummary>
        <AccordionDetails>
          <Container>
            <Results
              resultArr={resultArr}
              resultKey={resultKey}
              handleChange={handleChange}
              expanded={expanded}
              classes={classes}
            />
          </Container>
        </AccordionDetails>
      </Accordion>
    );
  };

  const displayResults = (data) => {
    const display = (
      <>
        <div>
          <h2>Events</h2>
          {data.Events && displayResultsDetails(data.Events, "Events")}
        </div>
        <div>
          <h2>Births</h2>
          {data.Births && displayResultsDetails(data.Births, "Births")}
        </div>
        <div>
          <h2>Deaths</h2>
          {data.Deaths && displayResultsDetails(data.Deaths, "Deaths")}
        </div>
      </>
    );
    return display;
  };

  return (
    <Container fixed>
      <SelectDate setData={setSearchResults} />
      <div style={{ textAlign: "center" }}>
        <h2>Today in History</h2>
        <h3>{searchResults.date && searchResults.date}</h3>
        {searchResults.data && displayResults(searchResults.data)}
      </div>
    </Container>
  );
}
