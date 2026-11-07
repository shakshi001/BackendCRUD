
import { User } from "../models/user.model.js";
import {ProjectMember} from "../models/projectmember.models.js"
import { ApiError } from "../utils/api.error.js";
import { asyncHandler } from "../utils/async.handler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    let token = req.cookies?.accessToken;
    console.log("token: ", token);
  if (!token) {
    const authHeader = req.header("Authorization");

    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.replace("Bearer ", "");
      }
      console.log("token: ", token);
    }
    if (!token)
    {
        throw new ApiError(401, "Unauthorized request...");
    }
  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("DECODED", decodedToken);
    const user = await User
      .findById(decodedToken?._id)
      .select(
        "-password -refreshToken -emailVerification -emailVerificationExpiry",
      );
    if (!user) {
      throw new ApiError(401, "Inavlid access token");
    }
    req.user = user;
    next();
  } catch (error) {
    throw error;
  }
});



export const validateProjectPermission = (roles = []) => {
  return asyncHandler(async (req, res, next) => {
    const { projectId } = req.params
    
    if (!projectId)
    {
      throw new ApiError(400, "project id is missing ...");
    }

   const project =  await ProjectMember.findOne({
      project: new mongoose.Types.ObjectId(projectId),
      user: new mongoose.Types.ObjectId(req.user._id)
    })
    
    if (!project)
    {
      throw ApiError(404, "Project  not found...");
    }

    const givenRole = project?.role
    req.user.role = givenRole
    
    if (!roles.includes(givenRole) && roles.lenght)
    {
       throw new ApiError(403, "You do not have permission to perfrom this action")
    }
    next();
  })
}


