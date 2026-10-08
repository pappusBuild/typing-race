import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import fs from "fs";
import path from "path";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
    const filePath = path.join(process.cwd(), "data/texts.json");

    const file = fs.readFileSync(filePath, "utf-8");
    const texts = JSON.parse(file);

    await prisma.text.deleteMany();

    await prisma.text.createMany({
    data: texts.map((text: { content: string }) => ({
        content: text.content,
    })),
    });

    console.log(`Berhasil memasukkan ${texts.length} teks.`);
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());