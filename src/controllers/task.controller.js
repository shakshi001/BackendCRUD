import { User } from "../models/user.model.js"
import { Project } from "../models/project.model.js"
import { Task } from "../models/task.model.js"
import { Subtask } from "../models/subtask.model.js"
import { ApiResponse } from "../utils/api.response.js"
import { ApiError } from "../utils/api.error.js"
import mongoose from "mongoose"
import { AvailableUserRole, UserRolesEnum } from "../utils/constants.js"
import { asyncHandler } from "../utils/async.handler.js"



const getTask = asyncHandler(async (req, res) => {
    
})

const createTask = asyncHandler(async (req, res) => {
    const { title, description, assignedTo, status } = req.body
    const { projectId } = req.params
    const project = await Project.findById(projectId)

    if (!project) {
        throw new ApiError(404, "project not found...");
    }

  const files = req.files || []
   const attachments =  files.map((file) => {
       return {
           url: `${process.env.SERVER_URL}/images/${file.originalname}`,
           mimetype: file.mimetype,
           size: file.size
       }
    })
    const task = await Task.create({
     title,
      description,
      project: new mongoose.Types.ObjectId(projectId),

      assignedTo: assignedTo
        ? new mongoose.Types.ObjectId(assignedTo) 
        : undefined,

      status,

      assignedBy: new mongoose.Types.ObjectId(req.user._id),
      attachments, 
    });

    return res
        .status(201)
        .json(
            new ApiResponse(201, task, "Task created successfully...")
        )

});


const getTaskById = asyncHandler(async (req, res) => {
    //chai
})


const updateTask = asyncHandler(async (req, res) => {
    //chai
})


const deleteTask = asyncHandler(async (req, res) => {
    //chai
})

const createSubTask = asyncHandler(async (req, res) => {
    //chai
})


const updateSubTask = asyncHandler(async (req, res) => {
    //chai
})


const deleteSubTask = asyncHandler(async (req, res) => {
    //chai
})



export {
  getTask,
  deleteSubTask,
  updateSubTask,
  createSubTask,
  deleteTask,
  updateTask,
  getTaskById,
  createTask
};