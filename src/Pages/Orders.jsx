import React from 'react';
import Card from "../components/Card/Card";

import axios from "axios";
import {AppContext} from "../App";

const Orders = () => {

    const {isLoading} = React.useContext(AppContext)
    const [orders, setOrders] = React.useState([]);


    React.useEffect(() => {
        (async () => {
            const {data} = await axios.get("https://630139989a1035c7f8ffc778.mockapi.io/orders");
            setOrders(data.reduce((prev,obj) => [...prev, ...obj.items], []));
        })();

    }, []);

    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>Мои заказы</h1>

            </div>

            <div className="sneakers d-flex flex-wrap">
                {(isLoading
                    ? [...Array(12)]
                    : orders)
                    .map((item, index) => (
                        <Card
                        key={index}
                        loading={isLoading}
                        {...item}
                        />
                    ))}
            </div>
        </div>
    );
};

export default Orders;