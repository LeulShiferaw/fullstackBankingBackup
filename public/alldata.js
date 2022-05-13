function AllData(){
    const [data, setData] = React.useState([]);    

    React.useEffect(() => {
        
        // fetch all accounts from API
        fetch('/account/all')
            .then(response => response.json())
            .then(dat => {
                console.log(dat);
                setData(dat);                
            });

    }, []);

    return (<>
        <h5>All Data in Store:</h5>
        {
        <AllDataCard
      bgcolor="info"
      header="All Accounts"
      status={""}
      body={
        <table className="table">
          <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Balance</th>
          </tr>
          </thead>
          <tbody>
        {
          data.map((user) =>{ 
            return (
            <tr style={{color:'black'}}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.balance}</td>
            </tr>
            );
          })
        }
          </tbody>
        </table>
      }
    />}
    </>);
}
