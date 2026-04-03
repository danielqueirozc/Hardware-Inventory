import { Eye } from "lucide-react";
import { Label } from "./ui/label";
import { useEffect, useState } from "react";
import { authServie } from "@/lib/axios";

export function ProfileSecurity() {
  // mudar de password para text nos inputs
  const [currentPasswordClicked, setCurrentPasswordClicked] = useState<boolean>(false)
  const [newPasswordClicked, setNewPasswordClicked] = useState<boolean>(false)

  // trocar a senha
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
      } catch (error) {
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

    // if (!canSubmit) return



    try {
      await authServie.changePassword(newPassword)

    } catch (error) {
      console.error('Erro ao trocar senha:', error)
    }
  }
  

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-16">
      <div className="flex justify-between">
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <Label>Sua Senha</Label>

              { isCurrentPasswordValid === false && (
                <p className="text-sm text-red-500 font-semibol">
                  Senha incorreta
                </p>
              ) }

              <div className={`flex items-center justify-between gap-2 rounded-lg border ${ isCurrentPasswordValid === true || isCurrentPasswordValid === null ? 'border-green-500' : 'border-red-500' } focus:outline-none focus:ring focus:ring-green-600 w-96 px-4`}>
                <input
                  className=" py-2 w-full focus:outline-none"
                  name="name"
                  type={currentPasswordClicked ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />

                <button type="button" onClick={() => setCurrentPasswordClicked(!currentPasswordClicked)} className="cursor-pointer border-l-2 border-gray-300 pl-2">
                  { currentPasswordClicked ? (
                    <EyeOff className="text-green" />
                  ) : (
                  <Eye className="text-green" />
                </button>
              </div>

            </div>
           <div className="flex flex-col gap-3">
              <Label>Nova Senha</Label>
             <div className="flex items-center justify-between gap-2 rounded-lg border border-green-600 focus:outline-none focus:ring focus:ring-green-600 w-96 px-4">
               <input
                className=" py-2 w-full focus:outline-none"
                name="name"
                  type={newPasswordClicked ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

                <button type="button" onClick={() => setNewPasswordClicked(!newPasswordClicked)} className="cursor-pointer border-l-2 border-gray-300 pl-2">
                  { newPasswordClicked ? (
                    <EyeOff className="text-green" />
                  ) : (
                <Eye className="text-green" />
              </button>
             </div>
             
            </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          // disabled={canSubmit === false}
          type="submit" 
          className="bg-green font-medium px-8 py-2 cursor-pointer rounded-lg text-white"
        >
          Salvar
        </button>
      </div>
    </form>
  )
}