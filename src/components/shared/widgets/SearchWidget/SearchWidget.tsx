import { useState } from 'react';
import styles from './SearchWidget.module.css';

const SearchWidget = () => {
  const [showSearch, setShowSearch] = useState(false);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      setTimeout(() => {
        const input = document.querySelector('input[type="search"]') as HTMLInputElement;
        if (input) input.focus();
      }, 0);
    }
  };

  return (
    <>
      <button
        className={styles.headerControlsPic + ' ' + styles.headerControlsSearch}
        title="Поиск"
        aria-label="Поиск"
        onClick={toggleSearch}
      />
      <form className={`${styles.headerControlsSearchForm} ${showSearch ? '' : styles.invisible}`}>
        <input type="search" className={styles.searchInput} placeholder="Поиск" />
      </form>
    </>
  );
};

export default SearchWidget;
