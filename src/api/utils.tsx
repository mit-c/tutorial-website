import axios, {AxiosResponse} from 'axios';
import { z } from 'zod';
// At the moment this does nothing
const BACKEND_BASE_PATH = process.env.REACT_APP_PICTIONARY_SERVER_BASE_PATH; 

const doEveryMs = (cb: (x: any[]) => void, duration: number) => {
    return setInterval(cb, duration)
};

const IdSchema = z.string().uuid();
const DrawingElement = z.object({
    x: z.number().nullable(),
    y: z.number().nullable()
});
const DrawingEventSchema = z.array(DrawingElement);
const MessageSchema = z.object({
    id: z.string().uuid(),
    message: z.string(),
    timestampUTC: z.number(),
})
const PlayerSchema = z.object({
    id: z.string().uuid(),
    messages: z.array(MessageSchema.optional()),
    isDrawer: z.boolean(),
})



type ID = z.infer<typeof IdSchema>;
type DrawingEvent = z.infer<typeof DrawingEventSchema>;
type Player = z.infer<typeof PlayerSchema>;
type IdCallback = ((res: ID) => void);
type DrawingEventCallback =((res: DrawingEvent) => void);
type PlayerCallback = ((res: Player) => void);


class DrawingRequestor {
    putDrawingEvent(roundId: string, body: DrawingEvent, thenCb: IdCallback) {
        axios.put(`${BACKEND_BASE_PATH}/game/${roundId}/drawing/event`, body)
        .then((res) => IdSchema.parse(res.data))    
        .then(thenCb);
    }
    
    getDrawingFlat(roundId: string, index: number = 0, thenCb: DrawingEventCallback) {
        console.log(index);
        axios.get(`${BACKEND_BASE_PATH}/game/${roundId}/drawing/event/all/flat`, {
            params: {
                index
            }
        })
            .then((res) => DrawingEventSchema.parse(res.data))
            .then(thenCb);
    }
}

class GameRequestor {
    putGame(thenCb: IdCallback) {
        axios.put(`${BACKEND_BASE_PATH}/game/new`)
            .then((res) => IdSchema.parse(res.data))
            .then(thenCb);
    }

    getRoundId(gameId: string, thenCb: IdCallback) {
        axios.get(`${BACKEND_BASE_PATH}/game/${gameId}/round`)
            .then((res) => IdSchema.parse(res.data))
            .then(thenCb);
    }
}

class LobbyRequestor {
    getLobbyId(gameId: string, thenCb: IdCallback) {
        axios.get(`${BACKEND_BASE_PATH}/game/lobby/${gameId}`)
            .then((res) => IdSchema.parse(res.data))
            .then(thenCb);
    }
    
    joinLobby(lobbyId: string, thenCb: PlayerCallback) {
        axios.put(`${BACKEND_BASE_PATH}/game/lobby/join/${lobbyId}`)
            .then((res) =>  PlayerSchema.parse(res.data))
            .then(thenCb);
    }
    
    putMessage(lobbyId: string, playerId: string) {
        
    }
    
    getAllMessages(lobbyId: string) {
        
    }
}
const REQUESTORS = {
    drawingRequestor: new DrawingRequestor(),
    lobbyRequestor: new LobbyRequestor(),
    gameRequestor: new GameRequestor()
} as const;
export {
    doEveryMs,
    BACKEND_BASE_PATH,
    REQUESTORS,
    type DrawingEvent,
    type DrawingElement,
    type Player
};