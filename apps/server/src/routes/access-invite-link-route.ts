import type { FastifyInstance } from "fastify";
import type {
  FastifyPluginAsyncZod,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import z from "zod";

import { env } from "@/env";
import { accessInviteLink } from "@/functions/access-invite-link";

export const accessInviteLinkRoute: FastifyPluginAsyncZod = async (
  app: FastifyInstance
) => {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/invites/:subscriberId",
    {
      schema: {
        summary: "Access invite link and redirects user",
        operationId: "accessInviteLink",
        tags: ["referral"],
        params: z.object({
          subscriberId: z.string(),
        }),
        response: {
          302: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { subscriberId } = request.params;

      await accessInviteLink({ subscriberId });

      const redirectUrl = new URL(env.WEB_URL);
      redirectUrl.searchParams.set("referrer", subscriberId);

      return reply.redirect(redirectUrl.toString(), 302);
    }
  );
};
