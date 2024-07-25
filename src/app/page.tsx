import Logos from "@/components/UI/Logos";
import { Button } from "flowbite-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <div className="h-[90vh]">
        <div className="flex justify-center h-full">
          <div className="flex flex-col mt-4 gap-12 md:gap-4 h-[80%]">
            <Logos />
            <h1 className="font-bold text-4xl xl:text-6xl text-center px-4 mt-16">
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
