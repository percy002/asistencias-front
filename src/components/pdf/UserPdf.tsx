import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { content } from "flowbite-react/tailwind";
import QRCode from "qrcode";

import { SetStateAction, useEffect, useState } from "react";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
  },
  fotocheck: {
    width: "33%",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    width: "70%",
  },
  logo: {
    width: "100%",
    paddingHorizontal: 10,
    marginTop: 5,
    resizeMode: "contain",
  },
  logoInferior: {
    width: "100%",
    paddingHorizontal: 10,
    marginTop: 5,
    resizeMode: "contain",
    aspectRatio: 1,
  },
  body: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  name: {
    width: "70%",
    marginVertical: 12,
    backgroundColor: "white",
    color: "#A60D29",
    textAlign: "center",
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 10,
    fontSize: 20,
    fontWeight: "bold",
  },

  fotocheckRev: {
    width: "50%",
    height: "50%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  bodyRev: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  headerRev: {
    flexDirection: "row",
    justifyContent: "center",
  },
  qr: {
    width: "160rem",
    marginTop: 8,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 10,
    color: "#A60D29",
  },
  base: {
    fontSize: 15,
    marginVertical: 5,
    color: "#545C63",
  },
  contentQR: {
    width: "60%",
    margin: "auto",
  },


  section: {
    width: "90%",
    margin: "auto",
    marginBottom: 4,
  },
  // header: {
  //   fontSize: 14,
  //   fontWeight: 'bold',
  // },
  subHeader: {
    fontSize: 12,
    color: 'gray',
  },
  text: {
    fontSize: 8,
    fontWeight: 'bold',
    color: 'black',
  },
});

// Create Document Component
const UserPdf = ({ usuario }: any) => {
  const [qrCode, setQrCode] = useState<string | null>(null);
  useEffect(() => {
    QRCode.toDataURL(usuario.dni)
      .then((url: SetStateAction<string | null>) => {
        setQrCode(url);
      })
      .catch((err: any) => {
        console.error(err);
      });
  }, [usuario.dni]);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.fotocheck}>
          <View style={styles.header}>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image src={"../images/logo_gore_cusco.png"} style={styles.logo} />
          </View>
          <View style={styles.body}>
            <View style={styles.contentQR}>
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              {qrCode && <Image src={qrCode} />}
            </View>
            <View style={styles.section}>
              <Text style={styles.header}>Visitante</Text>
              <View style={{ flexDirection: "row", marginTop: 4, flexWrap:"wrap" }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.subHeader}>Nombre</Text>
                  <Text style={styles.text}>{usuario.nombres}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.subHeader}>Apellidos</Text>
                  <Text style={styles.text}>{usuario.apellidos}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.subHeader}>DNI</Text>
                  <Text style={styles.text}>{usuario.dni}</Text>
                </View>
              </View>
            </View>
            <View style={{ width:"90%", margin:"auto", flexDirection: "column", marginTop: 2, gap:"1rem" }}>
              <View style={{ }}>
                <Text style={styles.subHeader}>Provincia</Text>
                <Text style={styles.text}>{usuario.provincia}</Text>
              </View>
              <View style={{marginTop: 1 }}>
                <Text style={styles.subHeader}>Empresa</Text>
                <Text style={styles.text}>{usuario.empresa}</Text>
              </View>
              <View style={{marginTop: 1 }}>
                <Text style={styles.subHeader}>Cargo</Text>
                <Text style={styles.text}>{usuario.cargo}</Text>
              </View>
            </View>
          </View>
          <View style={styles.header}>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image
              src={"../images/logo_feria_cuadrado.png"}
              style={styles.logoInferior}
            />
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default UserPdf;
