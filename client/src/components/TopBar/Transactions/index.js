import Transaction from "./Transaction";
import Box from '@mui/material/Box';

const Transactions = ({ data }) => {
  return (
    <div>
      {data.map((transaction, key) => (
        <Box sx={{ m: 2 }}>
          <Transaction 
          data={transaction}
          key={key}
        />
        </Box>
      ))}
    </div>
  );
};

export default Transactions;
