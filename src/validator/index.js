import { body } from "express-validator";
import { AvailableUserRole } from "../utils/constants.js";
const userRegisterValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required")
      .isLowercase()
      .withMessage("username must be in lower case")
      .isLength({ min: 3 })
      .withMessage("username must be 3  characters long"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required and atleast 6 characters long"),
    body("fullName").optional().trim(),
  ];
};

const userLoginValidator = () => {
  return [
    body("email").optional().isEmail().withMessage("Email is invalid ..."),

    body("password")
      .trim()
      .notEmpty()
      .isLength({ min: 6 })
      .withMessage("Password is required..."),
  ];
};

const userChangeCurrentPasswordValidator = () => {
  return [
    body("oldPassword").notEmpty().withMessage("Old Password is required "),
    body("newPassword").notEmpty().withMessage("New password is required"),
  ];
};

const userForgetPasswordValidator = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("Email is required ....")
      .isEmail()
      .withMessage("Email is invalid"),
  ];
};

const userResetForgotPasswordValidator = () => {
  return [body("password").notEmpty().withMessage("Password is required ")];
};

const createProjectValidator = () => {
  return [
    body("name").notEmpty().withMessage("Name is required"),
    body("description").optional(),
  ];
};

const addMembersToProjectValidators = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
    body("role")
      .notEmpty()
      .withMessage("role is required")
      .isIn(AvailableUserRole)
      .withMessage("Role is invalid ..."),
  ];
};
export {
  userRegisterValidator,
  userLoginValidator,
  userResetForgotPasswordValidator,
  userForgetPasswordValidator,
  userChangeCurrentPasswordValidator,
  createProjectValidator,
  addMembersToProjectValidators,
};
