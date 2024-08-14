import Image from "next/image";

export const metadata = {
  title: 'Home',
  description : 'home page description'
}

export default function Home() {
  return (
    <div className="mt-[200px]">
      <p className="font-bold text-center text-3xl">Home</p>
    </div>
  );
}
