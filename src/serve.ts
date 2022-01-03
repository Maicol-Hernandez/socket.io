import * as express from "express";
import { Server } from "socket.io";
import { createServer } from 'http'

const app = express()
const httpServer = createServer(app)

/**
 * Tipos para el servidor # 
 * Primero, declare algunos tipos:
 */

interface ServerToClientEvents {
    noArg: (data: any) => any;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
    location: (data: any) => void
    puntos: (data: any) => void

}

interface ClientToServerEvents {
    hello: () => void;
    location: ({ data }: any) => void
    puntos: (data: any) => void
}

interface InterServerEvents {
    ping: () => void;
}

interface SocketData {
    name: string;
    age: number;
}

/**
 * Y utilícelos al crear su servidor
 * Se configura los cors
 */
const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(httpServer, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    },
});

/**
 * run serve || en el puerto que se defina
 */
const PORT = process.env.PORT || 3000
httpServer.listen(PORT, () => {
    console.log(`server listening at http://localhost:${PORT}`);
})

export default io