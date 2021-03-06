import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const Results = ({ resultArr, resultKey, handleChange, expanded, classes }) => {
  return (
    resultArr &&
    resultArr.map((data, index) => (
      <div>
        <Accordion
          style={{
            textAlign: "center",
          }}
          expanded={expanded === resultKey + index}
          onChange={() => handleChange(resultKey, index)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>
              {data.year && data.year}
            </Typography>
            <Typography className={classes.secondaryHeading}>
              {data.text && data.text}
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            style={{
              backgroundColor: "#f0f0f0",
            }}
          >
            <div
              style={{
                marginLeft: "50%",
                transform: "translateX(-50%)",
                textAlign: "center",
              }}
            >
              <h4>Read More</h4>
              <ul
                style={{
                  textAlign: "left",
                }}
              >
                {data.links &&
                  data.links.map((link) => (
                    <li>
                      <a href={link.link} target="_blank" rel="noreferrer">
                        {link.title}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    ))
  );
};

export default Results;
