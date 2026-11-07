import { Router } from "express";
import {
  getProjects,
  getProjectById,
  updateProject,
  deleteProjectById,
  addMembersToProject,
  updateMemberRoles,
  deleteMember,
  createProject,
  getProjectByMember,
} from "../controllers/project.controller.js";
import { validate } from "../middlewares/validator.middleware.js";
import {
  createProjectValidator,
  addMembersToProjectValidators
} from "../validator/index.js";

import {
    verifyJWT,
    validateProjectPermission
} from "../middlewares/auth.middleware.js";
import { UserRolesEnum } from "../utils/constants.js";


const router = Router()
router.use(verifyJWT)

router
    .route("/")
    .get(getProjects)
    .post(createProjectValidator(), validate , createProject)


router
    .route("/:projectId")
    .get(validateProjectPermission(), getProjectById)
    .put(
        validateProjectPermission([UserRolesEnum.ADMIN]),
        createProjectValidator(),
        validate,
        updateProject
    )
    .delete(
        validateProjectPermission([UserRolesEnum.ADMIN]),
        deleteProjectById
    )
    


router
    .route("/:projectId/members")
    .get(getProjectByMember)
    .post(
        validateProjectPermission([UserRolesEnum.ADMIN]),
        addMembersToProjectValidators(),
        validate,
        addMembersToProject
    )


router
  .route("/:projectId/members/:userId")
  .put(validateProjectPermission([UserRolesEnum.ADMIN]), updateMemberRoles)
  .delete(validateProjectPermission([UserRolesEnum.ADMIN]), deleteMember);
export default router;