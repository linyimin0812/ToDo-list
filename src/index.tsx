import * as React from "react";
import * as ReactDom from "react-dom";
import {App} from "./components/App";

const ROOT =  document.querySelector('.container');

ReactDom.render(<App />, ROOT);
