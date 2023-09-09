import Pool from "pg";

const pool = new Pool.Pool({
    user: 'postgres',
    password: 'benazir99',
    database: 'game_school',
    host: 'localhost',
    port: 5432
})

export default pool