import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import GroundDummy from '../Components/GroundDetail/dummyData_groundDetail';
import OneMarkerMap from '../Components/GroundDetail/OneMarkerMap';
import ScrollToTarget from '../Components/ScrollToTarget';
import ClipUrl from '../ClipUrl';
import GroundDetailCarousel from '../Components/GroundDetail/groundDetailCarousel';
import starIcon from '../styles/icon/star.svg';
import homeIcon from '../styles/icon/home.svg';

interface groundDataType {
  title: string;
  image: string[];
  address: {
    shortAddress: string;
    fullAddress: string;
  };
  provided: string[];
  nonProvided: string[];
  reservation: {
    [key: string]: string[];
  };
  url: string;
  source: string;
}

const GroundDetail = () => {
  const [groundData, setGroundData] = useState<groundDataType>();
  const [reservationData, setReservationData] = useState<string[]>([]);

  useEffect(() => {
    setGroundData(GroundDummy);
  }, []);

  useEffect(() => {
    if (groundData) {
      setReservationData(Object.keys(groundData.reservation));
    }
  }, [groundData]);

  return (
    <>
      <Header />
      <GroundDetailContainer>
        <div className="slider">
          {groundData && <GroundDetailCarousel groundImg={groundData.image} />}
        </div>
        <GroundDetailHeader>
          <GroundDetailHeaderContent>
            <p>{groundData && groundData.address.shortAddress}</p>
            <h2>{groundData && groundData.title}</h2>
            <HeaderAddress>
              <div>{groundData && groundData.address.fullAddress}</div>
              <p
                className="copy"
                onClick={() =>
                  groundData &&
                  ClipUrl(
                    groundData.address.fullAddress,
                    '주소가 복사되었습니다.'
                  )
                }
              >
                주소복사
              </p>
              <p onClick={() => ScrollToTarget('mapElement')}>지도보기</p>
            </HeaderAddress>
          </GroundDetailHeaderContent>
          <GroundDetailHeaderBtn>
            <button>
              <a href={groundData && groundData.url}>
                <img src={homeIcon} alt="" />
                홈페이지 바로가기
              </a>
            </button>
            <button>
              <img src={starIcon} alt="" />찜
            </button>
          </GroundDetailHeaderBtn>
        </GroundDetailHeader>
        <Source>
          이 구장 정보는 <span>{groundData && groundData.source}</span>에서
          제공됩니다.
        </Source>

        <ContentsBox>
          <ContentsTitle>
            <h2>🏷 시설 특징</h2>
            <p>
              변경 가능성이 있으므로 정확한 정보는 홈페이지에서 확인해주세요.
            </p>
          </ContentsTitle>
          <ProvidedItems>
            <p>제공 항목</p>
            <ul>
              {groundData &&
                groundData.provided.map((data) => <li key={data}>{data}</li>)}
            </ul>
          </ProvidedItems>
          <ProvidedItems className="non">
            <p>비제공 항목</p>
            <ul>
              {groundData &&
                groundData.nonProvided.map((data) => (
                  <li key={data}>{data}</li>
                ))}
            </ul>
          </ProvidedItems>
        </ContentsBox>
        <ContentsBox id="mapElement">
          <ContentsTitle>
            <h2>🗺 위치</h2>
          </ContentsTitle>
          <div>
            {groundData && (
              <OneMarkerMap address={groundData.address.fullAddress} />
            )}
          </div>
          <GroundAddressDetail>
            <p>{groundData && groundData.address.fullAddress}</p>
            <p
              onClick={() =>
                groundData &&
                ClipUrl(
                  groundData.address.fullAddress,
                  '주소가 복사되었습니다.'
                )
              }
            >
              주소 복사
            </p>
          </GroundAddressDetail>
        </ContentsBox>
        <ContentsBox>
          <ContentsTitle>
            <h2>📝 예약 취소 및 환불 규정</h2>
            <p>
              변경 가능성이 있으므로 정확한 정보는 홈페이지에서 확인해주세요.
            </p>
          </ContentsTitle>
          <ReservationDetailContent>
            <div>
              {reservationData &&
                reservationData.map((data) => (
                  <>
                    <h3 key={data}>{data}</h3>
                    {groundData &&
                      groundData.reservation[data].map((liData) => (
                        <li key={liData}>{liData}</li>
                      ))}
                  </>
                ))}
            </div>
          </ReservationDetailContent>
        </ContentsBox>
      </GroundDetailContainer>
      <Footer />
    </>
  );
};

export default GroundDetail;

const GroundDetailContainer = styled.div`
  width: 98.5rem;
  margin: 0 auto;
  padding: 0 2rem;
`;

const GroundDetailHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 4rem;
`;

const GroundDetailHeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3rem auto;
  > p {
    font-size: 1.7rem;
    font-weight: 600;
  }
  > h2 {
    font-size: 2.8rem;
    font-weight: 400;
    margin: 0.5rem auto;
  }
`;

const HeaderAddress = styled.div`
  display: flex;
  font-size: 1.5rem;
  cursor: pointer;
  p {
    color: #727f88;
    text-decoration: underline;
    :nth-child(2) {
      margin: auto 1rem auto 2rem;
    }
  }
`;

const GroundDetailHeaderBtn = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    width: 20rem;
    height: 5rem;
    color: white;
    background: #09cf00;
    border: 1px solid #09cf00;
    box-shadow: 0px 0px 4px 2px rgba(55, 53, 47, 0.4);
    border-radius: 4px;
    :last-child {
      width: 8rem;
      margin-left: 1.3rem;
    }
    > a {
      color: white;
    }
    img {
      width: 2rem;
      vertical-align: middle;
      margin: 0 0.8rem 0.4rem 0;
    }
  }
`;

const Source = styled.div`
  margin: auto;
  width: 90rem;
  height: 8rem;
  background-color: #f7f7f7;
  border-radius: 1rem;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  line-height: 7.5rem;
  span {
    color: #09cf00;
  }
`;

const ContentsBox = styled.div`
  box-sizing: border-box;
  border-bottom: 16px solid #f8fafb;
  padding: 3rem;
`;

const ContentsTitle = styled.div`
  > h2 {
    font-size: 2.2rem;
    font-weight: 700;
    margin: 0.6rem 0;
  }
  > p {
    font-size: 1.4rem;
    font-weight: 350;
    color: #8a8a8a;
  }
`;

const ProvidedItems = styled.div`
  > ul li {
    display: inline;
    height: 4rem;
    padding: 0.7rem 1.7rem;
    margin-right: 1.2rem;
    border: 0.1rem solid #eeeeee;
    border-radius: 2rem;
    font-size: 1.5rem;
    font-weight: 500;
    :nth-child(3n + 1) {
      color: #7a6fce;
      background-color: #f3f1ff;
    }
    :nth-child(3n + 2) {
      color: #98212b;
      background: #f7f7f7;
    }
    :nth-child(3n) {
      color: #009e5c;
      background: #f2fff1;
    }
  }
  .non > ul li {
    color: #5d5d5d;
    background: #eeeeee;
    text-decoration: line-through;
  }
  > p {
    display: inline-block;
    height: 2.7rem;
    padding: 0.3rem 0.8rem;
    margin: 3rem 0 2.6rem 0;
    background: #fafafa;
    border-radius: 0.4rem;

    font-size: 1.5rem;
    font-weight: 400;
    color: #888888;
    line-height: 2rem;
  }
`;

const GroundAddressDetail = styled.div`
  display: flex;
  font-size: 1.7rem;
  p:nth-child(2) {
    margin-left: 2rem;
    color: #727f88;
    font-weight: 500;
    text-decoration: underline;
    cursor: pointer;
  }
`;

const ReservationDetailContent = styled.div`
  h3 {
    font-size: 1.6rem;
  }
  li {
    font-size: 1.6rem;
    margin-bottom: 0.4rem;
  }
`;
