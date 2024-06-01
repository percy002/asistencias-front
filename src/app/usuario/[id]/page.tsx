"use client";
import { useEffect, useState } from "react";
import QRCode from "qrcode.react";

import Swal from "sweetalert2";
import { Card } from "flowbite-react";
const Page = ({params} : any) => {
    const {id} = params;
  const [usuario, setUsuario] = useState({
    nombres: "",
    apellidos: "",
    dni: "",
    genero: "",
    gerencia: "",
    cargo: "",
    created_at: "",
    hora: "",
    año: "",
    fecha: "",
  });
  const getUser = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/user/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("¡Algo salió mal!");
      }
      const fechaHora = new Date(data.created_at);
      const fecha = `${fechaHora.getDate()}/${
        fechaHora.getMonth() + 1
      }/${fechaHora.getFullYear()}`;
      const hora = `${fechaHora.getHours()}:${fechaHora.getMinutes()}:${fechaHora.getSeconds()}`;
      const año = fechaHora.getFullYear().toString();

      setUsuario({
        nombres: data.nombres,
        apellidos: data.apellidos,
        dni: data.dni,
        genero: data.genero,
        gerencia: data.gerencia,
        cargo: data.cargo,
        created_at: data.created_at,
        fecha: fecha,
        hora: hora,
        año: año,
      });
    } catch (error: any) {
      const message =
        error instanceof Error
          ? error.message
          : "Ocurrió un error desconocido.";
      Swal.fire("¡Error!", message, "error");
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="flex justify-center mt-8 text-gray-700">
      <Card className="w-full sm:w-1/2 xl:w-1/3">
        <div className="flex flex-col">
          <div className="flex justify-center">
            <img
              src="/images/logo_gore_cusco.png"
              alt="logo gobierno regional del cusco"
              className="w-64"
            />
          </div>
          <div className="flex justify-center mt-4">
            <QRCode value={usuario.dni} />
          </div>
          <div className="flex justify-between px-10 mt-2 border-b-2 border-gray-300 pb-3">
            <span>{usuario.fecha}</span>
            <span>{usuario.hora}</span>
            <span>Registro {usuario.año}</span>
          </div>
          <div className="">
            <h4 className="font-bold">Personal</h4>
            <div className="flex mt-4">
              <div className="flex-1">
                <h5 className=" text-gray-600">Nombre</h5>
                <p className="font-bold text-gray-700">{usuario.nombres}</p>
              </div>
              <div className="flex-1">
                <h5 className=" text-gray-500">Apellidos</h5>
                <p className="font-bold text-gray-700">{usuario.apellidos}</p>
              </div>
              <div className="flex-1">
                <h5 className=" text-gray-500">DNI</h5>
                <p className="font-bold text-gray-700">{usuario.dni}</p>
              </div>
            </div>
          </div>
          <div className="flex mt-4">
            <div className="flex-1">
                <h5 className=" text-gray-500">Genero</h5>
              <p className="font-bold">{usuario.genero}</p>
            </div>
            <div className="flex-1">
                <h5 className=" text-gray-500">Gerencia</h5>
              <p className="font-bold">{usuario.gerencia}</p>
            </div>
            <div className="flex-1">
                <h5 className=" text-gray-500">Cargo/Ocupación</h5>
              <p className="font-bold">{usuario.cargo}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Page;
