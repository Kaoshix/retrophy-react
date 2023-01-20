function AdminDashboard(props) {
    console.log(props)
    return (
        <div>
            {props.isLoggedIn ?
                <div>Vous êtes admin et authorisé à être ici</div>
                :
                <div>Vous n'êtes pas admin et donc pas authorisé à être ici</div>
            }

        </div>
    )
}

export default AdminDashboard;