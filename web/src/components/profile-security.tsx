import { Sidebar } from "./sidebar";
import { InfoUser } from "./ui/info-user";

export function ProfileSecurity() {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col gap-16 px-48 bg-[#FAFAFA]">
        <header className="flex justify-between py-8 -mx-48 px-20 border-b-4 border-gray-300">
          <div className="flex items-center gap-4">
            <h2 className="text-gray-400 text-2xl font-bold">Estoque</h2>
          </div>
          <InfoUser />
        </header>

        <main className="shadow rounded-4xl px-12 py-12 flex flex-col">
          <form onSubmit={handleChangeInfoUser} className="flex flex-col gap-16">

          <div className="relative flex border-b-2 border-gray-300 gap-16">
           <div className="relative  before:absolute before:bottom-0 before:h-1 before:w-full before:rounded-t-lg before:bg-green">
             <button className="font-bold text-green pb-4 px-8 cursor-pointer">
              Perfil
            </button>
           </div>

            <div className="relative  before:absolute before:bottom-0 before:h-1 before:w-full before:rounded-t-lg before:bg-green">
             <button className="font-bold text-green pb-4 px-8 cursor-pointer">
              Segurança
            </button>
           </div>
          </div>

           <div className="flex justify-between">
             <div className="relative rounded-full border-2 border-green w-16 md:w-38 h-16 md:h-38">
              <Avatar className="w-full h-full">
                <AvatarImage src={profileImageUrl} className="object-cover" />
                <AvatarFallback>{user?.name?.charAt(0) || 'CN'}</AvatarFallback>
              </Avatar>

              {/* Botão de câmera */}
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
                    className="px-4 py-2 rounded-lg border border-green-600 focus:outline-none focus:ring focus:ring-green-600 w-96"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <Label>Email</Label>
                  <input
                    className="px-4 py-2 rounded-lg border border-green-600 focus:outline-none focus:ring focus:ring-green-600 w-96"
                    name="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <Label>Senha</Label>
                  <input
                    className="px-4 py-2 rounded-lg border border-green-600 focus:outline-none focus:ring focus:ring-green-600 w-96"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                </div>

           </div>
           <div className="flex justify-end">
              <button type="submit" className="bg-green font-medium px-8 py-2 cursor-pointer rounded-lg text-white">
                Salvar
              </button>
            </div>
          </form>
        </main>
      </div>
      </div>
  )
}