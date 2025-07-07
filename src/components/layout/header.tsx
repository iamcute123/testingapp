import { SidebarTrigger } from "@/components/ui/sidebar"
import { UserNav } from "@/components/layout/user-nav"

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <div className="flex-1" />
      <UserNav />
    </header>
  )
}
