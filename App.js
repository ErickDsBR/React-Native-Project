import { StyleSheet, Text, View } from "react-native";

export default function App() {
  const produtos = [
    {
      id: 1,
      nome: "maça",
      valor: 2.5,
    },
    {
      id: 2,
      nome: 'banana',
      valor: 50,

    }
  ];
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.produtos}>
          {produtos.map((produto) => (
            <View key={produto.id} style={styles.produto}>
              <Text>{produto.nome}</Text>
              <Text>R$ {produto.valor.toFixed(2)}</Text>
            </View>
          ))}
        </View>
      </View>
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  produtos: {
    backgroundColor: '#9d9d9d',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '15px',
    height: '150px',
    width: '100px',

  }
});
