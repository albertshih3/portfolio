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

export default function NavbarComponent() {
  return (
    <Navbar>
      <NavbarBrand>
        <Link href="/">
            <Image src="/logo.png" alt="Website Logo" width={40} height={40} />
          </Link>
      </NavbarBrand>
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
          <Link href="/resume">Resume</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="/contact" variant="flat">
            Contact Me
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
