import React from 'react';
import classes from './Card.module.scss';
import MyLoader from "./Loader";

const Card = ({
                  id,
                  onFavorite,
                  title,
                  imageUrl,
                  price,
                  onPlus,
                  favorited = false,
                  added = false,
                  loading = false
              }) => {

    const [isAdded, setIsAdded] = React.useState(added);
    const [isFavorite, setIsFavorite] = React.useState(favorited);

    const onClickPlus = () => {
        onPlus({id, title, imageUrl, price});
        setIsAdded(!isAdded);
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
                                 src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} alt='Plus'/>
                        </div>
                    </>
            }
        </div>
    );
};

export default Card;