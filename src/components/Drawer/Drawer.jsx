import React from 'react';
import axios from "axios";

import Info from "../Info";
import {AppContext} from "../../App";

import classes from "./Drawer.module.scss";

const delay = (ms) => new Promise(resolve => setTimeout(resolve,ms))

const Drawer = ({onClose, onRemove, items = [], opened}) => {
    const {cartItems, setCartItems} = React.useContext(AppContext);
    const [isComplete, setIsComplete] = React.useState(false);
    const totalPrice = cartItems.reduce((sum,obj) => obj.price + sum, 0)


    const onClickOrder = async () => {
    try {
        await axios.post("https://630139989a1035c7f8ffc778.mockapi.io/orders",{
            items: cartItems});
        setIsComplete(true);
        setCartItems([]);

        for (let i = 0; i < cartItems.length; i++) {
            const item = cartItems[i];
            await axios.delete("https://630139989a1035c7f8ffc778.mockapi.io/cart/" + item.id);
            await delay(1000);
        }
    } catch (error) {
        alert("Ошибка при создании заказа")
    }
    };

    return (
        <div className={`${classes.overlay} ${opened ? classes.overlayVisible : ''}`}>
            <div className={classes.drawer}>
                <h2 className='mb-30 d-flex justify-between'>
                    Корзина
                    <img onClick={onClose} className='removeBtn cu-p' src='/img/btn-remove.svg' alt='remove'/>
                </h2>

                {items.length > 0 ?
                        <div className='d-flex flex-column cartWrap flex'>
                            <div className={classes.items}>
                                {
                                    items.map((obj) => (
                                        <div key={obj.id} className="cartItem d-flex align-center mb-20">

                                            <div
                                                style={{backgroundImage: `url(${obj.imageUrl})`}}
                                                className='cardItemImg'>

                                            </div>

                                            <div className='mr-20 flex'>
                                                <p className="mb-5">{obj.title}</p>
                                                <b>{obj.text}</b>
                                            </div>
                                            <img onClick={() => onRemove(obj.id)} className='removeBtn'
                                                 src='/img/btn-remove.svg' alt='remove'/>
                                        </div>
                                    ))
                                }

                            </div>
                            <div className='cartTotalBlock'>
                                <ul>
                                    <li>
                                        <span>Итого:</span>
                                        <div></div>
                                        <b>{totalPrice} грн.</b>
                                    </li>
                                    <li>
                                        <span>Налог 5%:</span>
                                        <div></div>
                                        <b>{Math.round(totalPrice / 100 * 5)} грн.</b>
                                    </li>
                                </ul>

                                <button className='greenButton' onClick={onClickOrder}>Оформить заказ <img src='/img/arrow.svg' alt='arrow'/>
                                </button>

                            </div>
                        </div>
                        :
                        <Info
                            title={isComplete ? "Заказ оформлен" : "Корзина пустая"}
                            description={isComplete ? "Ваш заказ принят, мы свяжемся с вами в ближайшее время" : "Добавьте хотя бы один товар,чтобы сделать заказ"}
                            image={isComplete ? "/img/complete-order.jpg" : "/img/empty-cart.jpg"}
                        />
                }


            </div>
        </div>
    );
};

export default Drawer;