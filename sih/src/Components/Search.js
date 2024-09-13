import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import "./search.css";

function Search() {
  return (
    <div className="main">
      <div className="search">
        <TextField
          id="outlined-basic"
          variant="outlined"
        />
      </div>
    </div>
  );
}

export default Search;
