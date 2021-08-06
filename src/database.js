const mysql=require("mysql2")
const {database}=require("./keys")
const {promisify}=require("util")

const pool=mysql.createPool(database)

pool.getConnection((err,connection)=>{
    if(err){
        if(err.code==="PROTOCOL_CONNECTION_LOST"){
            console.error("DATABASE CONNECTION WAS CLASED")
        }
        if (err.code==="ER_CON_COUNT_ERROR"){
            console.error("DATABASE HAS TOO MANY CONNECTIONS")
        }
        if (err.code ==="ECONNREFUSED") {
            console.error("DATABASE CONNECTION WAS REFUSED");
        }
    }
    if (connection) connection.release()
    console.log("DB is Connected");
    return;
})
//modulo no soporta promesas por eso hay que convertir callback a promesas util
//promisify pool queries convertiendo a promesa lo que antes era callback
pool.query=promisify(pool.query)
module.exports = pool

