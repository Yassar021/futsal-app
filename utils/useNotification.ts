import { useEffect, useState } from "react";
import { getUnreadNotification } from "../services/API/notification";
import { useSelector } from "react-redux";
import { useAppSelector } from "../store/hooks";
import { AccountType, TeamInfo } from "../types/user";

const useNotification = () => {
    const [hasNotification,setHasNotification] = useState(false);
    const [isFetching,setFetching] = useState(false);

    const team: TeamInfo | null = useAppSelector((state) => {
        if (state.account.userInfo?.type === AccountType.TEAM) {
            return state.account.userInfo.data
        }
        return null 
    })

    const fetchNotification = async () => {
        if (isFetching) {
            return;
        }

        if (team) {
            setFetching(true)
            await getUnreadNotification(team.id.toString())
            .then(res => {
                setHasNotification(res.length > 0)
            })
            setFetching(false)
            setTimeout(fetchNotification,6000)
        }
    }

    useEffect(() => {
        fetchNotification()
    });

    return {
        hasNotification
    }
}

export default useNotification;