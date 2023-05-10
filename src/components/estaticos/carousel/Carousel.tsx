import React from 'react'
import 'react-alice-carousel/lib/alice-carousel.css';
import AliceCarousel from 'react-alice-carousel';

function Carousel() {

  const items = [
    <>
      <img src="https://github.com/tjfaccipieri.png" alt="" />
      <h2>Thiago Faccipieri</h2>
    </>,
    <img src="https://github.com/Wall90s.png" alt="" />,
    <img src="https://github.com/kaluribr.png" alt="" />,
    <img src="https://github.com/JaineSantos0.png" alt="" />,
    <img src="https://github.com/ElizangelaXavierS.png" alt="" />,
  ]

// https://www.npmjs.com/package/react-alice-carousel

  const responsivo = {
    0: {
        items: 1,
    },
    1024: {
        items: 3,
        itemsFit: 'contain',
    }
  }

  return (
    <AliceCarousel
      mouseTracking
      items={items}
      autoPlay
      infinite
      responsive={responsivo}
      disableDotsControls={true}
      disableButtonsControls={true}
      autoPlayInterval={2500} />
      
  )
}

export default Carousel