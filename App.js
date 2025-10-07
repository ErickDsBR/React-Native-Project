//! ideia de usar um modal para adicionar produtos assim podendo criar uma tela acima da principal com inputs com as informações do produto como nome, valor, etc 

//* criar um pasta separar o codigo de funções e componentes um arquivo que guarda a lista como um bd e um para as funçoes e paginas do app com coisas relacionadas a interface e coisas a mais de um mercado!! 


import React from "react";
import { Modal, Button, Alert, StyleSheet, Text, View } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const [modalVisible, setModalVisible] = React.useState(false);
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

  //!const adicionarProduto = produtos.append() => {};

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerName}>Mercadinho Do Seu Zé</Text>
        </View>
        <View style={styles.produtos}>
          {produtos.map((produto) => (
            <View key={produto.id} style={styles.produto}>
              <Text>{produto.nome}</Text>
              <Text>R$ {produto.valor.toFixed(2)}</Text>
            </View>
          ))}
        </View>
      <Button title="Abrir Modal" onPress={() => setModalVisible(true)} />
      </SafeAreaView>
      <Modal style={styles.centeredView}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Hello World!</Text>
          <Button title="Fechar" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    padding: "10px",
    borderRadius: "15px",
    elevation: 10,
    backgroundColor: "#9d9d9d",
    width: "85%",
    height: "50px",
  },
  headerName: {
    fontSize: 15,
    fontWeight: "bold",
  },
  produtos: {
    backgroundColor: "#9d9d9d",
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
  modalView: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    padding: 35,
    height: 300,
    width: 300,
    margin: 20,
  },
});
