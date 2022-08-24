import React from 'react';
import Card from "../components/Card/Card";


const Home = ({
                  items,
                  cartItems,
                  searchValue,
                  setSearchValue,
                  onChangeSearchInput,
                  onAddToFavorite,
                  onAddToCart,
                  isLoading
              }) => {

    const renderItems = () => {
        const filtredItems = items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()));
        return (isLoading
            ? [...Array(12)]
            : filtredItems)
            .map((item, index) => (
                <Card
                    key={index}
                    onFavorite={(obj) => onAddToFavorite((obj))}
                    onPlus={(obj) => onAddToCart(obj)}
                    added={cartItems.some(obj => Number(obj.id) === Number(item.id))}
                    loading={isLoading}
                    {...item}
                />
            ))
    }

    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>{searchValue ? `Поиск по запросу: ${searchValue}` : 'Все кроссовки'}</h1>
                <div className="search-block d-flex">
                    <img src="/img/search.svg" alt="search"/>

                    {searchValue &&
                        <img onClick={() => setSearchValue('')} className='clear cu-p' src='/img/btn-remove.svg'
                             alt='clear'/>}

                    <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..."/>
                </div>
            </div>

            <div className="sneakers d-flex flex-wrap">

                {renderItems()}

            </div>
        </div>
    );
};

export default Home;