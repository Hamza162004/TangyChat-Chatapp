import { Search } from 'lucide-react';
import React from 'react'


const Searchbar = ({search,placeholder}) => {
  return (
    // <div className="relative text-gray-600 border-gray-500 border rounded-full my-[27px] mx-4">
    //   <input 
    //     type="search" 
    //     name="search" 
    //     value={search.value}
    //     onChange={search.changeHandler}
    //     placeholder={placeholder} 
    //     className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none" 
    //   />
    //   <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
    //     <svg 
    //       className="h-4 w-4 fill-current" 
    //       xmlns="http://www.w3.org/2000/svg" 
    //       xmlnsXlink="http://www.w3.org/1999/xlink" 
    //       version="1.1" 
    //       id="Capa_1" 
    //       x="0px" 
    //       y="0px" 
    //       viewBox="0 0 56.966 56.966" 
    //       style={{ enableBackground: 'new 0 0 56.966 56.966' }} 
    //       xmlSpace="preserve" 
    //       width="512px" 
    //       height="512px"
    //     >
    //       <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
    //     </svg>
    //   </button>
    // </div>
    <div className="relative mb-6">
            <input
              type="text"
              name="search" 
              value={search?.value || ""}
              onChange={search.changeHandler}
              placeholder={placeholder} 
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
            />
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
    </div>
  );
};


export default Searchbar