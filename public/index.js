function Spa() {
  const [balance, setBalance] = React.useState(0);
  const [login_email, setLoginEmail] = React.useState("");
  const [loginPopup, setLoginPopup] = React.useState(false);
  return (
    <HashRouter>
      <div>
        <NavBar email={login_email}/>        
          <div className="container" style={{padding: "20px"}}>
            <Route path="/" exact component={Home} />
            <Route path="/CreateAccount/" component={CreateAccount} />
            <Route path="/login/" >
              <Login setBalance={setBalance} setLoginEmail={setLoginEmail} setLoginPopup={setLoginPopup}/>
            </Route>
            <Route path="/deposit/">
              <Deposit email={login_email} balance={balance} setBalance={setBalance}/>
            </Route>
            <Route path="/withdraw/">
              <Withdraw email={login_email} balance={balance} setBalance={setBalance}/>
            </Route>
            {/* <Route path="/transactions/" component={Transactions} /> */}
            <Route path="/balance/">
              <Balance balance={balance}/>
            </Route>
            <Route path="/alldata/" component={AllData} />
            <Route path="/logout/">
              <Logout setLoginEmail={setLoginEmail} popup={loginPopup} setLoginPopup={setLoginPopup}/>
            </Route>
          </div>
      </div>
    </HashRouter>
  );
}

ReactDOM.render(
  <Spa/>,
  document.getElementById('root')
);
