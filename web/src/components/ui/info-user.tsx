import { useAuthStore } from "@/context/auth-store";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Link } from "react-router-dom";

export function InfoUser() {
  const { user } = useAuthStore()

  const profileImageUrl = user?.imageUrl 
    ? `http://localhost:3333${user.imageUrl}` 
    : "https://github.com/shadcn.png"

  return (
     <Link to='/profile' className="flex items-center gap-6">
        <div className="flex flex-col">
          <strong>
            {user?.name}
          </strong>
          <span>{user?.email}</span>
        </div>

        <Avatar className="w-16 md:w-28 lg:w-12 h-16 md:h-28 lg:h-12">
          <AvatarImage src={profileImageUrl} />
          <AvatarFallback>{user?.name?.charAt(0) || 'CN'}</AvatarFallback>
        </Avatar>
      </Link>
  )
}