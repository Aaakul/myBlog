import mysql from "mysql";

const db  = mysql.createConnection({    // In Node.js's default password authentication scheme is 'mysql_native_password'.                                 
    host: "localhost",                  // However for MySQL 8.0, it's 'caching_sha2_password'. Modification is neccesary.    
    user: "root",                       // Try "Mysql>alter user 'root'@'localhost' identified with mysql_native_password by 'YOURPASSWORD';"
    password: "root",
    database: "blog"
});

export default db;