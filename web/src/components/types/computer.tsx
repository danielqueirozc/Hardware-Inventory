import { useEffect, useState } from "react";
import { DashboardItem } from "../dashboard-item";
import { DashboardItemMobile } from "../mobile/dashboard-item-mobile";
import { Sidebar } from "../sidebar";

export function Computers() {
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(window.innerWidth >= 1024)

  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024)
    window.addEventListener('resize', handleResize)
  }, [])

  return (
   <>
    {isLargeScreen ? (
     <div className="flex h-screen">
      <Sidebar />
      <DashboardItem type="Computer" />
     </div>
    ) : (
      <DashboardItemMobile />
    )}
   </>
  )
}