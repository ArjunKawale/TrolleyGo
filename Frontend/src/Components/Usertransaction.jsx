import React, { useEffect, useState } from 'react';

export const Usertransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch transaction data from the API
    const fetchTransactions = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/transactions/');
        const data = await response.json();
        const username = localStorage.getItem('username'); // Get username from localStorage
    
        console.log('Fetched data:', data);
        console.log('Username from localStorage:', username);
    
        // Filter transactions by username
        const filteredTransactions = data
          .filter(transaction => transaction.username === username)
          .sort((a, b) => {
            const dateA = new Date(`${a.transaction_date}T${a.transaction_time}`);
            const dateB = new Date(`${b.transaction_date}T${b.transaction_time}`);
            return dateB - dateA; // Sort in descending order (latest first)
          });
    
        console.log('Sorted transactions:', filteredTransactions);
        setTransactions(filteredTransactions);
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
      <h2 className="admin-title">User Transactions</h2>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Transaction Date</th>
              <th>Transaction Time</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.transaction_id}>
                <td>{transaction.product_name}</td>
                <td>{transaction.quantity}</td>
                <td>{transaction.total_price}</td>
                <td>{transaction.transaction_date}</td>
                <td>{transaction.transaction_time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
