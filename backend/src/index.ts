import Fastify, {
FastifyInstance,
FastifyRequest,
FastifyReply,
} from "fastify";

import { textRoutes } from "./routes/text.routes.js";

const fastify: FastifyInstance = Fastify({
logger: true,
});

fastify.get(
"/",
async (_request: FastifyRequest, _reply: FastifyReply) => {
return {
    message: "Backend Fastify + TypeScript aktif!",
};
},
);

fastify.register(textRoutes);

const start = async () => {
try {
await fastify.listen({ port: 3000 });
console.log("Server berjalan di http://localhost:3000");
} catch (err) {
fastify.log.error(err);
process.exit(1);
}
};

start();
