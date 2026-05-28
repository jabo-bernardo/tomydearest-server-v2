import prisma from "../lib/prisma";

class SubmissionDAL {
  async create(submissionType: string, title: string, content: string, tags: string) {
    const submission = await prisma.submission.create({
      data: {
        submissionType,
        title,
        content,
      }
    })
  }
}

export default SubmissionDAL;