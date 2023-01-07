import Transaction from "./Transaction";

const Transactions = ({ data }) => {
  return (
    <>
      {data.map((transaction, key) => (
        <Transaction
          data={transaction}
          key={key}
        />
      ))}
    </>
  );
};

export default Transactions;
