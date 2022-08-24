import React from 'react';
import classes from './Card.module.scss';
import MyLoader from "./Loader";
import {AppContext} from "../../App";

const Card = ({
                  id,
                  onFavorite,
                  title,
                  imageUrl,
                  price,
                  onPlus,
                  favorited = false,
                  loading = false
              }) => {

    const {isItemAdded} = React.useContext(AppContext);
    const [isFavorite, setIsFavorite] = React.useState(favorited);

    console.log(title,isItemAdded(id))

    const onClickPlus = () => {
        onPlus({id, title, imageUrl, price});
    }

    const onClickFavorite = () => {
        onFavorite({id, title, imageUrl, price})
        setIsFavorite(!isFavorite)
    }

    return (
        <div className={classes.card}>
            {
                loading ? <MyLoader/> :
                    <>  {/* Это фрагмент,который заменяет создание лишнего родительского <div>*/}
                        <div className={classes.favorite} onClick={onClickFavorite}>
                            <img src={isFavorite ? '/img/heart-liked.svg' : '/img/heart-unliked.svg'} alt="unliked"/>
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
                                 src={isItemAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} alt='Plus'/>
                        </div>
                    </>
            }
        </div>
    );
};

export default Card;