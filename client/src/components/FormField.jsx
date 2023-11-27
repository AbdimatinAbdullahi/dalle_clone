import React from 'react'
import { preview } from '../assets'

const FormField = ({labelName, type, placeholder , name , value, handleChange, isSupriseMe , handleSupriseMe}) => {
  return (
    <div>
      <div className='flex items-center gap-2 mb-2'>
        <label htmlFor={name} className='block text-sm font-medium text-gray-900' >{labelName}</label>
        {isSupriseMe && (
          <button type='button' className='font-semibold text-xs bg-[#ECECF1] py-1 px-2 rounded-[5px] text-black '  onClick={handleSupriseMe} >Suprise Me</button>
        )}
      </div>
      <input name={name} id={name} value={value} placeholder={placeholder}  onChange={handleChange} required type={type} 
      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#2275c9] focus:border-[#2275c9ff] outline-none block w-full p-3'
      />

    </div>
  )
}

export default FormField