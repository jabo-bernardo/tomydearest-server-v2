import { Context } from "hono";
import { getConnInfo } from "hono/bun";
import { verifyJwtToken } from "../utils/jwt";
import hashString from "../utils/hash";
import { UNAUTHORIZED_RESPONSE } from "../utils/responses";

export const authenticationMiddleware = async (c: Context, next: () => Promise<void>) => {
  const token = c.req.header("Authorization")?.split(" ")[1];
  const ipAddress = getConnInfo(c).remote.address;

  if (!ipAddress) {
    return c.json(UNAUTHORIZED_RESPONSE, 401);
  }

  const hashedIpAddress = hashString(ipAddress);
  
  if (!token) {
    return c.json(UNAUTHORIZED_RESPONSE, 401);
  }

  try {
    const verifiedToken: any = verifyJwtToken(token);

    if (!verifiedToken) {
      return c.json(UNAUTHORIZED_RESPONSE, 401);
    }

    if (!verifiedToken?.ipAddress || !verifiedToken.userId) {
      return c.json(UNAUTHORIZED_RESPONSE, 401);
    }

    if (verifiedToken.ipAddress !== hashedIpAddress) {
      return c.json(UNAUTHORIZED_RESPONSE, 401);
    }

    c.set("userId", verifiedToken.userId);

    await next();
  } catch (error) {
    console.error(error);
    return c.json(UNAUTHORIZED_RESPONSE, 401);
  }

  
}