import { Context } from "hono";
import { createSubmissionSchema } from "../types/submission";
import submissionService from "../services/submission";

class SubmissionController {
  async createSubmission(c: Context) {
    const requestBody = c.req.valid("json");
    const { submissionType, title, content, tags } = requestBody;

    submissionService.create(submissionType, title, content, tags)
    return c.json({ message: "Submission created successfully" }, 201);
  }
}

const submissionController = new SubmissionController();
export default submissionController;

