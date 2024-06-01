"use client";
import { Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
interface Usuario {
  nombres: string;
  apellidos: string;
  dni: string;
  genero: string;
  gerencia: string;
  cargo: string;
}
const Page = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
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
      console.log(data);

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
          <Table.HeadCell>Nombre</Table.HeadCell>
          <Table.HeadCell>Apellidos</Table.HeadCell>
          <Table.HeadCell>DNI</Table.HeadCell>
          <Table.HeadCell>Genero</Table.HeadCell>
          <Table.HeadCell>Gerencia</Table.HeadCell>
          <Table.HeadCell>Cargo</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {usuarios && usuarios.length>0 && usuarios?.map((usuario) => (
            <Table.Row key={usuario.dni} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell>{usuario.nombres}</Table.Cell>
              <Table.Cell>{usuario.apellidos}</Table.Cell>
              <Table.Cell>{usuario.dni}</Table.Cell>
              <Table.Cell>{usuario.genero}</Table.Cell>
              <Table.Cell>{usuario.gerencia}</Table.Cell>
              <Table.Cell>{usuario.cargo}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default Page;
