import React from 'react';
import styled from 'styled-components';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import FindingMember from '../Components/TeamPage/Contents/FindingMember';
import FindingTeam from '../Components/TeamPage/Contents/FindingTeam';
import TeamPageModal from '../Components/TeamPage/Layout/TeamPageModal';

function TeamPage() {
  const [searchMode, setSearchMode] = React.useState<string>('all'); // 사용을 안 할것 같기도 하네..
  const [data, setData] = React.useState<any[]>([]); // axios 할 때 사용할 수 있으므로 남겨둔다.
  const [findingTeam, setFindingTeam] = React.useState<boolean>(true);
  const [findingMember, setFindingMember] = React.useState<boolean>(true);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [modalData, setModalData] = React.useState<any>([]);

  return (
    <>
      <Header />
      <div
        style={{
          display: 'grid',
          gridAutoRows: 'min-content',
          height: '100rem',
        }}
      >
        <Teampage>
          <TeamPageHeader>
            <TeamPageOption>
              <button
                onClick={() => {
                  // setSearchMode('all');
                  setFindingTeam(true);
                  setFindingMember(true);
                }}
              >
                모두 보기
              </button>
              <button
                onClick={() => {
                  setFindingMember(true);
                  setFindingTeam(false);
                }}
              >
                팀원 구해요
              </button>
              <button
                onClick={() => {
                  setFindingMember(false);
                  setFindingTeam(true);
                }}
              >
                팀 구해요
              </button>
            </TeamPageOption>
            <button
              style={{
                display: 'flex',
                marginLeft: 'auto',
                height: 'fit-content',
                alignItems: 'center',
                marginTop: 10,
                marginRight: 7,
              }}
            >
              글 작성하기
            </button>
          </TeamPageHeader>
        </Teampage>
        {showModal && (
          <TeamPageModal
            searchMode={searchMode}
            showModal={showModal}
            setShowModal={setShowModal}
            modalData={modalData}
            setModalData={setModalData}
          />
        )}
        {findingMember && (
          <FindingMember
            searchMode={searchMode}
            showModal={showModal}
            setShowModal={setShowModal}
            modalData={modalData}
            setModalData={setModalData}
          />
        )}
        {findingTeam && (
          <FindingTeam
            searchMode={searchMode}
            showModal={showModal}
            setShowModal={setShowModal}
            modalData={modalData}
            setModalData={setModalData}
          />
        )}
      </div>
      <Footer />
    </>
  );
}

export default TeamPage;

const Teampage = styled.div`
  display: flex;
  justify-content: center;
`;
const TeamPageHeader = styled.div`
  display: flex;
  width: 70%;
  background-color: yellowgreen;
`;
const TeamPageOption = styled.div`
  display: flex;
  margin: 10px 10px;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
`;

const ModalPage = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50rem;
  height: 50rem;
  background-color: rgba(255, 255, 255);
  z-index: 999;
`;
