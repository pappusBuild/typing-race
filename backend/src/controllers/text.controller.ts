import prisma from "../lib/db.js"

export const getRandomText = async () => {
    const texts = await prisma.text.findMany({
        select: {
            text_id: true,
            content: true
        },
    });

if (texts.length === 0) {
        throw new Error("No texts found in the database.");
    }

const randomIndex = Math.floor(Math.random() * texts.length);

return texts[randomIndex];
};