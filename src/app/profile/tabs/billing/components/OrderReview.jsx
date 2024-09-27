import React from "react";

const OrderReview = ({ order }) => {
  const {
    id,
    reference,
    sub_total,
    sub_total_after_points,
    points_used,
    lines,
    customer,
    address,
  } = order;

  return (
    <div>
      {/* Order Summary */}
      <h2>Order Review</h2>
      <p>Order ID: {id}</p>
      <p>Order Reference: {reference}</p>
      <p>Subtotal: {sub_total}</p>
      <p>Subtotal After Points: {sub_total_after_points}</p>
      <p>Points Used: {points_used}</p>

      {/* Customer Info */}
      <h3>Customer Information</h3>
      {customer.map((cust, idx) => (
        <div key={idx}>
          <p>Name: {cust.first_name} {cust.last_name}</p>
          <p>Age: {cust.age}</p>
          <p>Gender: {cust.gender}</p>
          <p>Phone: {cust.phone_number}</p>
        </div>
      ))}

      {/* Billing and Shipping Address */}
      <h3>Address Information</h3>
      {address.map((addr, idx) => (
        <div key={idx}>
          <h4>{addr.type === 'billing' ? 'Billing Address' : 'Shipping Address'}</h4>
          <p>Name: {addr.first_name} {addr.last_name}</p>
          <p>City: {addr.city}</p>
          <p>State: {addr.state}</p>
          <p>Postcode: {addr.postcode}</p>
          <p>Email: {addr.contact_email}</p>
          <p>Phone: {addr.contact_phone}</p>
        </div>
      ))}

      {/* Order Lines */}
      <h3>Order Items</h3>
      {lines.map((line, idx) => (
        <div key={idx}>
          <h4>{line.description}</h4>
          <p>Unit Price: {line.unit_price.value} {line.unit_price.currency.code}</p>
          <p>Quantity: {line.quantity}</p>
          <p>Subtotal: {line.sub_total.value} {line.sub_total.currency.code}</p>
        </div>
      ))}

      {/* Order Totals */}
      <h3>Order Totals</h3>
      <p>Total: {order.total}</p>
    </div>
  );
};
export default OrderReview