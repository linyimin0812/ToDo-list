import { TaskModel, Task} from "../model/task";
import {Request, Response} from "express";


/**
 * 新建任务
 * @param req 
 * @param res 
 */
export const insertTask = function(req: Request, res: Response){
  console.log(req.body);
  const task = new Task({
    id: req.body.id,
    task: req.body.task,
    time: {
      createAt: timeString(new Date()),
      finishAt: '',
    },
    // 标识任务尚未完成
    status: 0
  });
  task.save(err => {
    if(err){
      res.status(500);
      if(err.code === 11000){
        res.send('error: corpus is duplicate, please check');
      }else{
        res.send('error: some error');
      } 
    }else{
      res.status(200);
      res.end();
    }
  });
}

/**
 * 完成任务
 * @param req 
 * @param res 
 */
export const finishTask = function(req: Request,res: Response){
  Task.findOne({task: req.body.task}, (err, task: TaskModel) => {
    if (task === null) {
      return res.send(`error: task ${req.body.task} doesn't exist`);
    }
    task.time.finishAt = req.body.finishAt;
    // 标识该任务已经完成
    task.status = 1;
    task.save((err) => {
      if (err) {
        return res.send('error: error happened when update the task');
      }
      res.send(`success: update successfully for corpus: ${req.body.task}`);
    });
  });
}

/**
 * 删除任务(仍然存储在数据库中,但是不加以显示)
 * @param req 
 * @param res 
 */
export const deleteTask = function(req: Request,res: Response){
  Task.findOne({task: req.body.task}, (err, task: TaskModel) => {
    if (task === null) {
      return res.send(`error: task ${req.body.task} doesn't exist`);
    }
    // 标识该任务已经删除
    task.status = -1;
    task.save((err) => {
      if (err) {
        return res.send('error: error happened when update the task');
      }
      res.send(`success: update successfully for corpus: ${req.body.task}`);
    });
  });
}


/**
 * 重做任务
 * @param req 
 * @param res 
 */
export const redoTask = function(req: Request, res: Response){
  Task.findOne({task: req.body.task}, (err, task: TaskModel) => {
    if (task === null) {
      return res.send(`error: task ${req.body.task} doesn't exist`);
    }
    // 标识该任务尚未完成
    task.status = 0;
    task.time.finishAt = '';
    task.save((err) => {
      if (err) {
        return res.send('error: error happened when update the task');
      }
      res.send(`success: update successfully for corpus: ${req.body.task}`);
    });
  });
}

/**
 * 获取未完成的任务
 * @param req 
 * @param res 
 */
export const getUnfinishTask = function(req: Request,res: Response){
  Task.find({})
  .sort({ updatedAt: -1 })
  .exec((err, data: [TaskModel]) =>{
    if(err){
      res.status(400);
      return res.end();
    }
    res.json(data.filter((value => value.status === 0)));
  });
}

/**
 * 获取所有已完成任务
 * @param req 
 * @param res 
 */
export const getFinishTask = function(req: Request,res:Response){
  Task.find({})
  .sort({ updatedAt: -1 })
  .exec((err, data: [TaskModel]) =>{
    if(err){
      res.status(400);
      return res.end();
    }
    res.json(data.filter((value => value.status === 1)));
  });
}

/**
 * 获取所有的任务
 * @param req 
 * @param res 
 */
export const getAllTask = function(req: Request, res: Response){
  Task.find({})
  .sort({ updatedAt: -1 })
  .exec((err, data: [TaskModel]) =>{
    if(err){
      res.status(400);
      return res.end();
    }
    res.json(data);
  });
}

/**
 * 将Date类型数据转换成2018-3-25 00:00:00AM类型
 * @param date 
 */
function timeString(date: Date): string {
  let year: number = date.getFullYear();
  let month: number = date.getMonth() + 1;
  let day: number = date.getDate();
  let time: string = date.toLocaleTimeString();
  return year + "-" + month + "-" + day + " " + time;
}