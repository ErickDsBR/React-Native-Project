//! ideia de usar um modal para adicionar produtos assim podendo criar uma tela acima da principal com inputs com as informações do produto como nome, valor, etc 

//* criar um pasta separar o codigo de funções e componentes um arquivo que guarda a lista como um bd e um para as funçoes e paginas do app com coisas relacionadas a interface e coisas a mais de um mercado!! 


import React from "react";
import { Alert, TextInput, Modal, Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const adicionarProduto = () => {
    //! lógica para adicionar produto
    //!const adicionarProduto = produtos.append() => {};

  };

  const [Name, setName] = React.useState("");
  const [value, setValue] = React.useState("");
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
      <Modal
        justifyContent="center"
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              placeholder="Nome do Produto"
              keyboardType="default"
            />
            <TextInput
              style={styles.input}
              placeholder="Valor do Produto"
              keyboardType="decimal-pad"
              onChangeText={(text) => setName(text)}
            />
            
            <Button title="Adicionar" onPress={() => setModalVisible(false)} />
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaProvider >
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#000",
    flex: 1,
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
    justifyContent: "center",
    flexWrap: "wrap 2, 1",
    flexDirection: "row",
    paddingTop: "10px",
    width: "100%",
    gap: 15,
  },
  produto: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    width: "45%",
    height: "85%",
    borderRadius: 15,
    elevation: 5,
  },
  modalView: {
    backgroundColor: "#9d9d9d",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    elevation: 20,
    padding: 35,
    height: "40%",
    width: "90%",
    margin: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

  },
  input: {
    elevation: 15,
    colortext: "#000",
    backgroundColor: "#fff",
    padding: 10,
    borderBlockColor: "#000",
    textAlign: "center",
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 10,
    width: "80%",
    height: 40,
  },

});
