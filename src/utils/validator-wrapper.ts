import * as z from "zod";
import type { ValidationTargets } from "hono";
import { zValidator as zv } from "@hono/zod-validator";

export const zValidator = <
  T extends z.ZodSchema,
  Target extends keyof ValidationTargets,
>(
  target: Target,
  schema: T,
) =>
  zv(target, schema, (result, c) => {
    if (!result.success) {
      const rawJson = result.error.message;
      const isValidJson = (rawJson.startsWith('[') && rawJson.endsWith(']')) || (rawJson.startsWith('{') && rawJson.endsWith('}'));
      if (!isValidJson) {
        return c.json({ message: "Invalid request body" }, 400);
      }
      const parsedJson = JSON.parse(rawJson);
      if (parsedJson.length > 0) {
        const firstError = parsedJson[0];
        return c.json({ message: `${firstError.path.join('.')} - ${firstError.message.replaceAll(/"/g, "'")}`}, 400);
      }
      return c.json({ message: "Unrecognized error" }, 400);
    }
    return c.json(result.data);
  });
