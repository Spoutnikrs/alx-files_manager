import { MongoClient } from "mongodb"

const HOST = process.env.DB_HOST || "localhost"
const PORT = process.env.DB_PORT || 27017
const DB_DATABASE = process.env.DB_DATABASE || "files_manager"
const url = `mongodb://${HOST}:${PORT}`;

class DBClient {
    constructor() {
        this.client = new MongoClient.connect(url, {useUnifiedTopology: true})
        this.client.then((client) => {
            this.client = client
            this.db = this.client.db(`${DB_DATABASE}`)
        }).catch((error) => {
            console.log(error)
        })
    }

    isAlive() {
        return this.client.isConnected()
    }

    async nbUsers() {
        const users = this.db.collection('users')
        return await users.countDocuments()
    }

    async nbFiles() {
        const files = this.db.collection('files')
        return await files.countDocuments()
    }

}

const dbClient = new DBClient()
module.exports = dbClient