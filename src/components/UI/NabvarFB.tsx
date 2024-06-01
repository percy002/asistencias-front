"use client";

import Link from "next/link";
import { Navbar } from "flowbite-react";
import { HiHome } from "react-icons/hi";

function NavbarFB() {
  return (
    <Navbar fluid rounded className="bg-primary md:px-16">
      <Navbar.Brand as={Link} href="/">
      <HiHome className="h-10 w-10 text-white p-1" />
      </Navbar.Brand>
      <Navbar.Toggle className="text-white hover:bg-transparent"/>
      <Navbar.Collapse>
        <Navbar.Link href="/registro" active className="bg-transparent">
          <span className="bg-white text-primary px-4 py-1 md:rounded-full font-bold text-lg flex justify-center">Registrarse</span>
        
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
export default NavbarFB;