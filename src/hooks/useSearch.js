import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getSick } from '../api/sick';

const useSearch = () => {
  const [inputEntering, setInputEntering] = useState(false);
  const { searchWord } = useSelector(state => state.search);
  const [sickList, setSickList] = useState([]);

  const handleSearchSick = useCallback(async () => {
    const URL = `http://localhost:4000/sick?q=${searchWord}`;
    const cacheStorage = await caches.open('search');
    const responseCache = await cacheStorage.match(URL);

    // 브라우저 캐시 스토리지에 있을 경우
    if (responseCache?.status === 200) {
      await cacheStorage
        .match(URL)
        .then(res => res.json())
        .then(sickList => setSickList(sickList));
    }
    // 브라우저 캐시 스토리지에 없을 경우
    else {
      await getSick(searchWord).then(res => {
        setSickList(res.data);
        cacheStorage.put(URL, new Response(JSON.stringify(res.data)));
      });
    }
  }, [searchWord]);

  useEffect(() => {
    if (!!searchWord) setSickList([]);

    const debounce = setTimeout(() => {
      handleSearchSick();
      setInputEntering(false);
    }, 500);

    return () => {
      clearTimeout(debounce);
    };
  }, [searchWord, handleSearchSick]);

  return { inputEntering, setInputEntering, sickList, handleSearchSick };
};

export default useSearch;
