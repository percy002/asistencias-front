const Logos = () => {
  return (
    <div className="flex gap-8 justify-center px-2">
      <div className="">
        <img
          src="/images/logo_gore_cusco.png"
          alt="logo gobierno regional del cusco"
          className="w-64"
        />
      </div>
      <div className="flex items-center">
        <img
          src="/images/logo_camelidos.png"
          alt="logo feria regiona chinchero 2024"
          className="w-[16rem]"
        />
      </div>
      <div className="flex items-center">
        <img
          src="/images/logo_alpacas_cusco.png"
          alt="logo municipalidad distrital de chinchero"
          className="w-64"
        />
      </div>
    </div>
  );
};
export default Logos;
