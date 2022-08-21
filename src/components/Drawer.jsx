import React from 'react';

const Drawer = ({onClose, onRemove, items = []}) => {
    return (
        <div className='overlay'>
            <div className='drawer'>
                <h2 className='mb-30 d-flex justify-between'>
                    Корзина
                    <img onClick={onClose} className='removeBtn cu-p' src='/img/btn-remove.svg' alt='remove'/>
                </h2>

                {
                    items.length > 0 ?
                        <div className='d-flex flex-column cartWrap'>
                            <div className="items">
                                {
                                    items.map((obj) => (

                                        <div className="cartItem d-flex align-center mb-20">

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
                                        <b>21 498 грн.</b>
                                    </li>
                                    <li>
                                        <span>Налог 5%:</span>
                                        <div></div>
                                        <b>1074 грн.</b>
                                    </li>
                                </ul>

                                <button className='greenButton'>Оформить заказ <img src='/img/arrow.svg' alt='arrow'/>
                                </button>

                            </div>
                        </div>
                        : <div className='cartEmpty d-flex align-center justify-center flex-column flex'>
                            <img className='mb-20' width={120} height={120} src="/img/empty-cart.jpg" alt='empty'/>
                            <h2>Корзина пустая</h2>
                            <p className='opacity-6'>Добавьте хотя бы один товар, чтобы сделать заказ</p>
                            <button onClick={onClose} className="greenButton">
                                <img src="/img/arrow.svg" alt="arrow"/>
                                Вернуться назад
                            </button>
                        </div>
                }


            </div>
        </div>
    );
};

export default Drawer;