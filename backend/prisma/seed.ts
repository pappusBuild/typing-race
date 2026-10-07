import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg} from '@prisma/adapter-pg'
import texts from '../data/texts.json'

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
})

const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({ adapter })

async function main() {
    await prisma.text.createMany({
    data: texts,
    })

    console.log(`Berhasil memasukkan ${texts.length} paragraf.`)
}

main()
    .catch((error) => {
    console.error(error)
    })
    .finally(async () => {
    await prisma.$disconnect()
    })