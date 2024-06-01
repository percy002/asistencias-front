import { Button } from "flowbite-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <div className="bg-fondo bg-cover h-[90vh]">
        <div className="flex justify-center items-center h-full">
          <div className="flex flex-col items-center justify-between gap-16 h-[80%]">
            <img
              src="/images/logo_gore_cusco.png"
              alt="logo gobierno regional del cusco"
              className="w-64"
            />
            <h1 className="font-bold text-4xl xl:text-6xl text-center px-4">
              Sistema de Registro de Asistencia
            </h1>
            <Link href="/registro" className="w-full flex justify-center">
              <Button className="bg-primary text-white enabled:hover:bg-primary px-4 py-2 rounded-full text-3xl w-5/6">
                Registrate
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
