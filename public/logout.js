function Logout(props) {
    function handleLogout(){
        console.log("Logging out...");
        props.setLoginEmail(''); //Set the logged in email as nothing
        if(props.popup)          //If it was logged in with OAuth then signOut
            firebase.auth().signOut();
        props.setLoginPopup(false); //If it was logged in with OAuth then reset loginPopup
        window.location.href = "#/CreateAccount";
        props.setBalance(0);
    }

    return (
        <>
            <button type="submit" 
                    className="btn btn-dark" 
                    onClick={handleLogout}>
                Log Out
            </button>
        </>
    );
}