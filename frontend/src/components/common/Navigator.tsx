import { useNavigate } from "react-router-dom";

const Navigator = () => {
  const navigate = useNavigate();
  return (
    <div className='flex gap-1 my-2'>
      <p>Already have an account? </p>
      <p
        onClick={() => {
          navigate("/Signin");
        }}
        className='underline cursor-pointer'
      >
        Signin
      </p>
    </div>
  );
};

export default Navigator;
