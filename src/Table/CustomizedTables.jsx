import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../Redux/userSlice";

export default function CustomizedTables() {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);


  //------------------------------------//
  //------------------------------------//

  const getKeys = (item) => {
    const keys = [];

    const extractKeys = (obj, parentKey = "") => {
      for (const key in obj) {
        const currentKey = parentKey ? `${parentKey}.${key}` : key;

        if (typeof obj[key] === "object") {
          extractKeys(obj[key], currentKey);
        } else {
          keys.push(currentKey);
        }
      }
    };

    extractKeys(item);

    return keys;
  };

  const keys = getKeys(data.length > 0 ? data[0] : {});

    //------------------------------------//
  //------------------------------------//

  const extractValues = (data, keys) => {
    return data.map((item) => {
      return keys.map((key) => {
        const nestedKeys = key.split(".");
        let value = item;
        for (const nestedKey of nestedKeys) {
          value = value[nestedKey];
        }
        return value;
      });
    });
  };

  const extractedValues = extractValues(data, keys);

  return (
    <TableContainer component={Paper} sx={{ width: "80%", margin: "0 auto",marginTop : "1rem" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {keys.map((heading, index) => {
              return (
                <TableCell sx={{ background: "orange" }} align="right">
                  {heading.includes(".") ? heading.split(".").pop() : heading}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {extractedValues.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {row.map((value) => {
                return <TableCell align="right">{value}</TableCell>;
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
