import React from "react";
import "./Table.css";
import {prettyPrintStat} from '../../util'

const Table = ({ countries }) => {
  return (
    <div className="table">
      {countries.map(({ country, cases }, index) => (
        <tr key={index}>
          <td>{country}</td>
          <td>
            <strong>{prettyPrintStat(cases)}</strong>{" "}
          </td>
        </tr>
      ))}
    </div>
  );
};

export default Table;
