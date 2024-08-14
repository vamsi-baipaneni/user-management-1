import SignupForm from "./components/Signup";

export const metadata = {
    title: 'Sign Up',
    description : 'home page description'
  }
  
  export default function Signup() {
    return (
      <div className="mt-[200px] flex flex-col items-center justify-center min-h-screen md:mb-[100px]">
        <p className="font-bold text-center text-3xl text-slate-800">Welcome User,</p>
        <p className="font-bold text-center text-3xl text-slate-800">Please add your details using the form below</p>
        <div className="bg-slate-800 mt-[100px] flex w-auto md:w-full md:max-w-[900px] p-6 rounded-md text-white">
          <SignupForm/>
        </div>
      </div>
    );
  }