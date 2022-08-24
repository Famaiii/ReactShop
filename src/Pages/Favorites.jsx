import React from 'react';
import Card from "../components/Card/Card";
import {AppContext} from "../App";


const Favorites = ({onAddToFavorite}) => {

    const {favorites} = React.useContext(AppContext);

    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>Мои закладки</h1>

            </div>

            <div className="sneakers d-flex flex-wrap">
                {favorites
                    .map((item, index) => (
                        <Card
                            key={index}
                            favorited={true}
                            onFavorite={onAddToFavorite}
                            /* Вместо того чтобы каждое свойство передавать вручную,
                             можно передать этот обьект со всеми его свойствами */
                            {...item}
                        />
                    ))}
            </div>
        </div>
    );
};

export default Favorites;