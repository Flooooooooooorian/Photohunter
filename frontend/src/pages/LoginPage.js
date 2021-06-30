export default function LoginPage() {

    const parameter = {
        scope: "https%3A//www.googleapis.com/auth/userinfo.profile",
        access_type: "offline",
        response_type: "code",
        state: "state_parameter_passthrough_value",
        redirect_uri: "http%3A//localhost%3A3000/auth/google/redirect",
        client_id: "420356622210-a9lk1sicvrs5hojneedf4273i8cg10lo.apps.googleusercontent.com",
    }

    const url = `https://accounts.google.com/o/oauth2/v2/auth?scope=${parameter.scope}&access_typ=${parameter.access_type}&response_type=${parameter.response_type}&state=${parameter.state}&redirect_uri=${parameter.redirect_uri}&client_id=${parameter.client_id}`

    return (<a href={url}>
            <button>
                Login
            </button>
        </a>
    )
}
