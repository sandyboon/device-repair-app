import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuBar from "../components/MenuBar";

export default function Repair({ match }) {
  const usedParts = [
    { id: 1604, name: "iPhone Xs LCD display", cost: 41.28 },
    { id: 103, name: "iPhone Xs back glass", cost: 7.98 },
    { id: 340, name: "iPhone Xs battery", cost: 22.05 },
  ];

  const [repairStatus, setRepairStatus] = useState("ongoing");
  const [parts, setParts] = useState(usedParts);
  const [costOfLabour, setCostOfLabour] = useState("");

  const partsTable = parts.map((part) => {
    return (
      <div className="part-row" key={part.id}>
        <div>
          <p className="part-name">
            <Link target="_blank" to="/somepage">
              {part.name}
            </Link>
            <span
              className="delete float-right"
              id={part.id}
              onClick={(e) => {
                setParts(
                  parts.filter((aPart) => aPart.id !== parseInt(e.target.id))
                );
              }}
            >
              ×
            </span>
            <span className="float-right">${part.cost}</span>
          </p>
        </div>
        <div>
          <p className="part-id">ID: {part.id}</p>
        </div>
      </div>
    );
  });

  return (
    <React.Fragment>
      <MenuBar />
      <div className="container">
        <header>
          <h4>
            Repair #{match.params.id}{" "}
            <span className={`status status-${repairStatus}`}>
              {repairStatus}
            </span>
          </h4>
          <h6>
            <Link to="/customer/12">Joe Smith</Link>
          </h6>
          <h6>Apple iPhone Xs</h6>
          <h6>Started Jul. 6 2020</h6>
        </header>
        <hr></hr>
        <div className="row">
          <div className="eight columns">
            <h5>Parts</h5>
            {partsTable}
            <Link to={`./${match.params.id}/selectpart`} className="button">
              Add part
            </Link>
          </div>
        </div>
        <hr></hr>
        <div className="row">
          <div className="six columns">
            <h5>Notes</h5>
            <textarea
              className="u-full-width"
              placeholder="Enter some notes"
            ></textarea>
          </div>
        </div>
        <hr></hr>
        <div className="row">
          <div className="six columns">
            <h5>Cost of labour</h5>
            <input
              type="number"
              min="0"
              className="u-full-width"
              id="labourCost"
              placeholder="Enter cost of labour"
              value={costOfLabour}
              onChange={(e) => setCostOfLabour(e.target.value)}
            ></input>
          </div>
        </div>
        <hr></hr>
        <div className="row">
          <div className="twelve columns">
            <h5>
              Total cost: $
              {parts
                .reduce(
                  (total, part) => {
                    return total + part.cost;
                  },
                  costOfLabour ? parseFloat(costOfLabour) : 0
                )
                .toFixed(2)}
            </h5>
            <button
              className="button-primary"
              onClick={() => {
                setRepairStatus("completed");
              }}
            >
              Complete repair
            </button>
            <p>
              {repairStatus === "ongoing"
                ? "Customer will be alerted by email once the repair is completed"
                : "Customer has been alerted"}
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}