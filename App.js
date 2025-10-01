import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const produtos = [
    {
      id: 1,
      nome: "maça",
      valor: 2.5,
    },
    {
      id: 2,
      nome: "banana",
      valor: 50,
    },
  ];
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}></View>
        <View style={styles.produtos}>
          {produtos.map((produto) => (
            <View key={produto.id} style={styles.produto}>
              <Text>{produto.nome}</Text>
              <Text>R$ {produto.valor.toFixed(2)}</Text>
            </View>
          ))}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#333",
  },
  header: {
    justifyContent: "center",
    alignContent: "center",
    padding: "10px",
    borderRadius: "15px",
    elevation: 10,
    backgroundColor: "#9d9d9d",
    width: "85%",
    height: "50px",
  },
  produtos: {
    backgroundColor: "#222",
    flexDirection: "row",
    paddingTop: "10px",
    flexWrap: "wrap",
    width: "100%",
    gap: 10,
  },
  produto: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    width: "50%",
    borderRadius: 15,
    height: 220,
    elevation: 5,
  },
});
