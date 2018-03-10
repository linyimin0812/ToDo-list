import * as React from "react";
import * as ReactDom from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import * as $ from "jquery";
import "../styles/App.css";

export class App extends React.Component<any, IState>{

    constructor(props){
        super(props);
        this.state = {
            currentTask: "",
            tasks: []
        };
    }
    public render(): JSX.Element {
        return (
            <div className="container">
                <h3 className="text-center text-primary"><big>ToDo</big><small className="text-secondary">你需要完成的任务</small></h3>
                <hr />
                <form className="form input-text">
                    <div className="row text-center">
                        <div className="col-md-9">
                                <input type="text" className="form-control" placeholder="添加一个任务" />
                        </div>
                        <div className="col-md-3">
                            <button type="submit" className="btn btn-primary">添加</button>
                        </div>
                    </div>
                </form>
                
                <div>
                    <span className="text-primary"><big>正在进行</big></span>
                    <p className="badge badge-danger">6</p>
                </div>
                <div className="row align-center">
                    <div className="col-md-6 text-center">任务</div>
                    <div className="col-md-3 text-center">创建时间</div>
                    <div className="col-md-3 text-center">操作</div>
                </div>
                <hr />
                <div>
                    <span className="text-primary"><big>已经完成</big></span>
                    <p className="badge badge-success">6</p>
                </div>
                <div className="row align-center">
                    <div className="col-md-6 text-center">任务</div>
                    <div className="col-md-3 text-center">完成时间</div>
                    <div className="col-md-3 text-center">操作</div>
                </div>

            </div>
        )
    }
}

interface IState {
    currentTask: string,
    tasks: ITask[]
}

interface ITask {
    id: number,
    value: string,
    isCompleted: boolean,
    createTime: Date,
    finishTime: Date
}