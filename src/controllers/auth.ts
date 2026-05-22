import { Context } from "hono";
import hashString from "../utils/hash";
import UserDal from "../dal/user_dal";
import { getConnInfo } from "hono/bun";
import { generateJwtToken } from "../utils/jwt";
import { UNAUTHORIZED_RESPONSE } from "../utils/responses";

// TODO: Implement rate limiting on authentication
// TODO: Cron job to remove inactive user records
class AuthController {
  async authenticateUser(c: Context) {
    const connInfo = getConnInfo(c);
    const ipAddress = connInfo.remote.address;

    if (!ipAddress) {
      throw new Error("IP address not found");
    }
    
    const hashedIpAddress = hashString(ipAddress);

    const userDal = new UserDal();

    const user = await userDal.create(ipAddress, hashedIpAddress)

    const jwtToken = generateJwtToken({ userId: user.id, ipAddress: hashedIpAddress })
    
    return c.json({ token: jwtToken })
  }

  async me(c: Context) {
    const userId = c.get("userId");
    
    const userDal = new UserDal();
    const user = await userDal.get(userId);

    if (!user) {
      return c.json(UNAUTHORIZED_RESPONSE, 401);
    }
    
    return c.json(user);
  }
}

export default AuthController;
