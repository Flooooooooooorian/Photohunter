import {useContext} from "react";
import AuthContext from "../context/AuthContext";

export default function ProfilePage() {

    const context = useContext(AuthContext)
    console.log(context)
    return(
        <>
            <p>
                Profile
            </p>
            <p>
                {context.jwtDecoded.name}
            </p>
        </>
    )
}