const Button = ({
  label,
  onClickHandler,
}: {
  label: string;
  onClickHandler: () => void;
}) => {
  return (
    <button
      onClick={onClickHandler}
      className='bg-green-500 text-white p-2 rounded-md w-full my-2 font-bold tracking-widest hover:bg-green-400'
    >
      {label}
    </button>
  );
};

export default Button;
