"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { ThemeSwitcher } from "./themeswitcher";
import React from "react";

export default function NavbarComponent() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
      <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
      <NavbarBrand>
        <Link href="/">
            <Image src="/logo.png" alt="Website Logo" width={40} height={40} />
          </Link>
      </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/about">
            About
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/projects">
            Projects
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/blog">
            Blog
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="https://files.albertshih.org/url/web_resume">Resume</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="/contact" variant="flat">
            Contact Me
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
      <NavbarMenuItem>
          <Link className='w-full' href="/about">
            About
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link className='w-full' href="/projects">
            Projects
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link className='w-full' href="/blog">
            Blog
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link className='w-full' href="https://files.albertshih.org/url/web_resume">
            Resume
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
