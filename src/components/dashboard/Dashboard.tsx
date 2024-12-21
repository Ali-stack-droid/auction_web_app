import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";

const Dashboard = () => {
    const { user } = useSelector((state: RootState) => state.user);
    return (

        <h1>{JSON.stringify(user, null, 2)}</h1>
    )
}

export default Dashboard