import { Link } from "react-router-dom";

export function Introduction() {
  return (
   <div className="flex flex-col h-screen">
     <div className="relative bg-[url('wallpaper-mobile.jpg')] bg-cover bg-no-repeat bg-center h-3/5 rounded rounded-b-[40px]">
     <div className="absolute bg-green/50 w-full h-full rounded rounded-b-[40px]" />
      <img 
        className="relative h-12 mt-8 ml-5 z-10"
        src="/logo-fundo-escuro.svg" 
        alt="" 
      />
    </div>

    <div className="bg-white flex justify-center items-center py-12 px-10">
      <div className="flex flex-col gap-8 justify-center items-center">
        <h1 className="font-bold text-green text-3xl">DQCstock</h1>
        <p className="font-medium text-gray text-lg text-center">Armazene com segurança uma variedade de equipamenos TI.</p>
        <Link
          to="/login"
          className="font-medium text-lg text-white py-4 bg-green w-full rounded-lg flex items-center justify-center"
          type="button"
        >
          Fazer login
        </Link>
      </div>
    </div>
   </div>
  )
} 
