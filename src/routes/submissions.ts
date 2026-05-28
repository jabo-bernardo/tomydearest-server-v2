import { Hono } from "hono";
import submissionController from "../controllers/submission";
import { createSubmissionValidator } from "../validators/submission";

const submissionsRoute = new Hono();

submissionsRoute.post("/", createSubmissionValidator, submissionController.createSubmission);

export default submissionsRoute;
