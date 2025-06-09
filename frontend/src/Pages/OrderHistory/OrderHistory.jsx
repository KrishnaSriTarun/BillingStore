import { useEffect, useState } from 'react';
import './OrderHistory.css';
import { latestOrders } from './../../Service/OrderService';
import ReceiptPopup from '../../Components/ReceiptPopup/ReceiptPopup';

function OrderHistory() {
      const [orders, setOrders] = useState([]);
      const [loading, setLoading] = useState(true);
      const [showPopup, setShowPopup] = useState(false);
      const [selectedOrder, setSelectedOrder] = useState(null);

      useEffect(() => {
            const fetchOrders = async () => {
                  try {
                        const response = await latestOrders();
                        setOrders(response.data);
                  } catch (error) {
                        console.error(error);
                  } finally {
                        setLoading(false);
                  }
            };
            fetchOrders();
      }, []);

      const formatItems = (items) => {
            return items.map((item, index) => `${item.name} x ${item.quantity}`).join(', ');
      };

      const formatDate = (dateString) => {
            const options = {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
            };
            return new Date(dateString).toLocaleDateString('en-US', options);
      };

      const openReceipt = (order) => {
            setSelectedOrder({
                  ...order,
                  razorpayOrderId: order.paymentDetails?.razorpayOrderId,
                  razorpayPaymentId: order.paymentDetails?.razorpayPaymentId
            });
            setShowPopup(true);
      };

      const handlePrintReceipt = () => {
            window.print();
      };

      if (loading) {
            return <div className="text-center py-4">Loading orders...</div>;
      }

      if (orders.length === 0) {
            return <div className="text-center py-4">No Orders Found</div>;
      }

      return (
            <div className="orders-history-container">
                  <h2 className="mb-2 text-light">All Orders</h2>
                  <div className="table-responsive">
                        <table className="table table-striped table-hover">
                              <thead className="table-dark">
                                    <tr>
                                          <th>Order Id</th>
                                          <th>Customer</th>
                                          <th>Items</th>
                                          <th>Total</th>
                                          <th>Payment</th>
                                          <th>Status</th>
                                          <th>Date</th>
                                          <th>Receipt</th> 
                                    </tr>
                              </thead>
                              <tbody>
                                    {orders.map(order => (
                                          <tr key={order.orderId}>
                                                <td>{order.orderId}</td>
                                                <td>
                                                      {order.customerName} <br />
                                                      <small className="text-muted">{order.phoneNumber}</small>
                                                </td>
                                                <td>{formatItems(order.items)}</td>
                                                <td>₹{order.grandTotal}</td>
                                                <td>{order.paymentMethod}</td>
                                                <td>
                                                      <span className={`badge ${order.paymentDetails?.status === "COMPLETED" ? "bg-success" : "bg-warning text-dark"}`}>
                                                            {order.paymentDetails?.status || "PENDING"}
                                                      </span>
                                                </td>
                                                <td>{formatDate(order.createdAt)}</td>
                                                <td>
                                                      <button className="btn btn-primary btn-sm" onClick={() => openReceipt(order)}>View Receipt</button>
                                                </td>
                                          </tr>
                                    ))}
                              </tbody>
                        </table>
                  </div>
                  {showPopup && selectedOrder && (
                        <ReceiptPopup
                              orderDetails={selectedOrder}
                              onClose={() => setShowPopup(false)}
                              onPrint={handlePrintReceipt}
                        />
                  )}
            </div>
      );
}

export default OrderHistory;
