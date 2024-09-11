const Input = ({name , type , value , set}) => {
  return (
      <div className="mb-4">
          <label htmlFor={name} className="block mb-2 text-sm font-medium">{name}</label>
          <input
              type={type}
              id={name}
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none w-full py-2.5 px-4"
              placeholder={name}
              required
              value={value}
              onChange={(e) => set(e.target.value)}
          />
      </div>
  )
}
export default Input