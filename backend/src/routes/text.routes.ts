import { FastifyInstance,} from "fastify";
import { getTexts } from "../lib/text.controller.js";

export const textRoutes = (fastify: FastifyInstance) => {
fastify.get("/texts", async () => {
    return await getTexts();
});
};
