export default function AdminUserItem({user}) {
    return (
        <div>
            <div>{user.email}</div>
            <div>{user.full_name}</div>
        </div>
    )
}
