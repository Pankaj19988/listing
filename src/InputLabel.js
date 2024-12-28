import React from 'react'

const InputLabel = ({ placeholder, type, name, value, onChange }) => {
    return (
        <div className="relative float-label-input">
            <input
                type={type}
                id="name"
                name={name}
                value={value}
                onChange={onChange}
                placeholder=""
                className="block w-full bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-md py-3 px-3 appearance-none leading-normal focus:border-blue-400"
            />
            <label htmlFor="name" className="absolute top-3 left-0 text-gray-400 pointer-events-none transition duration-200 ease-in-outbg-white px-2 text-grey-darker">{placeholder}</label>
        </div>
    )
}

export default InputLabel
