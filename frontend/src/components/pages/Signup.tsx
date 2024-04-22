import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../config";
import Button from "../common/Button";
import Card from "../common/Card";
import Heading from "../common/Heading";
import Input from "../common/Input";

import SubHeading from "../common/SubHeading";
interface signupType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const Signup = () => {
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState<signupType>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const onClickHandler = async () => {
    const res = await axios({
      method: "post",
      url: `${baseUrl}/api/v1/user/signup`,
      data: signupData,
    });
    if (!res.data.success) {
      alert(res.data.msg);
    }
    localStorage.setItem("token", res.data.token);
    navigate("/users");
  };
  return (
    <div>
      <Card>
        <Heading title='Signup' />
        <SubHeading label='Enter your information to create an account' />
        <div className=' md:grid grid-cols-2 gap-2'>
          <Input
            label='First Name'
            inputType='text'
            placeHolder='John'
            req={true}
            onChangeHandler={(e) => {
              signupData.firstName = e.target.value;
              setSignupData((signupData) => signupData);
            }}
          />
          <Input
            label='Last Name'
            inputType='text'
            placeHolder='Doe'
            req={true}
            onChangeHandler={(e) => {
              signupData.lastName = e.target.value;
              setSignupData((signupData) => signupData);
            }}
          />
        </div>
        <Input
          label='Email'
          inputType='email'
          placeHolder='johndoe@gmail.com'
          req={true}
          onChangeHandler={(e) => {
            signupData.email = e.target.value;
            setSignupData((signupData) => signupData);
          }}
        />
        <Input
          label='Password'
          inputType='password'
          placeHolder=''
          req={true}
          onChangeHandler={(e) => {
            signupData.password = e.target.value;
            setSignupData((signupData) => signupData);
          }}
        />
        <Button label='Signup' onClickHandler={onClickHandler} />
        <div className='flex gap-1 my-2'>
          <p>Already have an account? </p>
          <p
            onClick={() => {
              navigate("/signin");
            }}
            className='underline cursor-pointer'
          >
            Signin
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Signup;
