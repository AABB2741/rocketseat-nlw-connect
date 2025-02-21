import type { FastifyInstance } from "fastify";
import type {
  FastifyPluginAsyncZod,
  ZodTypeProvider,
} from "fastify-type-provider-zod";

import { getRanking } from "@/functions/get-ranking";
import z from "zod";

export const getRankingRoute: FastifyPluginAsyncZod = async (
  app: FastifyInstance
) => {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/ranking",
    {
      schema: {
        summary: "Get ranking",
        tags: ["referral"],
        operationId: "getRanking",
        response: {
          200: z.object({
            ranking: z.array(
              z.object({
                id: z.string(),
                name: z.string(),
                score: z.number(),
              })
            ),
          }),
        },
      },
    },
    async request => {
      const { rankingWithScore } = await getRanking();

      return { ranking: rankingWithScore };
    }
  );
};
