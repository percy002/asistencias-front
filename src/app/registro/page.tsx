"use client";
import { Button, Card, Label, Select } from "flowbite-react";
import { FloatingLabel } from "flowbite-react";
import { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from 'next/navigation';

const Page = () => {
  const [nombres, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [dni, setDni] = useState("");
  const [genero, setGenero] = useState("");
  const [gerencia, setGerencia] = useState("");
  const [cargo, setCargo] = useState("");
  const router = useRouter();

  const handleRegister = async () => {

    try {
      const userData = {
        nombres,
        apellidos,
        dni,
        genero,
        gerencia,
        cargo,
      };
      console.log(userData);

      const response = await fetch("http://localhost:8000/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombres,
          apellidos,
          dni,
          genero,
          gerencia,
          cargo,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errors = Object.values(data.errors).flat().join("\n");
        console.log(errors);

        throw new Error(errors || "¡Algo salió mal!");
      }
      console.log(data);
      

      Swal.fire("¡Éxito!", "Tus datos han sido guardados.", "success").then(
        () => {
          router.push('/usuario/'+data.id);
        }
      );
    } catch (error: any) {
      const message =
        error instanceof Error
          ? error.message
          : "Ocurrió un error desconocido.";
      Swal.fire("¡Error!", message, "error");
    }
  };
  return (
    <div className="bg-fondo bg-cover h-[90vh]">
      <div className="flex flex-col justify-center items-center w-full h-full gap-8 py-1 md:py-0">
        <img
          src="/images/logo_gore_cusco.png"
          alt="logo gobierno regional del cusco"
          className="w-64"
        />{" "}
        <Card className="w-4/6">
          <h2 className="text-primary font-bold text-4xl text-center">
            Registrate
          </h2>
          <form action="" className="flex flex-col gap-6">
            <FloatingLabel
              variant="filled"
              label="Nombres"
              value={nombres}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            <FloatingLabel
              variant="filled"
              label="Apellidos"
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
            />
            <div className="flex gap-x-8 flex-col md:flex-row">
              <div className="flex-1">
                <FloatingLabel
                  variant="filled"
                  label="DNI"
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                  pattern="\d{8}"
                />
              </div>
              <div className="flex-1">
                <Select
                  id="genero"
                  required
                  value={genero}
                  onChange={(e) => setGenero(e.target.value)}
                >
                  <option value="">Genero</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Otro">Otro</option>
                </Select>
              </div>
            </div>
            <div className="flex gap-x-8 flex-col md:flex-row">
              <div className="flex-1">
                <Select
                  id="gerencia"
                  required
                  value={gerencia}
                  onChange={(e) => setGerencia(e.target.value)}
                >
                  <option value={""}>Gerencia</option>
                  <option value="GEREPRO">GEREPRO</option>
                  <option value="VIVIENDA">VIVIENDA</option>
                </Select>
              </div>
              <div className="flex-1">
                <FloatingLabel
                  variant="filled"
                  label="Cargo/Ocupación"
                  value={cargo}
                  onChange={(e) => setCargo(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-center">
              <Button
                onClick={handleRegister}
                className="bg-primary text-white enabled:hover:bg-primary px-4 py-2 rounded-full w-5/6"
              >
                <span className="text-xl">Registrarme</span>
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Page;
