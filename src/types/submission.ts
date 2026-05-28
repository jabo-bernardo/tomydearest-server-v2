import z from "zod";

export const submissionTypeSchema = z.enum(["DEDICATION_MESSAGE", "RANT"]);

export const createSubmissionSchema = z.object({
  submissionType: z.enum(["DEDICATION_MESSAGE", "RANT"]),
  title: z.string(),
  content: z.string(),
  tags: z.array(z.string()).default([]).optional(),
});