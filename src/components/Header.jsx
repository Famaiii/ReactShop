import React from 'react';

const Header = (props) => {
    return (
        <header className="d-flex justify-between align-center p-40">
            <div className="d-flex align-center">
                <img width={40} height={40} src="/img/logo.png" alt="logo"/>
                <div>
                    <h3 className="text-uppercase">React Sneakers</h3>
                    <p className="opacity-5">Магазин лучших кросовок</p>
                </div>
            </div>

            <ul className="headerRight d-flex">
                <li onClick={props.onClickCart} className="mr-30 cu-p">
                    <img width={20} height={20} src="/img/cart.svg" alt="cart"/>
                    <span>
                    1205 грн.
                </span>
                </li>
                <li>
                    <img width={20} height={20} src="/img/user.svg" alt="user"/>
                </li>
            </ul>

        </header>
    );
};

export default Header;