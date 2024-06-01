"use client";
import { Button, Label, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

const Page = () => {
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
          `http://localhost:8000/api/user/buscar/${dniValue}`
        );
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        const data = await response.json();
        setMensaje(data.message);
        console.log(data);
      } catch (error) {
        // Maneja el error aquí
      }
    };

    if (dniValue && dniValue.length === 8) {
      fetchData();
    }
  }, [dniValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDniValue(event.target.value);
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
              Sistema de Registro de Asistencia
            </h1>
            <div className="w-full">
              <div className="mb-2 block">
                <Label htmlFor="dni" value="Escanea QR" className="text-3xl" />
              </div>
              <TextInput
                id="dni"
                type="text"
                ref={dniRef}
                onChange={handleInputChange}
              />
            </div>
            <div className="bg-gray-300 px-6">
              {
                mensaje == "Asistencia registrada correctamente" ? (
                    <p className="text-green-900 font-bold text-3xl">{mensaje}</p>
                    ) : (
                    <p className="text-red-700 font-bold text-3xl">{mensaje}</p>
                    )
              }
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
