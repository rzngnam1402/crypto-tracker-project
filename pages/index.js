import { useState } from 'react';
import CoinsList from "../components/CoinsList/coins-list"
import Layout from "../components/Layout/layout"
import SearchBar from "../components/SearchBar/search-bar"

const HomePage = (props) => {
    const [search, setSearch] = useState('');

    const allCoins = props.filteredCoins.filter(coin =>
        coin.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleChange = e => {
        e.preventDefault();

        setSearch(e.target.value.toLowerCase());
    };

    return (
        <Layout>
            <div className='coin_app'>
                <SearchBar type='text' placeholder='Search' onChange={handleChange} />
                <CoinsList filteredCoins={allCoins} />
            </div>
        </Layout>
    )
}

export const getServerSideProps = async () => {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=1&sparkline=false");
    const filteredCoins = await res.json();

    if (!filteredCoins) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return {
        props: {
            filteredCoins,
        }
    }
}

export default HomePage