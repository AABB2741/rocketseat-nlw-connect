import type { FastifyInstance } from "fastify";
import type {
  FastifyPluginAsyncZod,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import z from "zod";

import { getSubscriberInviteClicks } from "@/functions/get-subscriber-invite-clicks";

export const getSubscriberInviteClicksRoute: FastifyPluginAsyncZod = async (
  app: FastifyInstance
) => {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/subscribers/:subscriberId/ranking/clicks",
    {
      schema: {
        summary: "Get subscriber invite clicks count",
        tags: ["referral"],
        operationId: "getSubscriberInviteClicks",
        params: z.object({
          subscriberId: z.string(),
        }),
        response: {
          200: z.object({
            count: z.number(),
          }),
        },
      },
    },
    async request => {
      const { subscriberId } = request.params;

      const { count } = await getSubscriberInviteClicks({ subscriberId });

      return { count };
    }
  );
};
