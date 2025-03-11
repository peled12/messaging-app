const page = () => {
  return (
    <div className="flex w-full">
      <div className="flex mt-16 w-full justify-around">
        <div className="flex flex-col gap-3 items-center"></div>
        <div className="flex flex-col gap-7 items-center">
          <h1 className="text-8xl max-w-2xl text-center">
            Welcome To The Messaging App
          </h1>
          <h6 className="text-2xl">
            Simply choose a username and password and we'll sign you up!
          </h6>
        </div>
      </div>
    </div>
  );
};

export default page;
