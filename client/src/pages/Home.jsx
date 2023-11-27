import React, {useEffect, useState} from 'react'
import { Loader, Card, FormField } from '../components';

const RenderCards = ({data, title})=>{
  if(data?.length > 0){
    return data.map((post)=> <Card key={post._id} {...post} />)
  }
  return (
    <h2 className='mt-5 font-bold text-[#6449ff] text-xl uppercase' >{title}</h2>
  )
}

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPost, setAllPost] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [searchTimeOut, setSearchTimeOut] = useState(null);

  useEffect(()=>{
    const fetchPosts = async ()=>{
      setLoading(false);
      try {
        const response = await fetch('http://loaclhost/8080/api/v1/post',{
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
        });

        if(response.ok){
          const result = await response.json();
          setAllPost(result.data.reverse)
        }
      } catch (error) {
        alert(error);
      }
    }
  },[]);


  const handleSearch = (e)=>{
    clearTimeout(searchTimeOut);
    setSearchText(e.target.value);
    setSearchTimeOut(
      setTimeout(() => {
        const searchResults = allPost.filter((item)=> item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
        setSearchResults(searchResults);
      }, 500)
    );
  }

  return (
    <section className='max-w-7xl mx-auto '>

      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]' >
          Hello, Welcome To Home
        </h1>
        <p className='mt-2 text-[#666e75] text-[14px] max-w[500px]' >Browse Through the collection of imaginative and visualy stunning images genreated by DALLE-AI</p>
      </div>

      <div className='mt-16' >
        <FormField labelName='Search Posts'
        type={'text'}
        name="text"
        placeholder={'Search Posts'}
        value={searchText}
        handleChange={handleSearch}
        />
      </div>

      <div className='mt-10' >
        {loading ? (
          <div className='flex justify-center items-center' >
            <Loader/>
          </div>
        ): (
          <>
          {searchText &&(
            <div className='font-medium text-[#666e75] text-xl mb-3 ' >Showing Results For {searchText}</div>
          )}
          <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
            {searchText ? (
              <RenderCards data={searchResults} title='No Search Results Is Found' />
            ) : (
              <RenderCards data={allPost} title='No Post Is Found' />
            )}
          </div>
          </>
        )}
      </div>

      
    </section>
  )
}

export default Home
