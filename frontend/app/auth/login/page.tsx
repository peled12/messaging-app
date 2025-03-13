import "../auth.css";
import CustomForm from "../CustomForm";

const page = () => {
  return (
    <div className="flex w-full px-12px">
      <div className="flex mt-16 w-full justify-center gap-[15vw] mb-10">
        <CustomForm title="Login" />
        <div className="flex flex-col gap-7 items-center max-w-[50vw] text-center">
          <h1 className="text-8xl max-w-2xl text-center">Welcome Back!</h1>
          <h6 className="text-2xl">
            Enter your username and password and we'll quickly sign you in!
          </h6>
        </div>
      </div>
      <div className="custom-loader"></div>
    </div>
  );
};

export default page;
