import { useEffect, useState } from "react"
import { Label } from "./label"
import { Eye, EyeOff } from "lucide-react"
import { authServie } from "@/lib/axios"
import { toast } from "sonner"

export function ChangePasswordForm() {
  const [isClickedActuallyPassword, setIsClickedActuallyPassword] = useState<boolean>(false)
  const [isClickedNewPassword, setIsClickedNewPassword] = useState<boolean>(false)
  const [ currentPassword, setCurrentPassword ] = useState<string>('')
  const [ newPassword, setNewPassword ] = useState<string>('')
  
  // state validation: Quando a requisição para o backend está em andamento (mostra o spinner girando)
  // como se fosse um isLoading
  const [isValidatingCurrent, setIsValidatingCurrent] = useState<boolean>(false)

  // state result validation: O resultado da validação. Pode ter 3 valores,
  // null = ainda não validou (usuário não digitou nada ou acabou de apagar)
  // true = senha correta
  // false = senha incorreta
  const [isCurrentPasswordValid, setIsCurrentPasswordValid] = useState<boolean | null>(null)
  
  // state button: habilita ou desabilita o botão de submit
  const [canSubmit, setCanSubmit] = useState<boolean>(false)

  useEffect(() => {
    if (currentPassword.length === 0) {
      setIsCurrentPasswordValid(null)
      return
    }

    // se o usuario digitar no input
    // a cada 500 ms esse bloco é chamado
    const timer = setTimeout(async () => {
      setIsValidatingCurrent(true)

      try {
        const result = await authServie.verifyCurrentPassword(currentPassword)
        setIsCurrentPasswordValid(result.valid)
        console.log(result.valid)
      } catch (error) {
        console.log('Erro ao validar senha', error)
        setIsCurrentPasswordValid(false)
      } finally {
        setIsValidatingCurrent(false)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, 
  [currentPassword])

  // Habilita o botão apenas se tudo estiver válido

  useEffect(() => {
    const isValid = 
      isCurrentPasswordValid === true &&
      newPassword.length >= 6

      setCanSubmit(isValid)
  }, [isCurrentPasswordValid, isValidatingCurrent])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log('esta indo')

    // if (!canSubmit) return

    console.log('esta indo aqui tb')


    try {
      console.log('mandando o password', newPassword)
      const result = await authServie.changePassword(newPassword)
      console.log('recebendo', result)

    } catch (error) {
      console.error('Erro ao trocar senha:', error)
    }
  }

  return (
     <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-8 py-12"
      >
         <div className="flex flex-col gap-3">
           <Label>Senha Atual</Label>

            { isCurrentPasswordValid === false && (
              <p className="text-sm text-red-500 font-semibol">
                Senha incorreta
              </p>
            ) }

            <div className={`flex items-center justify-between gap-2 border border-green-500 ${isCurrentPasswordValid === true || isCurrentPasswordValid === null ? 'border-green-500' : 'border-red-500' } rounded-lg px-3 py-2 bg-white`}>
              <input
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full h-full focus:outline-none placeholder:text-sm"
                type={isClickedActuallyPassword ? 'text' : 'password'}
                placeholder="Digite sua senha atual"
              />
              <div className="w-px h-9/10 bg-gray-350" />
                <button type="button" onClick={() => setIsClickedActuallyPassword(!isClickedActuallyPassword)}>
                  {isClickedActuallyPassword ? (
                    <EyeOff className="text-green w-4 h-4" />
                  ) : (
                    <Eye className="text-green w-4 h-4" />
                  )}
              </button>
            </div>
         </div>

          <div className="flex flex-col gap-3">
            <Label>Nova Senha</Label>
              <div className="flex items-center justify-between gap-2 border border-green-500 rounded-lg px-3 py-2 bg-white">
                <input
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full h-full focus:outline-none placeholder:text-sm"
                  type={isClickedNewPassword ? 'text' : 'password'}
                  placeholder="Digite a nova senha"
                />
                <div className="w-px h-9/10 bg-gray-350" />
                <button type="button" onClick={() => setIsClickedNewPassword(!isClickedNewPassword)}>
                  {isClickedNewPassword ? (
                    <EyeOff className="text-green w-4 h-4" />
                  ) : (
                    <Eye className="text-green w-4 h-4" />
                  )}
                </button>
              </div>
          </div>

          <button
            className="bg-green-700 text-white text-sm font-medium px-6 py-2 rounded-md mt-4" 
            type="submit"
          >
            Mudar Senha
          </button>
      </form>
  )
}