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
          <AccordionDetails>
            <div>
              <span>
                <h4>Useful Links</h4>
              </span>
              <ul style={{ textDecoration: "none" }}>
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
