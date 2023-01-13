# 📝  검색어 추천기능 구현하기

<!-- <p align="middle">
<img src="./screenshot.png" />
</p> -->

## 📄목차
---
- [🗓️ Todo List Best Practice](#️-todo-list-best-pratice)
  - [📄목차](#목차)
  - [📚 사용 라이브러리](#-사용-라이브러리)
  - [🏃‍♂️ 실행방법](#️-실행방법)
  - [💡 구현목표](#-설계-전략)
    - [1. Issue의 CRUD 구현 ](#1-질환명-검색시-api-호출-통해서-검색어-추천-기능-구현)
    - [2. API 호출 최적화](#2-api-호출-최적화)
    - [3. 키보드만으로 추천 검색어들로 이동 가능하도록 구현](#3-키보드만으로-추천-검색어들로-이동-가능하도록-구현)

<br>

<br>

## 📚 사용 라이브러리
---
<div align="center">
  
<img src="https://img.shields.io/badge/Redux-7347B6?style=for-the-badge&logo=Redux&logoColor=white" />
<img src="https://img.shields.io/badge/ReduxToolkit-7347B6?style=for-the-badge&logo=Redux&logoColor=white" />
<img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white" />
  
<br/>
<img src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" />
<img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white" />
</div>

<br>

## 🏃‍♂️ 실행방법
----
- 의존성 package 설치
```
yarn
```
- 브라우저 실행
```
yarn start
```
- json-server 실행
```
yarn server
```

<br>

## 💡 구현 목표
---
 <h3> 

 **[한국 임상 정보](https://clinicaltrialskorea.com/) 페이지의 검색영역 클론하기**
 </h3>

  - **질환명 검색시 API 호출 통해서 검색어 추천 기능 구현**

  - **API 호출 최적화**
  
  - **키보드만으로 추천 검색어들로 이동 가능하도록 구현**
  <br>

---
<br>

### 1. 질환명 검색시 API 호출 통해서 검색어 추천 기능 구현 

<br>
  
  * 사용자가 입력한 텍스트와 일치하는 부분 볼드처리
  * 검색어가 없을 시 “검색어 없음” 표출

<br>

**Component**

  * 사용자가 입력한 텍스트( inputValue )를 기준으로 각 추천 검색어의 문자열을 split 메서드를 사용하여 나누어준 후, inputValue 부분에만 CSS 처리를 해주어 Bold 효과를 주었습니다.

  * '검색창이 비어 있거나, 추천 검색어 data를 담은 배열의 길이가 0일 때(추천검색어가 없을 때)' '검색어 없음'을 표출하도록 삼항연산자를 사용하여 조건부 랜더링을 구현하였습니다.

```javascript

        <WordBox ref={keyboardRef}>
          {inputValue !== '' && list?.length !== 0 ? (
            list?.map((word, idx) => {
              const keyValue = word?.sickCd;
              return word?.sickNm.includes(inputValue) ? (
                <Words
                  key={keyValue}
                  isFocus={index === idx ? true : false}
                >
                  <ImgBox>
                    <img src={require('images/searching_btn_black.png')} alt="검색하기" />
                  </ImgBox>
                  <span>{word?.sickNm.split(inputValue)[0]} </span>
                  <span style={{ fontWeight: 'bolder' }}>{inputValue}</span>
                  <span>{word?.sickNm.split(inputValue)[1]}</span>
                </Words>
              ) : null;
            })
          ) : (
            <span>검색어 없음</span>
          )}
        </WordBox>

```

<br>

### 2. API 호출 최적화

  - API 호출별로 로컬 캐싱 구현
      ➡️ 캐싱 기능을 제공하는 라이브러리 사용 금지(React-Query 등)

  - 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행

  - API를 호출할 때 마다 `console.info("calling api")` 출력을 통해 콘솔창에서 API 호출 횟수 확인이 가능하도록 설정

<br>

**Component**
 
 * **Cache API**를 사용하여 로컬 로컬 캐싱을 구현함.
 * 로컬 브라우저의 cacheStorage를 이용하여 호출했던 API의 URL과 matching하여 일치
  

```javascript

export const getkeywordList = createAsyncThunk('GET_KEYWORD_LIST', async keyword => {

  const url = instance.defaults.baseURL + `/sick?q=${keyword}`;
  const cacheStorage = await caches.open('searched_word');
  const responsedCache = await cacheStorage.match(url);

  try {
    if (responsedCache) {
      console.log('캐시 사용');
      return responsedCache.json();
    } 
  else {
      const res = await instance.get(`/sick?q=${keyword}`);
      await cacheStorage.add(url);
      console.info('calling api');
      return res.data;
    }
  } catch (err) {
    console.log(err);
  }

});

```
* **'useDebounce' Hook** 을 사용하여 각 입력사이에 delay(500ms)를 주어, API 호출 횟수를 줄이도록 구현하였습니다.


```javascript
import { useEffect, useState } from 'react';

export const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  return debounceValue;
};

```

<br>

### 3. 키보드만으로 추천 검색어들로 이동 가능하도록 구현

  * 


**Component**
* 

```javascript


```

<br>
