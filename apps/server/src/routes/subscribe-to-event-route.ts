import type { FastifyInstance } from "fastify";
import type {
  FastifyPluginAsyncZod,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import z from "zod";

import { subscribeToEvent } from "@/functions/subscribe-to-event";

export const subscribeToEventRoute: FastifyPluginAsyncZod = async (
  app: FastifyInstance
) => {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/subscriptions",
    {
      schema: {
        summary: "Subscribes someone to the event",
        tags: ["subscription"],
        body: z.object({
          name: z.string().trim().min(2),
          email: z.string().trim().toLowerCase().email(),
        }),
        response: {
          201: z.object({
            subscriberId: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, email } = request.body;

      const { subscriberId } = await subscribeToEvent({ name, email });

      return reply.status(201).send({
        subscriberId,
      });
    }
  );
};
