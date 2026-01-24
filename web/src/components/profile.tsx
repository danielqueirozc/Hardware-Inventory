import { ArrowLeft, Eye, EyeOff, LogOut, Camera } from "lucide-react";
import { Menu } from "./menu";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react";
import { useAuthStore } from "@/context/auth-store";
import { toast } from "sonner"; // ou seu sistema de notificação
import { ChangePasswordForm } from "./ui/change-password-form";

export function Profile() {
  const [isUploadingImage, setIsUploadingImage] = useState(false)

  const { user, updateProfileImage, logout } = useAuthStore()

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

        <ChangePasswordForm />

        </div>

        <Link
          onClick={logout}
          className="mb-12 flex gap-2 text-red-500 font-medium" 
          to='/login'>
          <LogOut className="h-5" />
          Sair
        </Link>
      </main>
    </div>
  )
}