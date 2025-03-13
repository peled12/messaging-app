import "../auth.css";
import CustomForm from "../CustomForm";

const page = () => {
  return (
    <div className="flex w-full px-12">
      <div className="flex mt-16 w-full justify-center gap-[15vw]">
        <CustomForm title="Sign Up" />
        <div className="flex flex-col gap-7 items-center">
          <h1 className="text-8xl max-w-2xl text-center">
            Welcome To The Messaging App
          </h1>
          <h6 className="text-2xl">
            Simply choose a username and password and we'll sign you up!
          </h6>
        </div>
      </div>
      <div className="custom-loader"></div>
    </div>
  );
};

export default page;
