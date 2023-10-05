
function ViewOrderConfirmation(orderConfirmation) {
    const orders=orderConfirmation.orderConfirmation;
    
    if (orders.length === 0) {
        return null;
    }
    console.log(orders);
    return(
        <div className="bg-white">
            <h3> Bekräftelse</h3>

            <p>Status: {orders.status}</p>
            <p>Ordernummer: {orders.uuid}</p>
            <p>Tid: {orders.timestamp}</p>
            <p>Antal sallader: {orders.order.length} st</p>
            <p>Pris: {orders.price} kr</p>

        </div>
    );
}

export default ViewOrderConfirmation;