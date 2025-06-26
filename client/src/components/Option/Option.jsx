import React from "react";

function Option({ title, value }) { 
  return (
    <option value={value}>{ title }</option>
  );
}

export default Option;