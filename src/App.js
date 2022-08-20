import React from "react";
import './index.scss'
import Card from "./components/Card/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";


function App() {
    const [items, setItems] = React.useState([]);
    const [cartItems, setCartItems] = React.useState([]);
    const [cartOpened, setCartOpened] = React.useState(false);

    React.useEffect(() => {
        fetch('https://630139989a1035c7f8ffc778.mockapi.io/items')
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                setItems(json)
            });
    }, [])

    // prev - берем предыдущие данные(это точнее чем брать с cartItems)
    // setCartItems(prev => [...prev, obj]), '...' мы берем данные уже имеющиеся и добавляем их новому массиву,создавая новый
    const onAddToCart = (obj) => {
        setCartItems(prev => [...prev, obj])
    };


    return (
        <div className="wrapper clear">

            {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)}/>}

            <Header onClickCart={() => setCartOpened(true)}/>

            <div className="content p-40">
                <div className="d-flex align-center justify-between mb-40">
                    <h1>Все кроссовки</h1>
                    <div className="search-block d-flex">
                        <img src="/img/search.svg" alt="search"/>
                        <input placeholder="Поиск..."/>
                    </div>
                </div>

                <div className="sneakers d-flex flex-wrap">

                    {items.map((item) => (
                        <Card
                            title={item.title}
                            price={item.price}
                            imageUrl={item.imageUrl}
                            onFavorite={() => console.log('Добавили закладки')}
                            onPlus={(obj) => onAddToCart(obj)}
                        />
                    ))}

                </div>
            </div>
        </div>
    );
}

export default App;
