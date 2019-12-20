import React from "react";
import { Button } from "react-bootstrap";
import ReactTooltip from "react-tooltip";
import './CustomTable.css';

export default function Tooltip() {
  return (
    <>
      <a data-tip data-for="clickme" data-event="click">
        <i className="action-icon fa fa-tags"></i>
      </a>
      <ReactTooltip id="clickme" place="bottom" effect="solid" clickable={true}>
        <div
          className="d-flex justify-content-between"
          style={{ width: "250px" }}
        >
          <Button className="btn-circle"  variant="light" size="sm">
            Lorem
          </Button>
          <Button className="btn-circle" variant="light" size="sm">
            Ipsum
          </Button>
          <Button className="btn-circle" variant="light" size="sm">
            Dolar
          </Button>
          <Button className="btn-circle" variant="light" size="sm">
            Amet
          </Button>
        </div>
      </ReactTooltip>
    </>
  );
}
