import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../config";

import Button from "../common/Button";
import Card from "../common/Card";
import Heading from "../common/Heading";
import Input from "../common/Input";
import SubHeading from "../common/SubHeading";
interface signinType {
  email: string;
  password: string;
}
const Signin = () => {
  const [signinData, setSigninData] = useState<signinType>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const onClickHandler = async () => {
    const res = await axios({
      method: "post",
      url: `${baseUrl}/api/v1/user/signin`,
      data: signinData,
    });
    if (!res.data.success) {
      alert(res.data.msg);
    } else {
      localStorage.setItem("token", res.data.token);
      navigate("/users");
    }
  };

  return (
    <div>
      <Card>
        <Heading title='Signin' />
        <SubHeading label='Enter your credentials to login' />
        <Input
          label='Email'
          inputType='email'
          placeHolder='johndoe@gmail.com'
          req={true}
          onChangeHandler={(e) => {
            signinData.email = e.target.value;
            setSigninData(signinData);
          }}
        />
        <Input
          label='Password'
          inputType='password'
          placeHolder=''
          req={true}
          onChangeHandler={(e) => {
            signinData.password = e.target.value;
            setSigninData(signinData);
          }}
        />
        <Button label='Signin' onClickHandler={onClickHandler} />
        <div className='flex gap-1 my-2'>
          <p>Dont't have an account? </p>
          <p
            onClick={() => {
              navigate("/Signup");
            }}
            className='underline cursor-pointer'
          >
            Signup
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Signin;
