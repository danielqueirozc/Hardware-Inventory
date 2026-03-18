import { useAuthStore } from "@/context/auth-store";
import { Sidebar } from "./sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { InfoUser } from "./ui/info-user";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Camera } from "lucide-react";
import { Label } from "./ui/label";

export function Profile() {
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false)
  const [name, setName] = useState<string>('')

  const { user, updateProfileImage } = useAuthStore()

  // Inicializa o nome quando o user carregar
  useEffect(() => {
    if (user?.name) setName(user.name)
  }, [user?.name])

  async function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    // Validações
    if(!file?.type.startsWith('image/')) {
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

    const profileImageUrl = user?.imageUrl 
      ? `http://localhost:3333${user.imageUrl}` 
      : "https://github.com/shadcn.png"

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col gap-16 px-24 bg-[#FAFAFA]">
        <header className="flex justify-between py-8 -mx-20 px-20 border-b-4 border-gray-300">
          <div className="flex items-center gap-4">
            <h2 className="text-gray-400 text-2xl font-bold">Estoque</h2>
          </div>
          <InfoUser />
        </header>

        <main className="shadow rounded-4xl px-12 py-12 flex flex-col">
          <div className="flex flex-col gap-16">
           <div className="flex justify-between">
             <div className="relative rounded-full border-2 border-green w-16 md:w-28 h-16 md:h-28">
              <Avatar className="w-full h-full">
                <AvatarImage src={profileImageUrl} className="object-cover" />
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
              
              {/* input escondido */}
              <input
                id="profile-image-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
                disabled={isUploadingImage}
              />
            </div>

            <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col gap-3">
                  <Label>Nome</Label>
                  <input
                    className="px-4 py-2 rounded-lg border border-green-600 focus:outline-none focus:ring focus:ring-green-600"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <Label>Nome</Label>
                  <input
                    className="px-4 py-2 rounded-lg border border-green-600 focus:outline-none focus:ring focus:ring-green-600"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <Label>Nome</Label>
                  <input
                    className="px-4 py-2 rounded-lg border border-green-600 focus:outline-none focus:ring focus:ring-green-600"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
            </div>

           </div>
           <div className="flex justify-end">
              <button className="bg-green font-medium px-8 py-2 cursor-pointer rounded-lg text-white">
                Salvar
              </button>
            </div>
          </div>
        </main>
      </div>
      </div>
  )
} 