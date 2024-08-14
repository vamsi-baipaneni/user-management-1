import SignupForm from "./components/Signup";

export const metadata = {
    title: 'Sign Up',
    description : 'home page description'
  }
  
  export default function Signup() {
    return (
      <div className="mt-[100px] md:mt-0 flex flex-col items-center justify-center min-h-screen">
        <p className="font-bold text-center text-3xl text-slate-800">Welcome User,</p>
        <p className="font-bold text-center text-3xl text-slate-800">Please add your details using the form below</p>
        <div className="bg-slate-800 mt-[100px] flex w-full max-w-[900px] p-6 rounded-md text-white mx-4 sm:mx-8 md:mx-12 lg:mx-16">
          <SignupForm/>
        </div>
      </div>
    );
  }