import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Newspaper, Image as ImageIcon, Building2, Handshake, MapPin, Users, HelpCircle, BookOpen, Award, Star, Settings2 } from "lucide-react"
import { NavUser } from "./nav-user"
import Link from "next/link"
import { Admin } from "@/schemas"

const items = [
  {
    title: "Blogs",
    url: "/blogs",
    icon: Newspaper,
  },
  {
    title: "FAQs",
    url: "/faqs",
    icon: HelpCircle,
  },
  {
    title: "Images",
    url: "/images",
    icon: ImageIcon,
  },
  {
    title: "Trainers",
    url: "/trainers",
    icon: Award,
  },
  {
    title: "Companies",
    url: "/companies",
    icon: Handshake,
  },
  {
    title: "Branches",
    url: "/branches",
    icon: MapPin,
  },
  {
    title: "Courses",
    url: "/courses",
    icon: BookOpen,
  },
  {
    title: "Placements",
    url: "/placements",
    icon: Star,
  },
  {
    title: "Testimonials",
    url: "/testimonials",
    icon: Users,
  },
  {
    title: "USPs",
    url: "/usps",
    icon: Building2,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings2,
  },
]
export const AppSidebar = ({ admin }: { admin: Admin }) => {
  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg" className="data-[slot=sidebar-menu-button]:!p-3">
              <Link href="/" className="flex items-center gap-3">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Building2 className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold text-base">Unnati</span>
                  <span className="truncate text-xs text-muted-foreground">Admin Dashboard</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  className="h-10 px-3 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-primary data-[active=true]:text-primary-foreground transition-colors"
                >
                  <Link href={`/dashboard${item.url}`} className="flex items-center gap-3">
                    <item.icon className="size-4" />
                    <span className="font-medium text-base">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-2">
        <NavUser
          user={{
            name: admin?.name!,
            email: admin?.email!,
            avatar: "https://i.pravatar.cc/150?img=3",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  )
}