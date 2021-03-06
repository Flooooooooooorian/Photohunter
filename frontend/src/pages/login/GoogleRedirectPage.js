import {useLocation} from "react-router-dom";
import {useContext, useEffect} from "react";
import AuthContext from "../../context/AuthContext";

export default function GoogleRedirectPage() {

    const query = new URLSearchParams(useLocation().search)
    const code = query.get("code");

    const {loginWithGoogleCode} = useContext(AuthContext);

    useEffect(() => {
        console.log(code)
        loginWithGoogleCode(code)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[code])

    return <div>
        Processing Google login.....
    </div>
}
