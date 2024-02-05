import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";
export async function memoriesRoutes(app: FastifyInstance) {
  app.get("/memories", async () => {
    const memories = await prisma.memory.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
    return memories;
  });

  app.get("/memories/:id", async (req) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramsSchema.parse(req.params);

    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    });
    return memory;
  });

  app.post("/memories", async (req) => {
    const bodySchema = z.object({
      balance: z.number(),
    });

    const { balance } = bodySchema.parse(req.body);

    const memory = await prisma.memory.create({
      data: {
        balance,
        userId: "a73fdc12-696b-405b-907c-72429e56b7c8",
      },
    });
    return memory;
  });

  app.put("/memories/:id", async () => {});

  app.delete("/memories/:id", async () => {});
}
