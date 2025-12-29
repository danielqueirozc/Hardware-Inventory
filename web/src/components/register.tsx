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

    console.log({
      name,
      email,
      password,
    })

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

      console.log(error)
  }
}

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

        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
          <h1 className="text-dark-blue font-bold text-3xl">Crie uma conta</h1>
          <p className="font-medium text-green-800 mt-2">Crie uma conta para continuar</p>

          <div className="flex flex-col gap-10 w-full mt-14">
             <div className="flex flex-col gap-2">
                <label className="text-gray-600 font-medium">Name</label>
                <input
                  className="h-10 w-full bg-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green placeholder:text-gray-600 placeholder:font-normal px-3"
                  placeholder="Nome"
                  type="text"
                  name="name"
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
              Criar
            </button>

            {/* <Link>
            </Link> */}
          </div>
        </form>
      </div>
    </div>
  )
}