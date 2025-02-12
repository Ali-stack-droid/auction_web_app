import { useState, useEffect, useCallback } from "react";

const useWebSocket = (url: string) => {

    const [ws, setWs] = useState<WebSocket | null>(null);

    useEffect(() => {
        const socket = new WebSocket(url);
        setWs(socket);

        socket.onmessage = (event) => {
            const msg = event.data;
        };

        return () => socket.close();
    }, [url]);

    const sendMessage = useCallback((message: string, room: string) => {
        if (ws && message.trim() && room) {
            ws.send(`MESSAGE|${room}|${message}`);
        }
    }, [ws]);

    const setUser = useCallback((userName: string) => {
        if (ws && userName) {
            ws.send(`SETNAME|${userName}`);
        }
    }, [ws]);

    const createRoom = useCallback((roomName: string) => {
        if (ws && roomName) {
            ws.send(`CREATE|${roomName}`);
        }
    }, [ws]);

    const joinRoom = useCallback((roomName: string) => {
        if (ws && roomName) {
            ws.send(`JOIN|${roomName}`);
        }
    }, [ws]);

    const leaveRoom = useCallback((roomName: string) => {
        if (ws && roomName) {
            ws.send(`LEAVE|${roomName}`);
        }
    }, [ws]);

    const deleteRoom = useCallback((roomName: string) => {
        if (ws && roomName) {
            ws.send(`DELETE|${roomName}`);
        }
    }, [ws]);

    return {
        sendMessage,
        setUser,
        createRoom,
        joinRoom,
        leaveRoom,
        deleteRoom,
    };
};

export default useWebSocket;