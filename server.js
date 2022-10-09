const http = require("http");
require("dotenv").config();

const { createApp } = require("./app");
const { AppDataSource } = require("./src/models/datasource");

const startServer = async () => {
    const app = createApp();

    app.get("/ping", (req, res) => {
        res.json({ message: "pong" });
    });

    const server = http.createServer(app);
    const PORT = process.env.PORT;

    await AppDataSource.initialize()
        .then(() => {
            console.log("Data Source has been initialized");
        })
        .catch((err) => {
            console.error("Error during Data Source initialization", err);
            database.destroy()
        })

    server.listen(PORT, () => {
        console.log(`Listening on Port ${PORT}`);
    });
}

startServer();