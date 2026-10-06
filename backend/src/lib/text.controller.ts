import prisma from "../lib/db.js"

export const getTexts = async () => {
    const texts = await prisma.text.findMany();
    return texts;
}