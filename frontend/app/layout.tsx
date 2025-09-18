import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import { 
  SidebarProvider, 
  SidebarTrigger,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarInset,
} from '@/components/ui/sidebar'
import { Mail, Home, UserSearch, BookText, Users } from "lucide-react"

const inter = Inter({
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Melanoma discovery app",
  description: "Discover Melanoma using our advanced algorithm",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {

  const itemsGroup1 = [
    {
      title: "Home",
      url: "#",
      icon: Home,
    },
    {
      title: "Try Now",
      url: "#",
      icon: UserSearch,
    },
    {
      title: "Research",
      url: "#",
      icon: BookText,
    },
  ]

  const itemsGroup2 = [
    {
      title: "About us",
      url: "#",
      icon: Users,
    },
    {
      title: "Contact",
      url: "#",
      icon: Mail,
    },
  ]

  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <SidebarProvider>
          <Sidebar variant="inset" side="left">
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Application</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {itemsGroup1.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <a href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              <SidebarGroup>
                <SidebarGroupLabel>Information</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {itemsGroup2.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <a href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <SidebarInset>
            
            <div className="flex flex-col items-between h-screen">
              <Header />

              <main className="grow p-6">
                {children}
              </main>

              <Footer />
            </div>

          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
