import React, { useEffect, useState } from 'react';

export const AdminTransactionPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch transaction data from the API
    const fetchTransactions = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/transactions/');
        const data = await response.json();
        setTransactions(data);
      } catch (err) {
        setError('Failed to fetch transactions');
        console.error('Error fetching transactions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="admin-container">
      <h2 className="admin-title">All Transactions</h2>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Transaction Date</th>
              <th>Transaction Time</th>
              <th>Username</th>
              <th>Product ID</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.transaction_id}>
                <td>{transaction.transaction_id}</td>
                <td>{transaction.product_name}</td>
                <td>{transaction.quantity}</td>
                <td>{transaction.total_price}</td>
                <td>{transaction.transaction_date}</td>
                <td>{transaction.transaction_time}</td>
                <td>{transaction.username}</td>
                <td>{transaction.product}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
