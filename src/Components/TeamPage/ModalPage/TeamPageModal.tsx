import React from 'react';
import styled from 'styled-components';

type props = {
  searchMode: string;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalData: any;
  setModalData: React.Dispatch<React.SetStateAction<any>>;
};

function DetailModal(props: props) {
  const modalData = props.modalData;
  const setShowModal = props.setShowModal;
  return (
    <>
      <button
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
        }}
        onClick={() => {
          setShowModal(false);
        }}
      >
        X
      </button>
      <TeamPageBody>
        <table>
          <thead>
            <tr>
              <th>속성</th>
              <th>값</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(modalData).map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{modalData[key]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TeamPageBody>
    </>
  );
}

export default DetailModal;

const TeamPageBody = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: beige;
  width: 90%;
  font-size: 2.5rem;
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
