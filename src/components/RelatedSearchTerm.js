import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const RelatedSearchTerm = ({ name, idx }) => {
  const { searchWord, recommendWordIndex } = useSelector(state => state.search);
  const _name = name.split(searchWord);

  return (
    <List className={idx === recommendWordIndex ? 'over' : ''}>
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <Name>
        <span>{_name[0]}</span>
        {_name[0][_name[0].length - 1] === ' ' ? (
          <BoldName>&nbsp;{searchWord}</BoldName>
        ) : (
          <BoldName>{searchWord}</BoldName>
        )}
        <span>{_name[1]}</span>
      </Name>
    </List>
  );
};

const List = styled.li`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 40px;
  list-style: none;
  margin: 2px 0;
  padding: 10px;
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const BoldName = styled.h4`
  color: skyblue;
`;

export default RelatedSearchTerm;
