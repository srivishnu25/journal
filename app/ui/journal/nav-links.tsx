"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  {
    name: "Journal",
    href: "/journal",
  },
  { name: "History", href: "/history" },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "h-[48px] grow flex items-center rounded-md p-3 font-medium hover:text-blue-600 hover:bg-blue-600/10 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "text-blue-600": pathname === link.href,
              }
            )}
          >
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
