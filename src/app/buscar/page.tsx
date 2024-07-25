"use client";
import { Button, Label, TextInput } from "flowbite-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import MyContext from "@/contexts/userContext";
import Swal from "sweetalert2";
import Logos from "@/components/UI/Logos";
const Page = () => {
    const context = useContext(MyContext);

  if (!context) {
    throw new Error("MyContext no está disponible");
  }
  const router = useRouter();

  const { globalVariable, setGlobalVariable } = context;
  const dniRef = useRef<HTMLInputElement>(null);
  const [dniValue, setDniValue] = useState("");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    if (dniRef.current) {
      dniRef.current.focus();
      dniRef.current.onblur = () => {
        dniRef.current?.focus();
      };
    }
  }, []);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user/encontrar/${dniValue}`
        );
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        const data = await response.json();
        
        setGlobalVariable(data.user.id);
        setDniValue("");
        Swal.fire("¡Éxito!", "Persona encontrada", "success").then(
            () => {
              router.push("/usuario");
            }
          );
        // console.log(dniValue);
      } catch (error) {
        // Maneja el error aquí
      }
    };

    if (dniValue && dniValue.length === 8) {
      fetchData();
    }
  }, [dniValue,router,setGlobalVariable]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (inputValue.length <= 8) {

      setDniValue(inputValue);
    }
  };

  return (
    <main className="">
      <div className="h-[90vh]">
        <div className="flex justify-center h-full mt-4">
          <div className="flex flex-col items-center  gap-4 h-[80%]">
            <Logos/>
            <h1 className="font-bold text-4xl xl:text-6xl text-center px-4">
              Buscar Credenciales
            </h1>
            <div className="w-5/6">
              <div className="mb-2 block">
                <Label htmlFor="dni" value="Ingresar DNI" className="text-3xl" />
              </div>
              <TextInput
                id="dni"
                type="text"
                ref={dniRef}
                value={dniValue}
                onChange={handleInputChange}
              />
            </div>
            
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
