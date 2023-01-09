const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

// Handling Uncaught exceptions
process.on("uncaughException", (err) => {
	console.log(`Error: ${err.message}`);
	console.log(`Shutting dow the server due to Uncaught exceptions`);
	process.exit(1);
});

//config
dotenv.config({ path: "backend/config/config.env" });

//Connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
	console.log(
		`Servidor está funcionando em http://localhost:${process.env.PORT}`
	);
});




// Unhandled Promise rejection
process.on("unhandledRejection", (err) => {
	console.log(`Error:${err.message}`);
	console.log(`Shutting dow the server due to Unhandled Promise rejection`);
	server.close(() => {
		process.exit(1);
	});
});
