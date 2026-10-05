import Fastify, { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import sql from './lib/db.js'

const fastify: FastifyInstance = Fastify({
logger: true
})

// Route utama + cek koneksi database
fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
try {
// Test query sederhana ke database
const result = await sql`SELECT NOW() as current_time`
return { 
    message: 'Backend Fastify + TypeScript + Postgres murni aktif! 🚀',
    db_time: result[0].current_time 
}
} catch (err) {
reply.status(500)
return { error: 'Gagal konek ke database', details: err }
}
})

const start = async () => {
try {
await fastify.listen({ port: 3000 })
console.log('Server berjalan di http://localhost:3000')
} catch (err) {
fastify.log.error(err)
process.exit(1)
}
}

start()