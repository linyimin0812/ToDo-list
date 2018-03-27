import * as mongoose from 'mongoose';

export type TaskModel = mongoose.Document & {
  id:number,
  task: string,
  time: {
    createAt: string,
    finishAt: string
  },
  status: number,
};

const taskSchema = new mongoose.Schema({
  id:{
    type: String,
    unique: true
  },
  task: {
    type: String,
    unique: true
  },
  status: {
    type: Number,
    required: true
  },
  time: {
    type: Object,
    required: true
  }
}, { timestamps: true });

export const Task = mongoose.model('Task', taskSchema);