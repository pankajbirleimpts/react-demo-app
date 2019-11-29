import React from "react";

export default React.createContext({
  language: "English",
  updateLanguage: val => {
    this.language = val;
  }
});
