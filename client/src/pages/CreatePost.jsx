import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {preview} from '../assets';
import {getRandomPrompt} from '../utils';
import {FormField, Loader} from '../components';
const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: ""
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateImage = async ()=>{
      if(form.prompt){
        try {
          setGeneratingImg(true);
          const response = await fetch('http://localhost:8080/api/v1/dalle/', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({prompt: form.prompt})
          });
          const data = await response.json();
          setForm({...form, photo: `data:image/jpeg;base64,${data.photo}`})
        } catch (error) {
           alert(error)
        } finally{
          setGeneratingImg(false);
        }
      } else {
        alert('Please Enter A Prompt')
      }
  }

  const handleChange = (e)=>{
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handleSubmit =async (e)=>{
    e.preventDefault();
    if(form.prompt && form.photo){
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8080/api/v1/post',{
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        });

        await response.json();
        navigate('/');
      } catch (error) {
        alert(error);
      }finally{
        setLoading(false);
      }
    }else{
      alert('Enter The prompt And Generate An image')
    }
  }

  const handleSupriseMe = ()=>{
    const randomPrompts = getRandomPrompt(form.prompt);
    setForm({...form , prompt: randomPrompts})
  }

  return (
    <section>
       <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]' >
          Hello, Here To create Visually Appealing Photos For You
        </h1>
        <p className='mt-2 text-[#666e75] text-[14px] max-w[500px]' >Create Collection Of Imaginative And Visualy Stunning Images Genreated by DALLE-AI And Share It with Your Community</p>
      </div>
      <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
          <FormField labelName="Your Name"
          type="text"
          name="name"
          placeholder="Enter Your Name"
          value={form.name}
          handleChange={handleChange}
          />
          <FormField
          labelName="Enter A prompt"
          type="text"
          name="prompt"
          placeholder="A plush toy robot sitting against a yellow Wall"
          value={form.prompt}
          handleChange={handleChange}
          isSupriseMe
          handleSupriseMe={handleSupriseMe}
          />
        <div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center'>
        {form.photo ? (
          <img src={form.photo} alt={form.photo} className='w-full h-full object-contain' />
        ): (
          <img src={preview} alt={preview} className='w-9/12 h-9/12 object-contain opacity-40' />
        )};
        {
          generatingImg && (
            <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)]'>
            <Loader/>
            </div>
          )
        }
      </div>
      </div>
      <div className='mt-5 flex gap-5' >
        <button type='button' onClick={generateImage} className='w-full  h-10 bg-green-700 rounded-md  text-white' >
          {generatingImg ? 'Generating...' : 'Generate'}
        </button>
      </div>
      
      <div className='mt-10' >
        <p className='mt-2 text-[#666e75] text-[14px]' >Once Created, You can share it With Others in community</p>
        <button className= 'mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full  px-5 py-2.5 text-center'>
          {loading ? 'Sharing' : 'Share With Community'}
          </button>
      </div>

      </form>  
    </section>
  )
}

export default CreatePost