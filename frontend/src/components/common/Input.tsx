import { ChangeEvent } from "react";

interface InputProps {
  label: string;
  inputType: string;
  placeHolder: string;
  req: boolean;
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}
const Input = ({
  label,
  inputType,
  placeHolder,
  req = false,
  onChangeHandler,
}: InputProps) => {
  const id: string = String(Math.round(Math.random() * 100000000000));
  return (
    <div>
      <label htmlFor={id} className='block my-2 text-xl'>
        {label}
      </label>
      <input
        type={inputType}
        id={id}
        placeholder={placeHolder}
        {...(req ? { required: true } : {})}
        onChange={onChangeHandler}
        className='border-sm border-2 w-full p-2'
      />
    </div>
  );
};

export default Input;
