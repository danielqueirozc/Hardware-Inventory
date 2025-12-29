import { useAuthStore } from "@/context/auth-store";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [ error, setError ] = useState('')

  const { login } = useAuthStore()

  const navigate = useNavigate()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault()

  const formData = new FormData(event.currentTarget)
  const email = formData.get('email')
  const password = formData.get('password')

  if (!email) {
    setError('Email é obrigatório')
    return
  }

  if (!password) {
    setError('Email é obrigatório')
    return
  }

  try {
    await login({
      email: email as string,
      password: password as string,
    })

    navigate('/dashboard')
    
  } catch (error) {
    if (axios.isAxiosError(error)) {
      setError(error.response?.data?.error || 'Erro ao fazer login')
    } else if (error instanceof Error) {
      setError(error.message)
    }
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
          <h1 className="text-dark-blue font-bold text-3xl">Login</h1>
          <p className="font-medium text-green-800 mt-2">Faça login para continuar</p>

          <div className="flex flex-col gap-10 w-full mt-14">
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

            <Link 
              className="underline font-medium text-dark-blue text-center"
              to="/register"
            >
              Clique aqui se ainda não tem uma conta.
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}