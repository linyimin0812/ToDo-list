import * as React from "react";
import * as ReactDom from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import * as $ from "jquery";

export class App extends React.Component<any, IState>{

    public render(): JSX.Element{
        return (
            <h1>Hello World</h1>
        )
    }
}

interface IState{
    currentTask: string,
    tasks: ITask[]
}

interface ITask{
    id: number,
    value: string,
    isCompleted: boolean,
    createTime: Date,
    finishTime: Date
}