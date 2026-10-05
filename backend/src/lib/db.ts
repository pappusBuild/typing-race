import postgres from 'postgres'

// Pastikan file .env nanti sudah ada variabel DATABASE_URL
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/typing_race'

const sql = postgres(connectionString)

export default sql