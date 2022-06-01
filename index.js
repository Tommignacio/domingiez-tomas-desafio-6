const express = require("express");
const app = express();
const { Server: ioServer } = require("socket.io");
const http = require("http");
const morgan = require("morgan");
const routes = require("./routes/index-routes.js");


//clase con metdodos para los productos
// const products = require("./container.js");

//creo servidores
const httpServer = http.createServer(app); //creo servidor http
const io = new ioServer(httpServer); //creo servidor io Websocket

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(__dirname + "/public")); //dirname sirve para que si abro desde otro directoro, siempre encontrara la carpeta publica
app.use(express.urlencoded({ extended: true })); //sirve para leer los datos enviados por html formulario

//config plantilla
app.set("views", "public/views"); //nombre de la carpeta, ruta donde esta
app.set("view engine", "ejs");

//Rutas
app.use("/", routes);

//array de mensajes
const messages = []

//servidor socket para chat
io.on("connection", (socket) => {
	console.log("servidor conectado")
	console.log(socket.id)
	socket.on("newMessage", (objMessage) => {
		console.log(objMessage)
		messages.push(objMessage)
	})
	socket.emit("messages", messages)

})



//empezando servidor
const PORT = 8080;
const server = app.listen(PORT, () =>
	console.log(`servidor escuchando en el puerto ${PORT}`)
);
server.on("error", () => {
	console.log(`error en el puerto ${PORT}`);
});

