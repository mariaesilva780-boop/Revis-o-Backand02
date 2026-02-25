
import mysql from "mysql2/promise";

export const conexao = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "escola",
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});