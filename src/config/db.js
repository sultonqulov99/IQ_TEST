import Pool from "pg";

const pool = new Pool.Pool({
    user: 'mvupcjjs',
    password: 'YZeyieTqA-2FiAQWjawwyTNwni4RAPBn',
    database: 'mvupcjjs',
    host: 'arjuna.db.elephantsql.com',
    port: 5432
})

    // user: 'mvupcjjs',
    // password: 'YZeyieTqA-2FiAQWjawwyTNwni4RAPBn',
    // database: 'mvupcjjs',
    // host: 'arjuna.db.elephantsql.com',
    // port: 5432
    // user: 'postgres',
    // password: 'benazir99',
    // database: 'game_school',
    // host: 'localhost',
    // port: 5432

export default pool