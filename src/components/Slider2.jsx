import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

const Slider2 = () => {
    const items = [
        {
          id: 1,
          image: '/src/assets/slider2/airForce.avif',
          title: 'Air Force 1',
        },
        {
          id: 2,
          image: '/src/assets/slider2/airJordan.avif',
          title: 'Air Jordan',
        },
        {
          id: 3,
          image: '/src/assets/slider2/airMax.avif',
          title: 'Air Max',
        },
        {
          id: 4,
          image: '/src/assets/slider2/c1ty.avif',
          title: 'C1TY',
        },
        {
            id: 5,
            image: '/src/assets/slider2/cortez.avif',
            title: 'Cortez',
          },
          {
            id: 6,
            image: '/src/assets/slider2/dunk.avif',
            title: 'Dunk',
          },
          {
            id: 7,
            image: '/src/assets/slider2/fieldGeneral.avif',
            title: 'Field General',
          },
          {
            id: 8,
            image: '/src/assets/slider2/vomero.avif',
            title: 'Vomero',
          },
      ];
    
      // Carousel options
      const options = {
        type: 'loop',
        perPage: 3,
        perMove: 1,
        gap: '1rem',
        pagination: true,
        arrows: true,
        autoplay: true,
        interval: 3000,
        pauseOnHover: true,
        resetProgress: false,
        height: '400px',
        breakpoints: {
          768: {
            height: '300px',
          },
          480: {
            height: '200px',
          },
        },
      };
    
      return (
        <div className='w-full h-auto bg-[#221f24]'>
            <div className='flex justify-center items-center w-full h-auto p-5 bg-[#02fa40]'>
              <h2 className='text-[26px] relative text-[#121212] merriweather my-5 lg:m-10'>Shop The Classic</h2>
            </div>
            <div className="carousel-container bg-transparent">
              <Splide options={options} aria-label="My Carousel">
                {items.map((item) => (
                  <SplideSlide key={item.id}>
                    <div className="carousel-slide cursor-pointer">
                      <img src={item.image} alt={item.title} />
                      <h3 className="slide-title">{item.title}</h3>
                    </div>
                  </SplideSlide>
                ))}
              </Splide>
            </div>
        </div>
  )
}

export default Slider2
