import { createSubmissionSchema } from "../types/submission";
import { zValidator } from "../utils/validator-wrapper";

export const createSubmissionValidator = zValidator(
  "json",
  createSubmissionSchema
);