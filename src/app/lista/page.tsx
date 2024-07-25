"use client";
import { format } from 'date-fns';

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
const Page = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return format(date, 'HH:mm:ss dd/MM/yyyy');
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

      if (!response.ok) {
        throw new Error("¡Algo salió mal!");
      }
      //   const fechaHora = new Date(data.created_at);
      //   const fecha = `${fechaHora.getDate()}/${
      //     fechaHora.getMonth() + 1
      //   }/${fechaHora.getFullYear()}`;
      //   const hora = `${fechaHora.getHours()}:${fechaHora.getMinutes()}:${fechaHora.getSeconds()}`;
      //   const año = fechaHora.getFullYear().toString();

      setUsuarios(data.users);
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
  return (
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
          {usuarios && usuarios.length>0 && usuarios?.map((usuario) => (
            <Table.Row key={usuario.dni} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell>{usuario.dni}</Table.Cell>
              <Table.Cell>{usuario.nombres}</Table.Cell>
              <Table.Cell>{usuario.apellidos}</Table.Cell>
              <Table.Cell>{usuario.provincia}</Table.Cell>
              <Table.Cell>{usuario.empresa}</Table.Cell>
              <Table.Cell>{usuario.rubro}</Table.Cell>
              <Table.Cell>{usuario.cargo}</Table.Cell>
              <Table.Cell>{formatDate(usuario.updated_at)}</Table.Cell>
              </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default Page;
