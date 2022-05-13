function Withdraw(props){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="success"
      header="Withdraw"
      status={status}
      body={show ? 
        <WithdrawForm email={props.email} balance={props.balance} setBalance={props.setBalance} setShow={setShow} setStatus={setStatus}/> :
        <WithdrawMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )
}

function WithdrawMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
        Withdraw again
    </button>
  </>);
}

function WithdrawForm(props){
  const [amount, setAmount] = React.useState('');

  function validateAmount(){
    if(!amount) return true;
    return false;
  }

  function handle(){
    var intAmount = parseInt(amount);
    if(intAmount < 0) {
      props.setStatus("Error: Negative number!");
      setTimeout(() => props.setStatus(''), 2000);
      return;
    }
    if(intAmount > props.balance) {
      props.setStatus("Error: Greater than balance!");
      setTimeout(() => props.setStatus(''), 2000);
      return;
    }
    fetch(`/account/update/${props.email}/-${amount}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus(JSON.stringify(data.value));
            props.setShow(false);
            console.log('JSON:', data);
            props.setBalance(data.value.balance);
        } catch(err) {
            props.setStatus('Deposit failed')
            console.log('err:', text);
        }
    });
  }


  return(<>

    Balance: {props.balance}<br/>
    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} 
      onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button disabled={validateAmount()}
      type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Withdraw
    </button>

  </>);
}
