import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">

      <div className="w-full h-20 bg-blue-500 text-white flex items-center justify-between rounded-b-lg drop-shadow-[0_4px_4px_rgba(59,130,246,0.5)] px-8">
        <div className="text-3xl font-bold flex items-center cursor-pointer">
          <img src="stethoscope.png" className="w-10 h-10 mr-1" alt="Logo" />
          MediChamber
        </div>
        <div className="flex items-center gap-6 text-2xl">
          <Link href="/login">
            <h5 className="cursor-pointer hover:text-blue-200 font-semibold">Login</h5>
          </Link>
          <Link href="/signup">
            <h5 className="cursor-pointer hover:text-blue-200 font-semibold">SignUp</h5>
          </Link>
        </div>
      </div>


      <div className="flex flex-1 items-center justify-between px-10 py-10 overflow-hidden">

        <div className="flex items-center justify-center ml-22">
          <img
            src="doctor.jpg"
            className="max-w-[500px] w-full object-contain"
            alt="Doctor"
          />
        </div>

        {/* Right: Text */}
            <div className="flex flex-col items-center justify-center w-full max-w-2xl text-center">
      <h1 className="text-5xl font-extrabold">
        Welcome to{" "}
        <span className="text-blue-500">MediChamber</span>
      </h1>
      {/* 3. Removed redundant cursor-pointer from the h2 container */}
      <h2 className="mt-5 text-3xl font-semibold">
        <Link href="/login" className="text-blue-600 hover:underline cursor-pointer">
          Login
        </Link>
        <span> or </span>
        <Link href="/signup" className="text-blue-600 hover:underline">
          SignUp
        </Link>
        <span> to book your slot</span>
      </h2>
    </div>

      </div>

      {/* Footer */}
      <footer className="w-full h-16 bg-blue-500 text-white flex items-center justify-between px-8">
        <p className="text-lg">©2025 MediChamber</p>
        <div className="flex items-center gap-4">
          <img src="whatsapp.png" className="w-10 h-10"></img>
          <p>:+91XXXXXXXXX</p>
        </div>
      </footer>
    </div>
  );
}
