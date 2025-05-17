import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import TypewriterText from './TypewriterText';

const Slider = () => {
  return (
    <div className='flex justify-center items-center bg-[#212022] flex-wrap gap-4 p-10'>
        <div className='w-[90%] rounded-4xl overflow-hidden'>
        <Splide
          options={{
            type: 'loop',
            drag: 'free',
            focus: 'center',
            perPage: 3,
            arrows: false,
            pagination: false,
            autoScroll: {
              speed: 1,          // Speed (0-1 where 1 is fastest)
              pauseOnHover: true,
              pauseOnFocus: false,
            },
          }}
          extensions={{ AutoScroll }}
          aria-label="My Favorite Images"
        >
          <SplideSlide>
            <img src="/src/assets/nike6.jpg" alt="Image 1"/>
          </SplideSlide>
          <SplideSlide>
            <img src="/src/assets/nike4.jpeg" alt="Image 2"/>
          </SplideSlide>
          <SplideSlide>
            <img src="/src/assets/nike5.jpeg" alt="Image 3"/>
          </SplideSlide>
        </Splide>
        </div>
        <div className={`text-center text-[40px] md:text-[50px] lg:text-[70px] anton text-white z-[2]`}>
            The taste of <div className='text-[#02fa40]'> A <TypewriterText texts={['VICTOR', 'WINNER', 'BOSS']} />
            </div>
        </div>
    </div>
  );
}

export default Slider;
