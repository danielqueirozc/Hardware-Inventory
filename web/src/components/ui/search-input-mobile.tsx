import { Search, SlidersHorizontal } from "lucide-react";

import { Checkbox } from "./checkbox";
import { Label } from "./label";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function SearchInputMobile() {
  return (
     <div className="flex items-center relative w-full border border-green rounded-lg h-8">
        <Search
          className="absolute left-3 text-gray-600 w-5 h-5 pointer-events-none"
        />
        <input
          className="pl-9 placeholder:text-gray-600 placeholder:font-medium w-full h-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green"
          type="text"
          placeholder="Pesquisar"
        />

        <Popover>
          <PopoverTrigger asChild>
            <button className="absolute right-3">
              <SlidersHorizontal className="text-gray-600 w-5 h-5" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="flex flex-col gap-4 w-auto">
            <div className="flex items-center space-x-2">
              <Checkbox className="border-green" id="terms" />
              <Label className="text-gray-600" htmlFor="terms">Lab Línguas</Label>
            </div>

              <div className="flex items-center space-x-2">
              <Checkbox className="border-green" id="terms" />
              <Label className="text-gray-600" htmlFor="terms">Lab Informática</Label>
            </div>

              <div className="flex items-center space-x-2">
              <Checkbox className="border-green" id="terms" />
              <Label className="text-gray-600" htmlFor="terms">Lab Hardware</Label>
            </div>
          </PopoverContent>
        </Popover>
      </div>
  )
}