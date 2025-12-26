import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export function Register() {
  return (
     <div className="flex flex-col px-10 py-12">
      <div className="flex flex-col gap-24">
        <div className="">
          <Link 
            className="bg-green rounded-full h-9 w-9 flex items-center justify-center"
            to="/"
          >
            <ArrowLeft className="text-white" />
          </Link>
        </div>

        <form className="flex flex-col items-center justify-center">
          <h1 className="text-dark-blue font-bold text-3xl">Crie uma conta</h1>
          <p className="font-medium text-green-800 mt-2">Crie uma conta para continuar</p>

          <div className="flex flex-col gap-10 w-full mt-14">
             <div className="flex flex-col gap-2">
                <label className="text-gray-600 font-medium">Name</label>
                <input
                  className="h-10 w-full bg-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green placeholder:text-gray-600 placeholder:font-normal px-3"
                  placeholder="Nome"
                  type="text"
                  name="nome"
                />    
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-600 font-medium">Email</label>
              <input
                className="h-10 w-full bg-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green placeholder:text-gray-600 placeholder:font-normal px-3"
                placeholder="Email"
                type="email"
                name="email"
              />    
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-600 font-medium">Senha</label>
              <input
                className="h-10 w-full bg-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green placeholder:text-gray-600 placeholder:font-normal px-3"
                placeholder="Senha"
                type="password"
                name="password"
              />    
            </div>

            <button
              className="w-full h-10 bg-green rounded-lg text-white font-medium lg:cursor-pointer mt-14"
              type="submit"
            >
              Entrar
            </button>

            {/* <Link>
            </Link> */}
          </div>
        </form>
      </div>
    </div>
  )
}