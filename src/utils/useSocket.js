import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = 'ws://localhost:8181';

const useSocket = () => {
    // const [token, setToken] = useState(null);
    useEffect(() => {
        const fetchToken = async () => {
            try {
                // const storedToken = await AsyncStorage.getItem('authToken');
                // console.log("storedToken-in-the-hook",storedToken)
                // if (storedToken) {
                //     setToken(storedToken);
                // }
            } catch (error) {
                console.error('Error retrieving token from AsyncStorage:', error);
            }
        };

        fetchToken();
    }, []); 
    
    const socket = io(SOCKET_URL, {
        
        // auth: {
        //     // token: `Bearer ${token}`,
        // },
    });

    const socketRef = useRef(socket);

    useEffect(() => {
        socketRef.current = socket;

        if (socketRef.current) {
            socket.on('connect', () => {
            
                console.log('Connected to socket server');
            });

            
            return () => {
                socket.off('connect');
            };
        }

        return () => {
            // Cleanup the socket connection when the component using the hook unmounts
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
            }
        };
    }, [token]);

    const onMessage = (callback) => {
        if (socketRef.current) {
            socketRef.current.on('', callback);

            // Cleanup listener when not needed
            return () => {
                socketRef.current.off('message', callback);
            };
        }
    };

    const emitEvent = async (event, data) => {

        if (socketRef.current) {
            // console.log("EMIT-FUNCTION ====>",event,JSON.stringify(data,null,4));
            //  const res=await 
            socketRef.current.emit(event, data);
            // console.log("FUNCTION ====>",res);
        }
    };

    const onEvent = (event, callback) => {
        if (socketRef.current) {
            socketRef.current.on(event, callback);

            // Cleanup listener when not needed
            return () => {
                socketRef.current.off(event, callback);
            };
        }
    };

    return {
        socket: socketRef.current,
        onMessage,
        emitEvent,
        onEvent,
    };
};

export default useSocket;
export const getSocket = () => {
    if (!socket) {
        throw new Error('Socket not initialized. Call initSocket(url) first.');
    }
    return socket;
};
