import { useAuthStore } from "@/context/auth-store";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Register() {
  const [ error, setError ] = useState('')

  const { register } = useAuthStore()
  
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    
    event.preventDefault()
    
    const formData = new FormData(event.currentTarget)

    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')

    try {
      await register({
        name: name as string,
        email: email as string,
        password: password as string,
      })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.error || 'Erro ao registrar usuário')
      }

      if (error instanceof Error) {
        setError(error.message)
      }

  }
}

  return (
     <div className="flex flex-col px-10 py-12">
      <div className="flex flex-col gap-24 lg:gap-18 md:gap-48">
        <div className="">
           <Link 
            className="bg-green rounded-full h-9 md:h-15 lg:h-12 w-9 md:w-15 lg:w-12 flex items-center justify-center"
            to="/login"
          >
            <ArrowLeft className="text-white md:w-8 md:h-8" />
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
          <h1 className="text-dark-blue font-bold text-3xl md:text-4xl">Crie uma conta</h1>
          <p className="font-medium text-green-800 mt-2 md:text-xl">Crie uma conta para continuar</p>

          <div className="flex flex-col lg:items-center gap-10 w-full lg:w-6/10 mt-14 md:mt-36">
             <div className="flex flex-col gap-2 lg:w-full">
                <label className="text-gray-600 font-medium md:text-xl">Name</label>
                <input
                  className="h-1 md:h-14 w-full bg-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green placeholder:text-gray-600 placeholder:font-normal px-3 md:placeholder:text-lg"
                  placeholder="Nome"
                  type="text"
                  name="name"
                />    
            </div>

            <div className="flex flex-col gap-2 lg:w-full">
              <label className="text-gray-600 font-medium md:text-xl">Email</label>
              <input
                className="h-10 md:h-14 w-full bg-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green placeholder:text-gray-600 placeholder:font-normal px-3 md:placeholder:text-lg"
                placeholder="Email"
                type="email"
                name="email"
              />    
            </div>

            <div className="flex flex-col gap-2 lg:w-full">
              <label className="text-gray-600 font-medium md:text-xl">Senha</label>
              <input
                className="h-10 md:h-14 w-full bg-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green placeholder:text-gray-600 placeholder:font-normal px-3 md:placeholder:text-lg"
                placeholder="Senha"
                type="password"
                name="password"
              />    
            </div>

            <button
              className="w-full lg:w-6/10 h-10 md:h-16 bg-green hover:bg-green-700 hover:transition-all rounded-lg text-white font-medium md:text-lg lg:cursor-pointer mt-14"
              type="submit"
            >
              Criar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}