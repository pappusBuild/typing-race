import { FastifyInstance,} from "fastify";
import { getRandomText } from "../controllers/text.controller.js";

export const textRoutes = (fastify: FastifyInstance) => {
fastify.get("/texts/random", async () => {
    return await getRandomText();
});
};
