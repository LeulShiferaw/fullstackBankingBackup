function Deposit(props){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="warning"
      header="Deposit"
      status={status}
      body={show ? 
        <DepositForm balance={props.balance} setBalance={props.setBalance} email={props.email} setShow={setShow} setStatus={setStatus}/> :
        <DepositMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )
}

function DepositMsg(props){
  return (<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
          props.setShow(true);
          props.setStatus('');
      }}>
        Deposit again
    </button>
  </>);
} 

function DepositForm(props){
  const [amount, setAmount] = React.useState('');

  function validateAmount(){
    if(!amount) return true;
    return false;
  }

  function handle(){
    if(parseInt(amount) < 0) {
      props.setStatus("Error: Negative number!");      
      setTimeout(() => props.setStatus(''), 2000);
      return;
    }

    fetch(`/account/update/${props.email}/${amount}`)
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
      value={amount} onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button disabled={validateAmount()} type="submit" 
      className="btn btn-light" 
      onClick={handle}>Deposit</button>

  </>);
}