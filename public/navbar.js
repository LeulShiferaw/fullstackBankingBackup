function NavBar(props){
  function styleLogin(){
    var styleRes = {
      display: "inline"
    };

    if(props.email === ''){ //If no one is logged in
      styleRes.display = "inline";
    }
    else styleRes.display = "none";

    return styleRes;
  }

  function styleLogout(){
    var styleRes = {
      display: "inline"
    };

    if(props.email === ''){ //If no one is logged in
      styleRes.display = "none";
    }
    else styleRes.display = "inline";

    return styleRes;
  }

  return(
    <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{position: "relative"}}>
      <a className="navbar-brand" href="#">BadBank</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item" style={styleLogin()}>
            <a className="nav-link" href="#/CreateAccount/">Create Account</a>
          </li>
          <li className="nav-item" style={styleLogin()}>
            <a className="nav-link" href="#/login/">Login</a>
          </li>
          <li className="nav-item" style={styleLogout()}>
            <a className="nav-link" href="#/deposit/">Deposit</a>
          </li>
          <li className="nav-item" style={styleLogout()}>
            <a className="nav-link" href="#/withdraw/">Withdraw</a>
          </li>
          <li className="nav-item" style={styleLogout()}>
            <a className="nav-link" href="#/balance/">Balance</a>
          </li>
          <li className="nav-item" style={styleLogout()}>
            <a className="nav-link" href="#/alldata/">AllData</a>
          </li>          
          <li className="nav-item" style={styleLogout()}>
            <a className="nav-link" href="#/logout/">Logout</a>
          </li>
          <li className="nav-item" style={{position: 'absolute', top: '0px', right: '0px'}}>
            {
              props.email
            }
          </li>
        </ul>
      </div>
    </nav>

  );
}