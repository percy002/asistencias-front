"use client";
import { Button, Card, Label, Select } from "flowbite-react";
import { FloatingLabel } from "flowbite-react";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import MyContext from "@/contexts/userContext";
import Logos from "@/components/UI/Logos";
const Page = () => {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error("MyContext no está disponible");
  }

  const { globalVariable, setGlobalVariable } = context;

  const [nombres, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [dni, setDni] = useState("");
  const [genero, setGenero] = useState("");
  const [gerencia, setGerencia] = useState("");
  const [cargo, setCargo] = useState("");
  const router = useRouter();

  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    dni: "",
    provincia: "",
    empresa: "",
    rubro: "",
    cargo: "",
  });

  const handleRegister = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          const idUser = data.id;
          setGlobalVariable(idUser);
          router.push("/usuario");
          return;
        }

        const errors = Object.values(data.errors).flat().join("\n");

        throw new Error(errors || "¡Algo salió mal!");
      }
      setGlobalVariable(data.id);

      Swal.fire("¡Éxito!", "Tus datos han sido guardados.", "success").then(
        () => {
          router.push("/usuario");
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

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value.toUpperCase(),
    });
    // console.log(formData);
  };

  return (
    <div className="h-[90vh]">
      <div className="flex flex-col items-center w-full h-full gap-4 pt-4">
        <Logos />

        <Card className="w-4/6">
          <h2 className="text-primary font-bold text-4xl text-center">
            Registrate
          </h2>
          <form action="" className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <FloatingLabel
                  variant="filled"
                  label="DNI"
                  name="dni"
                  value={formData.dni}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex-1">
                <FloatingLabel
                  variant="filled"
                  label="Nombres"
                  name="nombres"
                  value={formData.nombres}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <FloatingLabel
                  variant="filled"
                  label="Apellidos"
                  name="apellidos"
                  value={formData.apellidos}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex-1">
                <Select
                  id="gerencia"
                  required
                  name="provincia"
                  value={formData.provincia}
                  onChange={handleInputChange}
                >
                  <option value={""}>Provincia (opcional)</option>
                  <option value="ACOMAYO">ACOMAYO</option>
                  <option value="ANTA">ANTA</option>
                  <option value="CALCA">CALCA</option>
                  <option value="CANAS">CANAS</option>
                  <option value="CANCHIS">CANCHIS</option>
                  <option value="CHUMBIVILCAS">CHUMBIVILCAS</option>
                  <option value="CUSCO">CUSCO</option>
                  <option value="ESPINAR">ESPINAR</option>
                  <option value="LA CONVENCION">LA CONVENCION</option>
                  <option value="PARURO">PARURO</option>
                  <option value="PAUCARTAMBO">PAUCARTAMBO</option>
                  <option value="QUISPICANCHIS">QUISPICANCHIS</option>
                  <option value="URUBAMBA">URUBAMBA</option>
                </Select>
              </div>
            </div>
            <FloatingLabel
              variant="filled"
              label="Razón Social (opcional)"
              name="empresa"
              value={formData.empresa}
              onChange={handleInputChange}
            />
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
              <Select
                  id="rubro"
                  required
                  name="rubro"
                  value={formData.rubro}
                  onChange={handleInputChange}
                >
                  <option value={""}>RUBRO</option>
                  <option value="INDUSTRIALES">INDUSTRIALES</option>
                  <option value="MANUFACTURERAS">MANUFACTURERAS</option>
                  <option value="COMERCIO">COMERCIO</option>
                  <option value="SERVICIOS">SERVICIOS</option>
                  <option value="TURISMO">TURISMO</option>
                  <option value="TELECOMUNICACIONES">TELECOMUNICACIONES</option>
                  <option value="TRANSPORTE">TRANSPORTE</option>
                  <option value="GANADERIA">GANADERÍA</option>
                  <option value="PESCA">PESCA</option>
                  <option value="CONSTRUCCION">CONSTRUCCIÓN</option>
                  <option value="AGRICULTURA">AGRICULTURA</option>
                  <option value="TEXTIL">TEXTIL</option>
                  <option value="DISEÑO Y PUBLICIDAD">DISEÑO Y PUBLICIDAD</option>
                  <option value="AGROPECUARIAS">AGROPECUARIAS</option>
                  <option value="OTROS">OTROS</option>
                </Select>
                {/* <FloatingLabel
                  variant="filled"
                  label="Rubro (opcional)"
                  name="rubro"
                  value={formData.rubro}
                  onChange={handleInputChange}
                /> */}
              </div>
              <div className="flex-1">
                <FloatingLabel
                  variant="filled"
                  label="Cargo (opcional)"
                  name="cargo"
                  value={formData.cargo}
                  onChange={handleInputChange}
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
