import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

export function Menu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="flex flex-col justify-around items-center `w-7.5 h-6.25 bg-transparent border-0 cursor-pointer focus:outline-none focus:shadow-none max-[481px]:w-6.25 max-[481px]:h-5">
          <span className="h-0.75 w-full bg-gray-100 rounded-3xl transition-all duration-400 ease-in-out" />
          <span className="h-0.75 w-full bg-gray-100 rounded-3xl transition-all duration-400 ease-in-out" />
          <span className="h-0.75 w-full bg-gray-100 rounded-3xl transition-all duration-400 ease-in-out" />
        </button>
      </SheetTrigger>
      <SheetContent>
        
      </SheetContent>
    </Sheet>
  )
}