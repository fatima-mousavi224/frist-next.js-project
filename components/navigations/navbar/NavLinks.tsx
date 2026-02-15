'use client'

import { SheetClose } from "@/components/ui/sheet";
import { sideBarLinks } from "@/constant";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLinks = ({ isMobileNav = false }: { isMobileNav?: boolean }) => {
  const pathname = usePathname();
  const userId = 1;

  return (
    <>
      {sideBarLinks.map((item) => {
        let href = item.route;

        if (item.route === "/communities") {
          if (!userId) return null;
          href = `/communities/${userId}`;
        }

        const isActive =
          (pathname.includes(href) && href.length > 1) ||
          pathname === href;

        const LinkComponent = (
          <Link
            href={href}
            className={cn(
              "flex items-center justify-start gap-4 rounded-lg p-4",
              isActive
                ? "primary-gradient text-light-900"
                : "text-dark300_light900 bg-transparent"
            )}
          >
            <Image
              src={item.imgURL}
              alt={item.label}
              width={20}
              height={20}
              className={cn(isActive && "inverted-colors")}
            />
            <p
              className={cn(
                isActive ? "base-bold" : "base-medium",
                !isMobileNav && "max-lg:hidden"
              )}
            >
              {item.label}
            </p>
          </Link>
        );

        return isMobileNav ? (
          <SheetClose asChild key={item.label}>
            {LinkComponent}
          </SheetClose>
        ) : (
          <React.Fragment key={item.label}>
            {LinkComponent}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default NavLinks;