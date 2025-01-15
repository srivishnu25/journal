import SideNav from "@/app/ui/journal/sidenav";
import Header from "@/app/ui/header";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col relative md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <Header />
      <div className="w-full flex-grow md:pt-16 relative overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
