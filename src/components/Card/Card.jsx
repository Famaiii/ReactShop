import React from 'react';
import classes from './Card.module.scss';

const Card = ({onFavorite, title, imageUrl, price, onPlus}) => {

    const [isAdded, setIsAdded] = React.useState();

    const onClickPlus = () => {
        onPlus({title, imageUrl, price});
        setIsAdded(!isAdded);
    }

    return (
        <div className={classes.card}>
            <div className={classes.favorite} onClick={onFavorite}>
                <img src="/img/heart-unliked.svg" alt="unliked"/>
            </div>
            <img width={133} height={112} src={imageUrl} alt="Sneakers"/>
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена:</span>
                    <b>{price}</b>
                </div>
                <img className={classes.plus}
                     onClick={onClickPlus}
                     src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} alt='Plus'/>
            </div>
        </div>
    );
};

export default Card;