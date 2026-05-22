import prisma from "../lib/prisma";

class UserDal {
  async create(ipRaw: string, ipHash: string) {
    const user = await prisma.user.create({
      data: {
        ipRaw: ipRaw,
        ipHash: ipHash
      }
    })
    
    return user;
  }

  async get(userId: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })
    
    return user;
  }
}

export default UserDal;
