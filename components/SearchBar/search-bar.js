import styles from './search-bar.module.css'

const SearchBar = ({ ...rest }) => {
    return (
        <div className={styles.coin_search}>
            <input type="text" placeholder='Search' className={styles.coin_input} {...rest} />
        </div>
    )
}

export default SearchBar