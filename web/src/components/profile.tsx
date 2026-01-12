import { ArrowLeft, Eye, EyeOff, LogOut, Camera } from "lucide-react";
import { Menu } from "./menu";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "./ui/label";
import { useState } from "react";
import { useAuthStore } from "@/context/auth-store";
import { toast } from "sonner"; // ou seu sistema de notificação

export function Profile() {
  const [isClickedActuallyPassword, setIsClickedActuallyPassword] = useState(false)
  const [isClickedNewPassword, setIsClickedNewPassword] = useState(false)
  const [isUploadingImage, setIsUploadingImage] = useState(false)

  const { user, updateProfileImage } = useAuthStore()

  function handleClickActuallyPassword() {
    setIsClickedActuallyPassword(!isClickedActuallyPassword)
  }

  function handleClickNewPassword() {
    setIsClickedNewPassword(!isClickedNewPassword)
  }

  async function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    
    if (!file) return

    ////////// Validações //////////
    if (!file.type.startsWith('image/')) {
      toast.error('Por favor, selecione apenas imagens!')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('A imagem deve ter no máximo 5MB!')
      return
    }

    setIsUploadingImage(true)

    try {
      await updateProfileImage(file)
      toast.success('Foto de perfil atualizada com sucesso!')
    } catch (error) {
      toast.error('Erro ao atualizar foto de perfil')
      console.error(error)
    } finally {
      setIsUploadingImage(false)
    }
  }

  // URL da imagem - se tiver imageUrl usa ela, senão usa a padrão
  console.log('User imageUrl:', user?.imageUrl)
  const profileImageUrl = user?.imageUrl 
    ? `http://localhost:3333${user.imageUrl}` 
    : "https://github.com/shadcn.png"

  return (
    <div className="flex flex-col bg-gray-200 h-screen">
       <header className="flex items-center justify-between bg-green px-10 py-4">
          <div className="flex gap-4 items-center">
            <Link 
              className="text-white w-10 h-10 bg-green-700 rounded-full flex items-center justify-center" 
              to='/dashboard'
            >
              <ArrowLeft />
            </Link>
            <span className="text-white font-semibold">Perfil</span>
          </div>
    
          <Menu />
        </header>

      <main className="flex flex-col flex-1 justify-between items-center">
        <div className="flex flex-col p-8">
          <div className="flex flex-col items-center gap-4 pb-6 border-b">
            <div className="relative rounded-full border-2 border-green">
              <Avatar className="w-16 h-16">
                <AvatarImage src={profileImageUrl} />
                <AvatarFallback>{user?.name?.charAt(0) || 'CN'}</AvatarFallback>
              </Avatar>

              {/* Botão de câmera sobreposto */}
              <label 
                htmlFor="profile-image-input"
                className={`absolute bottom-0 right-0 w-6 h-6 bg-green rounded-full flex items-center justify-center cursor-pointer hover:bg-green-700 transition-colors ${
                  isUploadingImage ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <Camera className="w-3 h-3 text-white" />
              </label>
              
              {/* Input escondido */}
              <input
                id="profile-image-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
                disabled={isUploadingImage}
              />
            </div>

            <span className="text-green-800 font-medium">{user?.name || 'Usuário'}</span>
            <p>{user?.email || 'email@exemplo.com'}</p>
          </div>

        <form 
          className="flex flex-col items-center gap-8 py-12"
        >
         <div className="flex flex-col gap-3">
           <Label>Senha Atual</Label>
            <div className="flex items-center justify-between gap-2 border border-green-500 rounded-lg px-3 py-2 bg-white">
              <input
                className="w-full h-full focus:outline-none placeholder:text-sm"
                type={isClickedActuallyPassword ? 'text' : 'password'}
                placeholder="Digite sua senha atual"
              />
              <div className="w-px h-9/10 bg-gray-350" />
                <button type="button" onClick={handleClickActuallyPassword}>
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
                  className="w-full h-full focus:outline-none placeholder:text-sm"
                  type={isClickedNewPassword ? 'text' : 'password'}
                  placeholder="Digite a nova senha"
                />
                <div className="w-px h-9/10 bg-gray-350" />
                <button type="button" onClick={handleClickNewPassword}>
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

        </div>

        <Link
          className="mb-12 flex gap-2 text-red-500 font-medium" 
          to='/login'>
          <LogOut className="h-5" />
          Sair
        </Link>
      </main>
    </div>
  )
}