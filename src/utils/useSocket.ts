import { useState, useEffect, useCallback } from "react";

const useWebSocket = () => {
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [messageHandler, setMessageHandler] = useState<(message: string) => void>(() => { });
    const [isConnected, setIsConnected] = useState(false); // Track connection status

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8181");

        socket.onopen = () => {
            console.log("WebSocket connection established.");
            setWs(socket);
        };

        socket.onmessage = (event) => {
            if (messageHandler) {
                messageHandler(event.data);
            }
        };

        // socket.onclose = () => {
        //     console.log("WebSocket connection closed.");
        //     setWs(null);
        // };

        // socket.onerror = (error) => {
        //     console.error("WebSocket error:", error);
        // };

        return () => {
            socket.close();
        };
    }, [messageHandler]);

    const sendMessage = useCallback((roomName: string, message: string, lotID?: number, clientId?: number, amount?: number) => {
        if (ws && isConnected) { // Check if WebSocket is connected
            const data = {
                event: "sendMessageToRoom",
                roomName,
                message,
                lotID,
                clientId,
                amount,
            };
            ws.send(JSON.stringify(data));
        } else {
            console.error("WebSocket is not connected.");
        }
    }, [ws]);

    const setUser = useCallback((userName: string) => {
        if (ws && isConnected) { // Check if WebSocket is connected
            const data = {
                event: "setUserName",
                userName,
            };
            ws.send(JSON.stringify(data));
        } else {
            console.error("WebSocket is not connected.");
        }
    }, [ws]);

    const createRoom = useCallback((roomName: string) => {
        if (ws && isConnected) { // Check if WebSocket is connected
            const data = {
                event: "createRoom",
                roomName,
            };
            ws.send(JSON.stringify(data));
        } else {
            console.error("WebSocket is not connected.");
        }
    }, [ws]);

    const joinRoom = useCallback((roomName: string) => {
        if (ws && isConnected) { // Check if WebSocket is connected
            const data = {
                event: "joinRoom",
                roomName,
            };
            ws.send(JSON.stringify(data));
        } else {
            console.error("WebSocket is not connected.");
        }
    }, [ws]);

    const leaveRoom = useCallback((roomName: string) => {
        if (ws && isConnected) { // Check if WebSocket is connected
            const data = {
                event: "leaveRoom",
                roomName,
            };
            ws.send(JSON.stringify(data));
        } else {
            console.error("WebSocket is not connected.");
        }
    }, [ws]);

    const deleteRoom = useCallback((roomName: string) => {
        if (ws && isConnected) { // Check if WebSocket is connected
            const data = {
                event: "deleteRoom",
                roomName,
            };
            ws.send(JSON.stringify(data));
        } else {
            console.error("WebSocket is not connected.");
        }
    }, [ws]);

    const onMessage = useCallback((handler: (message: string) => void) => {
        setMessageHandler(() => handler);
    }, []);

    return {
        ws,
        isConnected,
        sendMessage,
        setUser,
        createRoom,
        joinRoom,
        leaveRoom,
        deleteRoom,
        onMessage,
    };
};

export default useWebSocket;


// import { useState, useEffect, useCallback } from "react";

// const useWebSocket = () => {
//     const [ws, setWs] = useState<WebSocket | null>(null);
//     const [isConnected, setIsConnected] = useState(false); // Track connection status
//     const [messageHandler, setMessageHandler] = useState<(message: string) => void>(() => {});

//     useEffect(() => {
//         const socket = new WebSocket("ws://localhost:8181");

//         socket.onopen = () => {
//             console.log("WebSocket connection established.");
//             setWs(socket);
//             setIsConnected(true); // Set connection status to true
//         };

//         socket.onmessage = (event) => {
//             if (messageHandler) {
//                 messageHandler(event.data);
//             }
//         };

//         socket.onclose = () => {
//             console.log("WebSocket connection closed.");
//             setWs(null);
//             setIsConnected(false); // Set connection status to false
//         };

//         socket.onerror = (error) => {
//             console.error("WebSocket error:", error);
//             setIsConnected(false); // Set connection status to false on error
//         };

//         return () => {
//             socket.close(); // Cleanup on component unmount
//         };
//     }, [messageHandler]);

//     const sendMessage = useCallback((roomName: string, message: string, lotID?: number, clientId?: number, amount?: number) => {
//         if (ws && isConnected) { // Check if WebSocket is connected
//             const data = {
//                 event: "sendMessageToRoom",
//                 roomName,
//                 message,
//                 lotID,
//                 clientId,
//                 amount,
//             };
//             ws.send(JSON.stringify(data));
//         } else {
//             console.error("WebSocket is not connected.");
//         }
//     }, [ws, isConnected]);

//     const setUser = useCallback((userName: string) => {
//         if (ws && isConnected) { // Check if WebSocket is connected
//             const data = {
//                 event: "setUserName",
//                 userName,
//             };
//             ws.send(JSON.stringify(data));
//         } else {
//             console.error("WebSocket is not connected.");
//         }
//     }, [ws, isConnected]);

//     const createRoom = useCallback((roomName: string) => {
//         if (ws && isConnected) { // Check if WebSocket is connected
//             const data = {
//                 event: "createRoom",
//                 roomName,
//             };
//             ws.send(JSON.stringify(data));
//         } else {
//             console.error("WebSocket is not connected.");
//         }
//     }, [ws, isConnected]);

//     const joinRoom = useCallback((roomName: string) => {
//         if (ws && isConnected) { // Check if WebSocket is connected
//             const data = {
//                 event: "joinRoom",
//                 roomName,
//             };
//             ws.send(JSON.stringify(data));
//         } else {
//             console.error("WebSocket is not connected.");
//         }
//     }, [ws, isConnected]);

//     const leaveRoom = useCallback((roomName: string) => {
//         if (ws && isConnected) { // Check if WebSocket is connected
//             const data = {
//                 event: "leaveRoom",
//                 roomName,
//             };
//             ws.send(JSON.stringify(data));
//         } else {
//             console.error("WebSocket is not connected.");
//         }
//     }, [ws, isConnected]);

//     const deleteRoom = useCallback((roomName: string) => {
//         if (ws && isConnected) { // Check if WebSocket is connected
//             const data = {
//                 event: "deleteRoom",
//                 roomName,
//             };
//             ws.send(JSON.stringify(data));
//         } else {
//             console.error("WebSocket is not connected.");
//         }
//     }, [ws, isConnected]);

//     const onMessage = useCallback((handler: (message: string) => void) => {
//         setMessageHandler(() => handler);
//     }, []);

//     return {
//         ws,
//         isConnected, // Expose connection status
//         sendMessage,
//         setUser,
//         createRoom,
//         joinRoom,
//         leaveRoom,
//         deleteRoom,
//         onMessage,
//     };
// };

// export default useWebSocket;