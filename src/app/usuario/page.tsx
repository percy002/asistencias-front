"use client";
import { useContext, useEffect, useState } from "react";
// import QRCode from "qrcode.react";
const PDFDownloadLink = dynamic(
    () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
    { ssr: false }
  );import dynamic from 'next/dynamic';

import Swal from "sweetalert2";
import MyContext from "@/contexts/userContext";
import QRCode from 'qrcode';

import { Button, Card } from "flowbite-react";
import { useRouter } from "next/navigation";
import UserPdf from "@/components/pdf/UserPdf";
const Page = ({ params }: any) => {
  const context = useContext(MyContext);
  const router = useRouter();

  if (!context) {
    throw new Error("MyContext no está disponible");
  }
  const [qrCode, setQrCode] = useState<string | null>(null);

  const { globalVariable, setGlobalVariable } = context;
  const { id } = params;
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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/${globalVariable}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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
    if (globalVariable == "") {
      router.push("/registro");
      return;
    }
    getUser();
  }, []);
  
  useEffect(() => {
    QRCode.toDataURL(usuario.dni)
      .then(url => {
        setQrCode(url);
      })
      .catch(err => {
        console.error(err);
      });
  }, [usuario.dni]);
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
          {qrCode && <img src={qrCode} alt="QR Code" className="w-1/2"/>}
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
        <div className="flex justify-center">
          <PDFDownloadLink
            document={<UserPdf usuario={usuario} />}
            fileName="usuario.pdf"
            className="bg-primary text-white enabled:hover:bg-primary px-4 py-1 rounded-full"
          >
            {({ blob, url, loading, error }) =>
              loading ? "Cargando documento..." : "Descargar PDF"
            }
          </PDFDownloadLink>
        </div>
      </Card>
    </div>
  );
};

export default Page;
