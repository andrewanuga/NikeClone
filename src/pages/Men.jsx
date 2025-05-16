import { useState } from "react";
import Footer from "../components/Footer";
import MenData from "../data/MenData";
import SearchBox from "../components/SearchBox";
import Items from "../components/Items";
import Slider2 from "../components/Slider2";
import TypewriterText from "../components/TypewriterText";

const Men = () => {
  const [query, setQuery] = useState('')
  const [results, setRestults]= useState(MenData)
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
      search(MenData)
      setLoading(false)
      return;
    }
    const filteredItems = MenData.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setRestults(filteredItems)
    setLoading(false)
  }
  return (
    <div>
        <div className={`text-center text-[40px] md:text-[50px] lg:text-[70px] my-5 anton text-white z-[2]`}>
            BECOME <div className='text-[#02fa40]'> THE <TypewriterText texts={['ALPHA', 'BOSS', "NO' 1"]} />
            </div>
        </div>
      <div className="w-full h-20 flex justify-center items-center pt-24 bg-[#1e1d20]">
        <SearchBox search={search} value={query}/>
      </div>
      <div className="w-full h-auto p-5 flex flex-wrap items-start justify-center md:justify-start gap-3 bg-[#1e1d20]">
      { loading ? (
          MenData.map((data)=>(
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
      <div className="bg-[#222124]">
        <Slider2 />
        <Footer/>
      </div>
    </div>
  )
}

export default Men