import { useState } from "react"
import Kidsdata from "../data/Kidsdata"
import SearchBox from "../components/SearchBox"
import Items from "../components/Items"
import Slider2 from "../components/Slider2"
import Footer from "../components/Footer"

const Kids = () => {
  const [query, setQuery] = useState('')
      const [results, setRestults]= useState(Kidsdata)
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
          search(Kidsdata)
          setLoading(false)
          return;
        }
        const filteredItems = Kidsdata.filter(item =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    
        setRestults(filteredItems)
        setLoading(false)
      }
    return (
      <div>
        <div className="w-full h-20 flex justify-center items-center pt-24 bg-[#1e1d20]">
          <SearchBox search={search} value={query}/>
        </div>
              <div className="w-full h-auto p-5 flex flex-wrap items-start justify-center md:justify-start gap-3 bg-[#1e1d20]">
        { loading ? (
            Kidsdata.map((data)=>(
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
        <div className="bg-[#222124] w-full h-auto">
          <Slider2 />
          <Footer/>
        </div>
        </div>
      </div>
    )
}

export default Kids;