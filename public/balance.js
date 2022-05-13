function Balance(props){
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="info"
      header="Balance"
      status={status}
      body={
        <>
          Balance: {props.balance}
        </>
      }
    />
  )

}