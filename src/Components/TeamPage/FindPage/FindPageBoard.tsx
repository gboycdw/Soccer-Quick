import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import DropDown from '../../Commons/DropDown';

type DropdownList = {
  option: string[];
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
};

type TableList = {
  title: string;
  body: string;
  style: { width: string };
};

type filteredData = {
  num: number;
  title: string;
  author: string;
  area: string;
  status: string;
  position?: string;
  skill?: string;
  gender: string;
  body: string;
};
type modalDataProps = {
  area: string;
  author: string;
  body: string;
  gender: string;
  num: number; // 수정 필요함(어떻게 들어올 지 모름)
  position?: string;
  skill?: string;
  status: string;
  title: string;
  gk_need?: number;
  gk?: number;
  player_need?: number;
  player?: number;
  allowRandom?: string;
};

type BoardProps = {
  dropdownList: DropdownList[];
  tableList: TableList[];
  handleReset: () => void;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setModalData: React.Dispatch<React.SetStateAction<modalDataProps>>;
  filteredData: filteredData[];
  data: any;
};

function Board(props: BoardProps) {
  const {
    dropdownList,
    tableList,
    handleReset,
    setShowModal,
    setModalData,
    filteredData,
    data,
  } = props;

  return (
    <div style={{ width: '101rem' }}>
      <Teampage>
        <TeamPageOption>
          {dropdownList.map((list, idx) => (
            <DropDown
              key={idx}
              list={list.option}
              selected={list.state}
              setSelected={list.setState}
              style={{ width: '16rem' }}
            />
          ))}
          <button onClick={handleReset}>초기화</button>
        </TeamPageOption>
      </Teampage>
      <Teampage>
        <TeamPageBody>
          <table>
            <thead>
              <tr
                style={{
                  paddingBottom: '1rem',
                  borderBottom: '1px solid #DDDDDD',
                }}
              >
                <th>순번</th>
                <th>Title</th>
                {tableList.map((item) => (
                  <th key={item.title}>{item.title}</th>
                ))}
                <th>미리보기</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, idx) => (
                <StyledTr key={item.num}>
                  <td style={{ width: '5%' }}>{idx + 1}</td>
                  <td style={{ width: '35%' }}>
                    <Link to={`./${item.num}`}>{item.title}</Link>
                  </td>
                  {tableList.map((cell) => (
                    <td key={cell.body} style={cell.style}>
                      {item[cell.body as keyof typeof item] as React.ReactNode}
                    </td>
                  ))}
                  <td>
                    <button
                      // 실제로 나중에는 objectId로 get요청을 보내서 데이터를 가져오게 해야 할 것이다.
                      onClick={() => {
                        setShowModal(true);
                        setModalData(data[item.num - 1]);
                      }}
                    >
                      조회
                    </button>
                  </td>
                </StyledTr>
              ))}
            </tbody>
          </table>
        </TeamPageBody>
      </Teampage>
    </div>
  );
}

export default Board;

const Teampage = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.7rem;
`;

const TeamPageBody = styled.div`
  display: flex;
  justify-content: space-between;
  // background-color: beige;
  width: 100%;
  table {
    width: 100%;
  }

  tr {
    // display: flex;
    justify-content: space-between;
    align-items: center;
  }
  td {
    // display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`;
const TeamPageOption = styled.div`
  display: flex;
  margin: 10px 10px;
`;

const StyledTr = styled.tr`
  height: 4rem;
  margin: 1rem 1rem;
  padding: 2rem 1rem;
  font-size: 1.6rem;

  border-bottom: 0.1rem solid #dddddd;
`;
