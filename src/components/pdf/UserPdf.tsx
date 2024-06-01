import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import QRCode from "qrcode";

import { SetStateAction, useEffect, useState } from "react";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
  },
  fotocheck: {
    width: "50%",
    height: "50%",
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
    width: "90%",
    paddingHorizontal: 10,
    marginTop: 5,
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
            <View>
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              {qrCode && <Image src={qrCode} />}
            </View>
            {/* <Text style={styles.name}>
                            {usuario.dni}
                            aa
                        </Text> */}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default UserPdf;
