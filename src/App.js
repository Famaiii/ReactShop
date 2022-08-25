import React from "react";
import './index.scss'
import axios from "axios";
import Header from "./components/Header";
import Drawer from "./components/Drawer/Drawer";
import {Route, Routes} from "react-router-dom";
import Home from "./Pages/Home";
import Favorites from "./Pages/Favorites";
import Orders from "./Pages/Orders";

export const AppContext = React.createContext({});


function App() {

    const [items, setItems] = React.useState([]);
    const [cartItems, setCartItems] = React.useState([]);
    const [cartOpened, setCartOpened] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState('');
    const [favorites, setFavorites] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    // console.log(cartItems);

    React.useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true);

                const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
                    axios.get('https://630139989a1035c7f8ffc778.mockapi.io/cart'),
                    axios.get('https://630139989a1035c7f8ffc778.mockapi.io/favorites'),
                    axios.get('https://630139989a1035c7f8ffc778.mockapi.io/items')
                ]);

                setIsLoading(false);

                setCartItems(cartResponse.data);
                setFavorites(favoritesResponse.data);
                setItems(itemsResponse.data);
            } catch (error) {
                alert("Ошибка при запросе данных")
                console.error(error)
            }

        }

        fetchData();
    }, [])

    // prev - берем предыдущие данные(это точнее чем брать с cartItems)
    // setCartItems(prev => [...prev, obj]), '...' мы берем данные уже имеющиеся и добавляем их новому массиву,создавая новый
    const onAddToCart = async (obj) => {
        console.log(obj);
        try {
            const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
            if (findItem) { // Если при нажатии на плюс в корзине есть такой айди,то добавление не произойдет
                setCartItems((prev) => prev.filter(item => Number(item.parentId) !== Number(obj.id)));
                await axios.delete(`https://630139989a1035c7f8ffc778.mockapi.io/cart/${findItem .id}`);
            } else {
                setCartItems((prev) => [...prev, obj]);

                const {data} = await axios.post('https://630139989a1035c7f8ffc778.mockapi.io/cart', obj);
                setCartItems((prev) => prev.map(item => {
                    if (item.parentId === data.parentId) {
                        return {
                            ...item,
                            id: data.id
                        };
                    }
                    return item;
                }));
            }

        } catch (error) {
            alert("Оштбка при добавлении в корзину")
            console.error(error)

        }

    };

    const onRemoveItem = (id) => {
        try {
            axios.delete(`https://630139989a1035c7f8ffc778.mockapi.io/cart/${id}`);
            setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(id)))

        } catch (error) {
            alert('Ошибка при удалении из корзины')
            console.error(error)
        }
    };

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    }

    const onAddToFavorite = async (obj) => {
        try {
            if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
                axios.delete(`https://630139989a1035c7f8ffc778.mockapi.io/favorites/${obj.id}`);
                setFavorites((prev) => prev.filter(item => Number(item.id) !== Number(obj.id)));
            } else {
                const {data} = await axios.post('https://630139989a1035c7f8ffc778.mockapi.io/favorites', obj);
                setFavorites((prev) => [...prev, data]);
            }
        } catch (error) {
            alert("Не удалось добавить в Favorite")
            console.error(error)

        }
    };

    const isItemAdded = (id) => {
        return cartItems.some((obj) => Number(obj.parentId) === Number(id));
    }

    return (

        <AppContext.Provider value={{
            items,
            cartItems,
            favorites,
            isItemAdded,
            onAddToFavorite,
            onAddToCart,
            isLoading,
            setCartOpened,
            setCartItems
        }}>

            <div className="wrapper clear">

                <Drawer
                    items={cartItems}
                    onClose={() => setCartOpened(false)}
                    onRemove={onRemoveItem}
                    opened={cartOpened}/>

                <Header onClickCart={() => setCartOpened(true)}/>
                <Routes>
                    <Route path="/"
                           element={<Home
                               items={items}
                               cartItems={cartItems}
                               searchValue={searchValue}
                               setSearchValue={setSearchValue}
                               onChangeSearchInput={onChangeSearchInput}
                               onAddToFavorite={onAddToFavorite}
                               onAddToCart={onAddToCart}
                               isLoading={isLoading}/>}>


                    </Route>

                    <Route path="/favorites"
                           element={<Favorites/>}>

                    </Route>

                    <Route path="/orders"
                           element={<Orders/>}>

                    </Route>
                </Routes>


            </div>
        </AppContext.Provider>
    );
}

export default App;
