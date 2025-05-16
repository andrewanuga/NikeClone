
const Footer = () => {
  return (
    <div className="w-full h-[1000px] bg-[#232224]">
      <div>
        <div className="w-full h-auto py-3 flex justify-center my-5 items-center">
            <img 
                src="./src/assets/nikeWhiteLogo.png"
                alt="Logo"
                className="w-[100px]"
            />
        </div>
        <div className="w-full text-[#02fa40] h-auto py-3 flex raleway justify-around items-center">
            <p>Find a Store</p>
            <p>Help</p>
            <p>Join Us</p>
        </div>
      </div>
      <div className="w-full text-white raleway text-[20px] cursor-pointer h-auto py-5 mt-7 flex flex-wrap">
        <p className="w-full pl-2 m-3 hover:text-[#02fa40]">Featured</p>
        <p className="w-full pl-2 m-3 hover:text-[#02fa40]">Shoes</p>
        <p className="w-full pl-2 m-3 hover:text-[#02fa40]">Clothing</p>
        <p className="w-full pl-2 m-3 hover:text-[#02fa40]">Kids</p>
      </div>
      <div className="w-full h-7 flex justify-end items-end p-5"><div className="w-full h-[1px] bg-white"></div></div>
      <div className="w-full p-5 flex raleway hover:text-white flex-wrap">
        <div className="w-full cursor-pointer text-[#02fa40] hover:text-white flex h-auto justify-between items-center py-6 border-b border-white">
            <p>Resources</p>
        </div>
        <div className="w-full cursor-pointer text-[#02fa40] hover:text-white flex h-auto justify-between items-center py-6 border-b border-white">
            <p>Help</p>
        </div>
        <div className="w-full cursor-pointer text-[#02fa40] hover:text-white flex h-auto justify-between items-center py-6 border-b border-white">
            <p>Company</p>
        </div>
        <div className="w-full cursor-pointer text-[#02fa40] hover:text-white flex h-auto justify-between items-center py-6 border-b border-white">
            <p>Promotion & Discount</p>
        </div>
        <div className="w-full cursor-pointer flex h-auto justify-between items-center py-6 border-b border-white">
            <p className="text-[#02fa40] hover:text-white">United States</p>
        </div>
      </div>
      <div className="w-full p-5 text-white flex flex-wrap justify-center">
        <p className="w-full text-center">&copy; Nike, Inc All Rights Reserved</p>
        <p className="w-full text-center">Developed and Designed By Andrew</p>
      </div>
    </div>
  );
}

export default Footer;
