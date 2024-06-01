"use client";
import { Button, Label, TextInput } from "flowbite-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import MyContext from "@/contexts/userContext";
import Swal from "sweetalert2";
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
    console.log(dniValue);

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user/encontrar/${dniValue}`
        );
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        const data = await response.json();
        console.log(data);
        
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
      console.log(inputValue.length);

      setDniValue(inputValue);
    }
  };

  return (
    <main className="">
      <div className="bg-fondo bg-cover h-[90vh]">
        <div className="flex justify-center items-center h-full">
          <div className="flex flex-col items-center  gap-16 h-[80%]">
            <img
              src="/images/logo_gore_cusco.png"
              alt="logo gobierno regional del cusco"
              className="w-64"
            />
            <h1 className="font-bold text-4xl xl:text-6xl text-center px-4">
              Buscar Credenciales
            </h1>
            <div className="w-full">
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
