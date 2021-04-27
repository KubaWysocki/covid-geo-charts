import styles from './Search.module.css'

const Search = ({query, onChange}) =>
  <div className={styles.search}>
    <input
      value={query}
      onChange={(e) => onChange(e.target.value)}
      placeholder='Search country'/>
  </div>

export default Search