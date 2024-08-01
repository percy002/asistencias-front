"use client";
import { format } from "date-fns";
import { Tabs } from "flowbite-react";
import { HiClipboardList } from "react-icons/hi";

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

import { Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
interface Usuario {
  nombres: string;
  apellidos: string;
  dni: string;
  provincia: string;
  empresa: string;
  rubro: string;
  cargo: string;
  updated_at: string;
}

interface Asistencia {
  created_at: string;
  id: number;
  updated_at: string;
  user: Usuario;
  user_id: number;
}
const Page = () => {
  const [usuarios1, setUsuarios1] = useState<Asistencia[]>([]);
  const [usuarios2, setUsuarios2] = useState<Asistencia[]>([]);
  const [usuarios3, setUsuarios3] = useState<Asistencia[]>([]);
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return format(date, "HH:mm:ss dd/MM/yyyy");
  };
  const getUsers = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      // console.log(data);

      if (!response.ok) {
        throw new Error("¡Algo salió mal!");
      }

      setUsuarios1(data.asistencias1);
      setUsuarios2(data.asistencias2);
      setUsuarios3(data.asistencias3);
    } catch (error: any) {
      const message =
        error instanceof Error
          ? error.message
          : "Ocurrió un error desconocido.";
      Swal.fire("¡Error!", message, "error");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const exportToExcel = (asistencias:Asistencia[]) => {

    const data = asistencias.map(asistencia => ({
      'Fecha y Hora': formatDate(asistencia.created_at),
      'Nombre': asistencia.user.nombres,
      'Apellidos': asistencia.user.apellidos,
      'DNI': asistencia.user.dni,
      'Provincia': asistencia.user.provincia,
      'Empresa': asistencia.user.empresa,
      'Rubro': asistencia.user.rubro,
      'Cargo': asistencia.user.cargo,
    }));
    // Crea una hoja de cálculo a partir de los datos
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, '31-07-2024');

    // Convierte el libro de trabajo a un archivo binario
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });

    // Crea un Blob a partir del archivo binario
    const dataBlob = new Blob([excelBuffer], {
      type: 'application/octet-stream'
    });

    // Guarda el archivo usando FileSaver
    saveAs(dataBlob, "datos.xlsx");
  };

  return (
    <Tabs aria-label="Default tabs">
      <Tabs.Item active title="01/07/2024" icon={HiClipboardList}>
        <button className="bg-green-600 text-white px-3 rounded-md ml-3" onClick={() => exportToExcel(usuarios1)}>Exportar a Excel</button>

        <div className="overflow-x-auto">
          <Table striped>
            <Table.Head>
              <Table.HeadCell>DNI</Table.HeadCell>
              <Table.HeadCell>Nombre</Table.HeadCell>
              <Table.HeadCell>Apellidos</Table.HeadCell>
              <Table.HeadCell>provincia</Table.HeadCell>
              <Table.HeadCell>Empresa</Table.HeadCell>
              <Table.HeadCell>Rubro</Table.HeadCell>
              <Table.HeadCell>Cargo</Table.HeadCell>
              <Table.HeadCell>Fecha/hora</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {usuarios1 &&
                usuarios1.length > 0 &&
                usuarios1?.map((usuario) => (
                  <Table.Row
                    key={usuario.id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell>{usuario.user.dni}</Table.Cell>
                    <Table.Cell>{usuario.user.nombres}</Table.Cell>
                    <Table.Cell>{usuario.user.apellidos}</Table.Cell>
                    <Table.Cell>{usuario.user.provincia}</Table.Cell>
                    <Table.Cell>{usuario.user.empresa}</Table.Cell>
                    <Table.Cell>{usuario.user.rubro}</Table.Cell>
                    <Table.Cell>{usuario.user.cargo}</Table.Cell>
                    <Table.Cell>{formatDate(usuario.created_at)}</Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>
      </Tabs.Item>
      <Tabs.Item active title="02/07/2024" icon={HiClipboardList}>
        <div className="overflow-x-auto">
          <Table striped>
            <Table.Head>
              <Table.HeadCell>DNI</Table.HeadCell>
              <Table.HeadCell>Nombre</Table.HeadCell>
              <Table.HeadCell>Apellidos</Table.HeadCell>
              <Table.HeadCell>provincia</Table.HeadCell>
              <Table.HeadCell>Empresa</Table.HeadCell>
              <Table.HeadCell>Rubro</Table.HeadCell>
              <Table.HeadCell>Cargo</Table.HeadCell>
              <Table.HeadCell>Fecha/hora</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {usuarios2 &&
                usuarios2.length > 0 &&
                usuarios2?.map((usuario) => (
                  <Table.Row
                    key={usuario.id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell>{usuario.user.dni}</Table.Cell>
                    <Table.Cell>{usuario.user.nombres}</Table.Cell>
                    <Table.Cell>{usuario.user.apellidos}</Table.Cell>
                    <Table.Cell>{usuario.user.provincia}</Table.Cell>
                    <Table.Cell>{usuario.user.empresa}</Table.Cell>
                    <Table.Cell>{usuario.user.rubro}</Table.Cell>
                    <Table.Cell>{usuario.user.cargo}</Table.Cell>
                    <Table.Cell>{formatDate(usuario.created_at)}</Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>
      </Tabs.Item>
      <Tabs.Item active title="03/07/2024" icon={HiClipboardList}>
        <div className="overflow-x-auto">
          <Table striped>
            <Table.Head>
              <Table.HeadCell>DNI</Table.HeadCell>
              <Table.HeadCell>Nombre</Table.HeadCell>
              <Table.HeadCell>Apellidos</Table.HeadCell>
              <Table.HeadCell>provincia</Table.HeadCell>
              <Table.HeadCell>Empresa</Table.HeadCell>
              <Table.HeadCell>Rubro</Table.HeadCell>
              <Table.HeadCell>Cargo</Table.HeadCell>
              <Table.HeadCell>Fecha/hora</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {usuarios3 &&
                usuarios3.length > 0 &&
                usuarios3?.map((usuario) => (
                  <Table.Row
                    key={usuario.id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell>{usuario.user.dni}</Table.Cell>
                    <Table.Cell>{usuario.user.nombres}</Table.Cell>
                    <Table.Cell>{usuario.user.apellidos}</Table.Cell>
                    <Table.Cell>{usuario.user.provincia}</Table.Cell>
                    <Table.Cell>{usuario.user.empresa}</Table.Cell>
                    <Table.Cell>{usuario.user.rubro}</Table.Cell>
                    <Table.Cell>{usuario.user.cargo}</Table.Cell>
                    <Table.Cell>{formatDate(usuario.created_at)}</Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>
      </Tabs.Item>
    </Tabs>
  );
};

export default Page;
