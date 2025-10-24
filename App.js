//! ideia de usar um modal para adicionar produtos assim podendo criar uma tela acima da principal com inputs com as informações do produto como nome, valor, etc 

//* criar um pasta separar o codigo de funções e componentes um arquivo que guarda a lista como um bd e um para as funçoes e paginas do app com coisas relacionadas a interface e coisas a mais de um mercado!! 

import React, { useState } from "react";
import { TextInput, Modal, Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
//!!.............................................

export default function App() {
  const [Name, setName] = useState("");
  const [value, setValue] = useState("");
  const [produtos, setProdutos] = useState([
    {
      id: 1,
      nome: "maça",
      valor: 2.50,
    },
    {
      id: 2,
      nome: "banana",
      valor: 50,
    },
  ]);
  
  const [modalVisible, setModalVisible] = React.useState(false);

  const adicionarProduto = () => {
    const novoProduto = {
      id: produtos.length + 1,
      nome: Name,
      valor: parseFloat(value),
    }
    setProdutos([...produtos, novoProduto]);
    setModalVisible(false);
  };

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
        <Button title="Adicionar Produto" onPress={() => setModalVisible(true)}/>
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
            <Text style={styles.teste} >{Name}</Text>
            <TextInput
              style={styles.input}
              onChangeText={setName}
              value={Name}
              placeholder="Nome do Produto" 
            />
            <TextInput
              style={styles.input}
              onChangeText={setValue}
              value={value}
              placeholder="Valor do Produto"
              keyboardType="numeric"

            />
            <TouchableOpacity style={styles.botao} onPress={() => setModalVisible(false)}>
              <Text>Fechar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botao} onPress={adicionarProduto}>
              <Text>Adicionar</Text>
            </TouchableOpacity>
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
    flexWrap: "wrap",
    flexDirection: "row",
    paddingTop: "10px",
    width: "100%",
    gap: '1%',
  },
  produto: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    width: '48%',
    height: 300,
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
    height: 300,
    width: 350,
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
  teste: {
    colortext: "#000",
    marginBottom: 15,
    fontSize: 20,
    fontWeight: "bold",

  },
  botao: {
    backgroundColor: "#fff",
    alignItems: "center",
    width: "50%",
    height: 40,
    elevation: 10,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,

  }

});
