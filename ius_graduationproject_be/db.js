import pg from "pg"

const Pool = pg.Pool

const pool = new Pool({
    user:"postgres",
    password:"postgres",
    database:"graduation",
    host:"localhost",
    port:5432
})

export default pool;