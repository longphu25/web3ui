import { ChangeEvent, FC } from 'react'
import { classnames } from '../utils/general'

interface CustomInputProps {
  customInput: string
  setCustomInput: (value: string) => void
}

const CustomInput: FC<CustomInputProps> = ({ customInput, setCustomInput }) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCustomInput(e.target.value)
  }

  return (
    <>
      <textarea
        rows={5}
        value={customInput}
        onChange={handleChange}
        placeholder={`Custom input`}
        className={classnames(
          'focus:outline-none w-full border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white mt-2',
        )}
      ></textarea>
    </>
  )
}

export default CustomInput
