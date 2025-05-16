import { useState } from "react";
import ClassicImg from "../components/ClassicImg";
import Footer from "../components/Footer";
import Items from "../components/Items";
import MainNav from "../components/NavMain/MainNav";
import SearchBox from "../components/SearchBox";
import ShopBtn from "../components/ShopBtn";
import Slider from "../components/Slider";
import Slider2 from "../components/Slider2";
import HomeItems from "../data/Homedata"

const Home = () => {
  const [query, setQuery] = useState('')
  const [results, setRestults]= useState(HomeItems)
  const [loading, setLoading] = useState(false)

  const search =(e)=>{
    let value = (e.target.value)
    setQuery(value)
    handleSearch(value)
    console.log(value)
  }
  const handleSearch = async (searchTerm)=> {
    setLoading(true)
    if(!searchTerm.trim()) {
      search(HomeItems)
      setLoading(false)
      return;
    }
    const filteredItems = HomeItems.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setRestults(filteredItems)
    setLoading(false)
  }
  
  return (
    <div className="w-full h-full flex justify-center flex-wrap">
      <Slider />
      <div className="w-full h-auto justify-center bg-[#02fa40] items-center flex">
        <ShopBtn />
      </div>
      <div className="w-full h-20 flex justify-center items-center pt-24 bg-[#1e1d20]">
        <SearchBox search={search} value={query}/>
      </div>
      <MainNav />
      <div className="w-full h-auto p-5 flex flex-wrap items-start justify-center md:justify-start gap-3 bg-[#1e1d20]">
      { loading ? (
          HomeItems.map((data)=>(
            <Items
              key={data.id}
              {...data}
            />
          ))
        ) : results.length > 0 ? (
          results.map((data) => (
            <Items key={data.id} {...data} />
          ))
        ) : (
          <div className="w-full flex justify-center items-center text-5xl h-40 font-bold text-white alegreya">😢😢😢 No results found</div>
        )}
      </div>
      <ClassicImg />
      <Slider2 />
      <Footer />
    </div>
  );
}

export default Home;