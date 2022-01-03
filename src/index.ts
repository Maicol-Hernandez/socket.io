import io from './serve'

/**
 * ServerToClientEvents
 *  Los eventos declarados en la ServerToClientEvents interfaz se
 * utilizan al enviar y difundir eventos:

 */

io.on('connection', (socket: any) => {

    // socket.emit("noArg");
    socket.emit("basicEmit", 1, "2", Buffer.from([+25]));
    socket.emit("withAck", "4", (e: any) => {
        // e is inferred as number

        console.log('withAck :>> ', e);
    });

    // socket.emit('puntos', (puntos: any) => {
    //     console.log('puntos :>> ', puntos);
    // })

    // works when broadcast to all

    // socket.emit("noArg");

    // works when broadcasting to a room
    socket.to("room1").emit("basicEmit", 1, "2", Buffer.from([3]));

    socket.on("ping", () => {
        // ...
    });

    console.log('New socket id :>> ', socket.id);
    console.log('New socket connected :>> ', socket.connected);
    console.log('New socket disconnected :>> ', socket.disconnected);


})

/**
 *  ClientToServerEvents y InterServerEvents
 *  Los declarados en la ClientToServerEvents interfaz se utilizan
 * al recibir eventos:
 */



io.on("connection", (socket) => {
    socket.on("hello", (content: void) => {
        // ...
        console.log('data mensage :>> ' + content);
        socket.emit("noArg", content)


    });

    socket.on('puntos', (content: any) => {
        console.log('content :>> ', content);
        socket.broadcast.emit('puntos', content)

    })

    socket.on("location", ({ location }: any) => {
        // console.log('location in live :>> ', location);
        socket.broadcast.emit("location", {
            location,
            from: socket.id
        })
        console.log('location in live :>> ', location);
    })


    socket.on("disconnect", (reason: any) => {
        console.log('User disconnected :>> ', reason.id);

    });
});

/**
 * InterServerEvents
 * Los declarados en la InterServerEventsinterfaz se utilizan para
 * la comunicación entre servidores (agregados socket.io@4.1.0):
 */

// io.serverSideEmit("ping");

io.on("ping", () => {
    // ...
});



/**
 * SocketData
 *  Y finalmente, el SocketData tipo se usa para escribir el socket
 * data atributo (agregado socket.io@4.4.0):
 */


io.on("connection", (socket) => {
    socket.data.name = "john";
    socket.data.age = 42;

    console.log('socket.data :>> ', socket.data);
});