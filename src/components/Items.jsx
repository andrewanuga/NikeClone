
const Items = ({imgSrc, title, brand, price}) => {
  return (
    <div className="flex flex-wrap boxshadow w-56 h-[350px] rounded-xl bg-[] grow max-w-80">
        <div className="w-full">
            <div className="p-2 absolute z-40 cursor-pointer">❤️</div>
            <img src={imgSrc} alt={title} className="w-full h-50 rounded-t-xl object-cover"/>
        </div>
        <div className="flex justify-center flex-wrap">
            <p className="w-full pl-5 grow pt-2 text-white merriweather"> {brand + title ? <> {brand + " " + title}</> : " "} </p>
            <p className="w-full pl-5 grow text-stone-300 text-[10px] merriweather"> {price} </p>
            <div className="w-56 h-auto grow max-w-80 p-3 flex justify-center items-center gap-2">
                <button className="w-[45%] h-auto py-2 text-[#121212] bg-[#02fa40] rounded-md hover:text-white transition-all duration-150 cursor-pointer hover:bg-[#1e1e1f] hovershadoweffect">Buy Now</button>
                <button className="w-[45%] h-auto py-2 hover:text-[#121212] border-2 hover:bg-[#02fa40] rounded-md text-white transition-all duration-150 cursor-pointer bg-[#1e1e1f]">Add to Cart</button>
            </div>
        </div>
    </div>
  );
}

export default Items;
