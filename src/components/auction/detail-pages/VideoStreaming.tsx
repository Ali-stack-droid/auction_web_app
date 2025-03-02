import { useEffect, useState } from "react";
import {
    Call,
    StreamCall,
    StreamTheme,
    StreamVideo,
    SpeakerLayout,
    StreamVideoClient,
    useCallStateHooks,
    ParticipantView
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";

const apiKey = "mmhfdzb5evj2";
const user_id = "admin-user"; // Unique admin user ID
const user = { id: user_id };
const callId = "static-call-id"; // Static call ID

const tokenProvider = async () => {
    const { token } = await fetch(
        "https://pronto.getstream.io/api/auth/create-token?" +
        new URLSearchParams({
            api_key: apiKey,
            user_id: user_id
        })
    ).then((res) => res.json());
    return token as string;
};

export default function AdminVideoStream() {
    const [client, setClient] = useState<StreamVideoClient>();
    const [call, setCall] = useState<Call>();

    useEffect(() => {
        const myClient = new StreamVideoClient({ apiKey, user, tokenProvider });
        setClient(myClient);

        return () => {
            myClient.disconnectUser();
            setClient(undefined);
        };
    }, []);

    useEffect(() => {
        if (!client) return;
        const myCall = client.call("default", callId);
        myCall.join({ create: true }).catch((err) => {
            console.error(`Failed to create the call`, err);
        });

        setCall(myCall);

        return () => {
            setCall(undefined);
            myCall.leave().catch((err) => {
                console.error(`Failed to leave the call`, err);
            });
        };
    }, [client]);

    if (!client || !call) return <h1>No Video Exist</h1>;

    return (
        <StreamVideo client={client}>
            <StreamTheme className="my-theme-overrides">
                <StreamCall call={call}>
                    <VideoLayout />
                </StreamCall>
            </StreamTheme>
        </StreamVideo >
    );
}

// Custom layout to show only admin video and connected user count
const VideoLayout = () => {
    const { useLocalParticipant, useParticipants } = useCallStateHooks();
    const localParticipant = useLocalParticipant();
    const participants = useParticipants();
    const participantsCount = participants.length - 1;
    console.log("participantsCount: ", participantsCount)
    return (
        <div className="admin-layout">
            {localParticipant && (
                <ParticipantView participant={localParticipant} />
            )}
        </div>
    );
};

