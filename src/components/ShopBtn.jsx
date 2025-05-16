import { useNavigate } from "react-router-dom";

const ShopBtn = () => {
    const navigate = useNavigate
  return (
      <div onClick={navigate("/shop")} className="cursor-pointer py-2 px-7 bg-[#02fa40] raleway rounded-4xl m-3">
        Shop Now
      </div>
  );
}

export default ShopBtn;
