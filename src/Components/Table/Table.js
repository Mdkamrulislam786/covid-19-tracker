import React from "react";
import "./Table.css";
import { prettyPrintStat } from "../../util";

const Table = ({ countries,darkMode }) => {
  return (
    <div className={`table ${darkMode && "table--dark"}`}>
      <table>
        <tbody>
          {countries.map(({ country, cases }, index) => (
            <tr key={index}>
              <td>{country}</td>
              <td>
                <strong>{prettyPrintStat(cases)}</strong>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
