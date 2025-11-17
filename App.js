//! ideia de usar um modal para adicionar produtos assim podendo criar uma tela acima da principal com inputs com as informações do produto como nome, valor, etc 

//* criar um pasta separar o codigo de funções e componentes um arquivo que guarda a lista como um bd e um para as funçoes e paginas do app com coisas relacionadas a interface e coisas a mais de um mercado!! 

import React, { useState } from "react";
import { TextInput, Modal, Button, StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
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
      categoria: "frutas",
    },
    {
      id: 2,
      categoria: "frutas",
      img: "🍌",
      nome: "banana",
      valor: 50,
    },
    {
      id: 3,
      nome: "Café",
      valor: 150.75,
      categoria: "Cafe em po",
    }
  ]);
  const [cart, setcart] = useState([
    {

    }


  ]);

  const [modalVisible, setModalVisible] = React.useState(false);
  const [carrinho, setCarrinho] = useState(false);

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
          <TextInput style={styles.headersearch} placeholder="Pesquisar Produto" />
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.produtos}>
            {produtos.map((produto) => (
              <View key={produto.id} style={styles.produto}>
                <View style={styles.imgContainer}>
                  <Text style={styles.emoji} >{produto.img}</Text>
                </View>
                <Text>{produto.nome}</Text>
                <Text>R$ {produto.valor.toFixed(2)}</Text>
                <TouchableOpacity style={styles.addcart} onPress={() => { }}>
                  <Text>Adicionar ao Carrinho</Text>
                </TouchableOpacity>
              </View>

            ))}
          </View>
        </ScrollView>
        <View style={styles.navgation}>
          <TouchableOpacity style={styles.navgation_button} title="Adicionar Produto" onPress={() => setModalVisible(true)}>
            <Text>🏬</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navgation_button} title="Adicionar Produto" onPress={() => setCarrinho(true)}>
            <Text>🛒</Text>
          </TouchableOpacity>
        </View>
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
      <SafeAreaView style={styles.modalcart}>
        <Modal
          justifyContent="center"
          animationType="slide"
          visible={carrinho}
          onRequestClose={() => setCarrinho(false)}
        >
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.cartView}>
              <Text style={styles.cartheader} >Carrinho</Text>
              <TouchableOpacity style={styles.botao} onPress={() => setCarrinho(false)}>
                <Text>Fechar</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Modal>
      </SafeAreaView>

    </SafeAreaProvider >
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#9d9d9d",
    alignItems: "center",
    flex: 1,
  },
  header: {
    width: "100%",
    height: "50px",
  },
  headersearch: {
    backgroundColor: "#9d9d9d",
    borderRadius: 15,
    padding: 10,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    width: "100%",
    height: "50px",
  },
  produtos: {
    marginTop: 10,
    elevation: 10,
    padding: "10px",
    backgroundColor: "#9d9d9d",
    justifyContent: "center",
    flexWrap: "wrap",
    flexDirection: "row",
    width: "100%",
    gap: '1%',
  },
  produto: {
    elevation: 10,
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    width: '48%',
    height: 300,
    borderRadius: 15,
    elevation: 5,
  },
  imgContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 150,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 100,
  },
  scrollView: {
    width: "100%",
    marginBottom: 10,
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

  },
  navgation: {
    backgroundColor: "#9d9d9d",
    padding: 10,
    borderRadius: 15,
    elevation: 10,
    justifyContent: "space-around",
    flexDirection: "row",
    width: "100%",
  },
  navgation_button: {
    width: 120,
    borderRadius: 15,
    elevation: 10,
    padding: 10,
    marginBottom: 10,
    justifyContent: "space-evenly",
    backgroundColor: "#1fdfb6ff",
    alignItems: "center",
  },




});
