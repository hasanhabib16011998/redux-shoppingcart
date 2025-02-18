import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedIn } from "../features/auth/authSlice";

function useAuthCheck() {
    const dispatch = useDispatch();
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        const localAuth = localStorage?.getItem("auth");
        if (localAuth) {
            const auth = JSON.parse(localAuth);
            if (auth?.accessToken && auth?.user) {
                dispatch(userLoggedIn({
                    accessToken: auth.accessToken,
                    user: auth.user,
                }));
            }
        }
        setAuthChecked(true);
    }, [dispatch]);  // ✅ Removed `authChecked` from dependencies

    return authChecked;
}

export default useAuthCheck;
