import React from 'react';
import styled from 'styled-components';
import ScrollCarousel from 'scroll-carousel-react';

const CarouselItem = styled.img`
  border-radius: 8px; /* 圆角 */
  height: 22px; /* 高度36像素 */
  //width: 100px; /* 宽度100像素 */
  margin-right: 2%; /* 右边距10像素 */
`
const Container = styled.div`
margin-top: auto; /* 維持在最底部*/
    width : 100%;
`
const PhotoContainer = styled.div`
    width: 80%;
    height: 35px;
    //background: url(https://www.bybit.com/bybit-new-landing/_next/static/media/partner-bg.40169d7a.png) #fff;
    background-color : #7D7F8C;
    //overflow: hidden;
    display: flex;
    align-items: center;
`
let photo = ['./exchangeLogo/binance.png', './exchangeLogo/coinbase.png', './exchangeLogo/kraken.png', './exchangeLogo/kucoin.png', './exchangeLogo/bybit.png',
    './exchangeLogo/okx.png', './exchangeLogo/bingx.png', './exchangeLogo/bitget.png', './exchangeLogo/upbit.png', './exchangeLogo/bitfinex.png',
    './exchangeLogo/gate.io.png', './exchangeLogo/mexc.png'];

// 將首尾項目複製一份，然後插入到陣列的開始和結束
const duplicatedPhotos = [...photo, ...photo, ...photo, ...photo, ...photo, ...photo, ...photo, ...photo, ...photo];

const Carousel = () => {
    return (
        <Container>
            <ScrollCarousel autoplay autoplaySpeed={2} speed={2} onReady={() => console.log('I am ready')}>
                <PhotoContainer>
                    {duplicatedPhotos.map((item, index) => (
                        <CarouselItem key={index} src={item} alt={`carousel-item-${index}`} />
                    ))}
                </PhotoContainer>
            </ScrollCarousel>
        </Container>
    );
};


export default Carousel;
