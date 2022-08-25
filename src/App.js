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
            setIsLoading(true);
            const cartResponse = await axios.get('https://630139989a1035c7f8ffc778.mockapi.io/cart');
            const favoritesResponse = await axios.get('https://630139989a1035c7f8ffc778.mockapi.io/favorites');
            const itemsResponse = await axios.get('https://630139989a1035c7f8ffc778.mockapi.io/items');

            setIsLoading(false);

            setCartItems(cartResponse.data);
            setFavorites(favoritesResponse.data);
            setItems(itemsResponse.data);

        }

        fetchData();
    }, [])

    // prev - берем предыдущие данные(это точнее чем брать с cartItems)
    // setCartItems(prev => [...prev, obj]), '...' мы берем данные уже имеющиеся и добавляем их новому массиву,создавая новый
    const onAddToCart = (obj) => {
        console.log(obj);
        try {
            if (cartItems.find((item) => Number(item.id) === Number(obj.id))) { // Если при нажатии на плюс в корзине есть такой айди,то добавление не произойдет
                axios.delete(`https://630139989a1035c7f8ffc778.mockapi.io/cart/${obj.id}`);
                setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(obj.id)));
            } else {
                axios.post('https://630139989a1035c7f8ffc778.mockapi.io/cart', obj);
                setCartItems((prev) => [...prev, obj]);
            }

        } catch (error) {
            alert("Error")
        }

    };

    const onRemoveItem = (id) => {
        axios.delete(`https://630139989a1035c7f8ffc778.mockapi.io/cart/${id}`);
        setCartItems((prev) => prev.filter(item => item.id !== id))

    };

    const onChangeSearchInput = (event) => {
        // console.log(event.target.value)
        setSearchValue(event.target.value);
    }

    const onAddToFavorite = async (obj) => {
        try {
            if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
               axios.delete(`https://630139989a1035c7f8ffc778.mockapi.io/favorites/${obj.id}`);
                setFavorites((prev) => prev.filter(item => Number(item.id) !== Number(obj.id)));
            } else {
               const {data} = await axios.post('https://630139989a1035c7f8ffc778.mockapi.io/favorites', obj);
                    // res.data
                    setFavorites((prev) => [...prev, data]);
            }
        } catch (error) {
            alert("Не удалось добавить в Favorite")
        }
    };

    const isItemAdded = (id) => {
        return cartItems.some((obj) => Number(obj.id) === Number(id));
    }

    return (

        <AppContext.Provider value={{items,
            cartItems,
            favorites,
            isItemAdded,
            onAddToFavorite,
            onAddToCart,
            isLoading,
            setCartOpened,
            setCartItems}}>

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
