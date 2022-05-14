function Login(props){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');    

  return (
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      body={show ? 
        <LoginForm setLoginPopup={props.setLoginPopup} email={props.email} setBalance={props.setBalance} setLoginEmail={props.setLoginEmail} setShow={setShow} setStatus={setStatus}/> :
        <LoginMsg setLoginEmail={props.setLoginEmail} setShow={setShow} setStatus={setStatus}/>}
    />
  ) 
}

function LoginMsg(props){
  return(<>
    <h5>Success</h5>
  </>);
}

function LoginForm(props){
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');

  function handle(){
    fetch(`/account/login/${email}/${password}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus('');
            props.setShow(false);
            console.log('JSON:', data);
            props.setLoginEmail(data.email); //Set the login Email

            //Set the current balance from database
            fetch(`/account/findOne/${email}`)
                  .then(response => response.text())
                  .then(text => {
                    const data = JSON.parse(text);
                    props.setBalance(data.balance);
                  })
        } catch(err) {
            props.setStatus(text)
            console.log('err:', text);
        }
    });
  }
  function handleOAuth(){
    
    console.log("google sign in clicked");
  
    // TODO: Use firebase.auth.GoogleAuthProvider() to implement Google sign in
    // Hint: the user email address is in the results user object: result.user.email
    const provider = new firebase.auth.GoogleAuthProvider();
    const promise = firebase.auth().signInWithPopup(provider);
    promise.then((result) => {
      props.setStatus('');
      props.setShow(false);
      props.setLoginEmail(result.user.email);
      props.setLoginPopup(true);
      let existingUser = null;
      fetch(`/account/findOne/${result.user.email}`)
        .then(response => response.text())
        .then(async (text) => {
          if(text == "") {
            //Create the entry to MongoDB
            const res = await fetch(`/account/create/OAuthUser/${result.user.email}/OAuthPass`);
            const data = await res.json();
            console.log("Created User: ", data);
            props.setBalance(0);
          } 
          else {
            const data = JSON.parse(text);
            props.setBalance(data.balance);
          }
        })
    })
      .catch((e) => console.log(e.message));

    
  }

  function validateEntry() {
    if(!email || !password)
      return true;
    return false;
  }

  return (<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button disabled={validateEntry()} type="submit" className="btn btn-light" onClick={handle}>Login</button><br/>
    <button id="googlelogin" type="submit" className="btn btn-light" onClick={handleOAuth}>Login with Google</button>
   
  </>);
}