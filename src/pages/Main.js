import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import RelatedSearchTerm from '../components/RelatedSearchTerm';
import { OPERATION_RECOMMEND_WORD_INDEX, SET_SEARCH_WORD } from '../slices/searchSlice';
import LoadingSpinner from '../components/LoadingSpinner';
import useSearch from '../hooks/useSearch';

const Main = () => {
  const dispatch = useDispatch();
  const { inputEntering, setInputEntering, sickList } = useSearch();
  const { searchWord, recommendWordIndex } = useSelector(state => state.search);

  const onChangeInput = e => {
    if (recommendWordIndex !== null) dispatch(OPERATION_RECOMMEND_WORD_INDEX(null));

    setInputEntering(true);
    dispatch(SET_SEARCH_WORD(e.target.value));
  };

  const onKeyPress = e => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      console.log(recommendWordIndex);
      // 첫 키 입력 시
      if (recommendWordIndex === null) {
        dispatch(OPERATION_RECOMMEND_WORD_INDEX(0));
      }
      // 맨 위에서 위, 맨 아래에서 아래를 눌렀을 때 아무것도 안함
      else if (recommendWordIndex === 0 && e.key === 'ArrowUp') {
        return;
      } else if (recommendWordIndex === sickList.length - 1 && e.key === 'ArrowDown') {
        return;
      }
      // 키 입력시 증감
      else {
        dispatch(OPERATION_RECOMMEND_WORD_INDEX(e.key));
      }
    }

    if (e.key === 'Enter') {
    }
  };

  return (
    <Container>
      <Title>
        국내 모든 임상시험 검색하고
        <br />
        온라인으로 참여하기
      </Title>
      <Input placeholder='질환명을 입력해주세요' onChange={onChangeInput} onKeyDown={onKeyPress} />
      {inputEntering ? (
        // 검색어 입력중이면
        <LoadingSpinner />
      ) : sickList.length === 0 ? (
        // 첫 렌더링 화면 (검색 결과가 없을 시))
        <></>
      ) : searchWord !== '' ? (
        // 검색어 입력 시
        <RelatedSearchTermContainer>
          {sickList.map((list, idx) => (
            <RelatedSearchTerm key={list.sickCd} name={list.sickNm} idx={idx} />
          ))}
        </RelatedSearchTermContainer>
      ) : (
        <NoneInputValueDiv>검색어 없음</NoneInputValueDiv>
      )}
    </Container>
  );
};

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 200px;
`;

const Title = styled.h1`
  text-align: center;
`;

const Input = styled.input`
  box-sizing: border-box;
  border: none;
  border-radius: 20px;
  width: 600px;
  padding: 20px;
`;

const RelatedSearchTermContainer = styled.ul`
  display: flex;
  flex-direction: column;
  width: 600px;
  padding: 10px 20px;
  border-radius: 20px;
  box-sizing: border-box;
  margin-top: 10px;
  background-color: white;
  overflow-y: scroll;
  height: 300px;
`;

const NoneInputValueDiv = styled.div`
  box-sizing: border-box;
  width: 600px;
  border-radius: 20px;
  margin-top: 10px;
  padding: 10px 20px;
  background-color: white;
`;

export default Main;
