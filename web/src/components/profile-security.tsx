import { Eye } from "lucide-react";
import { Label } from "./ui/label";

export function ProfileSecurity() {
  return (
    <form className="flex flex-col gap-16">
      <div className="flex justify-between">
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <Label>Sua Senha</Label>
             <div className="flex items-center justify-between gap-2 rounded-lg border border-green-600 focus:outline-none focus:ring focus:ring-green-600 w-96 px-4">
               <input
                className=" py-2 w-full focus:outline-none"
                name="name"
                type="password"
                // value={name}
                // onChange={(e) => setName(e.target.value)}
              />

              <button className="cursor-pointer border-l-2 border-gray-300 pl-2">
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
                type="password"
                // value={name}
                // onChange={(e) => setName(e.target.value)}
              />

              <button className="cursor-pointer border-l-2 border-gray-300 pl-2">
                <Eye className="text-green" />
              </button>
             </div>
             
            </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button type="submit" className="bg-green font-medium px-8 py-2 cursor-pointer rounded-lg text-white">
          Salvar
        </button>
      </div>
    </form>
  )
}