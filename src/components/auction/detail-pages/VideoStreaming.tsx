import { useEffect, useState } from "react";
import {
    Call,
    StreamCall,
    StreamTheme,
    StreamVideo,
    StreamVideoClient,
    useCallStateHooks,
    ParticipantView
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { createStream, getStreamByLotId } from "../../Services/Methods";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

const apiKey = process.env.REACT_APP_STREAM_API_KEY as string;
const user_id = uuidv4();
const user = { id: user_id, name: "admin" };

export default function AdminVideoStream({ lotId }: { lotId: string }) {
    const [client, setClient] = useState<StreamVideoClient | null>(null);
    const [call, setCall] = useState<Call | null>(null);
    const [liveLotInfo, setLiveLotInfo] = useState<any>(null);
    const [token, setToken] = useState<string | null>(null);
    const [callId, setCallId] = useState<string | null>(null);

    const fetchLiveStream = async () => {
        try {
            const response = await getStreamByLotId(lotId);
            if (response.data.length) {
                const latestLiveStream = response.data[response.data.length - 1];
                setLiveLotInfo(latestLiveStream);
                setCallId(latestLiveStream.CallId);
                setToken(latestLiveStream.Token);
            } else {
                setLiveLotInfo(null);
                setCallId(null);
                setToken(null);
            }
        } catch (error) {
            console.error("Error fetching live stream:", error);
        }
    };

    const generateToken = async () => {
        try {
            const newCallId = uuidv4(); // Generate new callId only if needed
            const payload = { userId: user_id, callId: newCallId, lotID: lotId };
            console.log(payload);
            const response = await axios.post("http://16.170.106.236:8181/initialize-stream", payload, {
                headers: { 'Content-Type': 'application/json' }
            });
            console.log("success generating token:", response.data.token);



            if (response.data?.token) {
                console.log("Generated Token:", response.data.Token);
                setToken(response.data.token);
                setCallId(newCallId);
                return { token: response.data.token, callId: newCallId };
            } else {
                console.log("Token generation failed: Invalid response structure");
                return null;
            }
        } catch (error: any) {
            console.log("Error generating token:", error.response);
            return null;
        }
    };

    useEffect(() => {
        if (lotId) fetchLiveStream();
    }, [lotId]);

    useEffect(() => {
        if (!lotId) return;

        const setupClient = async () => {
            let newToken = token;
            let newCallId = callId;

            if (!liveLotInfo) {
                const generated = await generateToken();
                if (!generated) return;
                newToken = generated.token;
                newCallId = generated.callId;
                console.log("userid live stream ==", user_id);
                await createStream({ LotId: lotId, Token: newToken, CallId: newCallId, UserId: user_id });
            }

            if (!newToken || !newCallId) return; // Ensure both values exist

            const myClient = new StreamVideoClient({ apiKey, user, token: newToken });
            setClient(myClient);
            setCallId(newCallId);

            return () => {
                myClient.disconnectUser();
                setClient(null);
            };
        };

        setupClient();
    }, [lotId, liveLotInfo]);

    useEffect(() => {
        if (!client || !callId) return;

        const myCall = client.call("default", callId);
        myCall.join({ create: !liveLotInfo }) // Create call only if no previous record
            .catch(err => console.error("Failed to join the call", err));

        // alert("JOIN CALL: " + !liveLotInfo + callId)
        setCall(myCall);

        return () => {
            myCall.leave().catch(err => console.error("Failed to leave the call", err));
            setCall(null);
        };
    }, [client, callId]);

    if (!client || !call) return <h1>No Video Exist</h1>;

    return (
        <StreamVideo client={client}>
            <StreamTheme className="my-theme-overrides">
                <StreamCall call={call}>
                    <VideoLayout />
                </StreamCall>
            </StreamTheme>
        </StreamVideo>
    );
}

const VideoLayout = () => {
    const { useLocalParticipant } = useCallStateHooks();
    const localParticipant = useLocalParticipant();

    return (
        <div className="admin-layout">
            {localParticipant && <ParticipantView participant={localParticipant} />}
            <style>{`.str-video__call-controls__button {display: none !important;} .str-video__participant-details__name {color:white !important}`}</style>

        </div>
    );
};
