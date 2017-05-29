import React from "react";
import ReactDOM from "react-dom";
import ImageProvider from "./modules/ImageProvider";
import Main from "./components/Main";
import Start from "./components/Start";

ImageProvider.setUp("declarative");

const elementToRender = <Main><Start /></Main>;
ReactDOM.render(elementToRender, document.getElementById("app"));
