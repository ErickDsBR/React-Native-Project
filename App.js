import React, { useState } from "react";
import { TextInput, Modal, StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const [Name, setName] = useState("");
  const [value, setValue] = useState("");

  const [produtos, setProdutos] = useState([
    { id: 1, img: "🍎", nome: "Maçã", valor: 2.50, categoria: "frutas" },
    { id: 2, img: "🍌", nome: "Banana", valor: 5.00, categoria: "frutas" },
    { id: 3, img: "☕", nome: "Café", valor: 15.75, categoria: "bebidas" },
    { id: 4, img: "🥛", nome: "Leite", valor: 4.50, categoria: "laticinios" },
    { id: 5, img: "🥩", nome: "Carne", valor: 35.00, categoria: "acougue" },
    { id: 6, img: "🍫", nome: "Chocolate", valor: 8.00, categoria: "doces" }
  ]);

  const [cart, setcart] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [carrinho, setCarrinho] = useState(false);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  const totalCarrinho = cart.reduce((acc, item) => acc + (item.valor * item.quantity), 0);

  const produtosFiltrados = produtos.filter((produto) => {
    const textoLimpo = searchText.toLowerCase();
    return produto.nome.toLowerCase().includes(textoLimpo) ||
      produto.categoria.toLowerCase().includes(textoLimpo);
  });

  const adicionarProduto = () => {
    const novoProduto = {
      id: Date.now(),
      img: "📦",
      nome: Name,
      valor: parseFloat(value) || 0,
      categoria: "Outros"
    }
    setProdutos([...produtos, novoProduto]);
    setModalVisible(false);
    setName("");
    setValue("");
  };

  const adicionarAoCarrinho = (itemClicado) => {
    const itemExistente = cart.find(item => item.id === itemClicado.id);

    if (itemExistente) {
      const novoCarrinho = cart.map(item =>
        item.id === itemClicado.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setcart(novoCarrinho);
    } else {
      const novoItem = {
        ...itemClicado,
        quantity: 1
      };
      setcart([...cart, novoItem]);
    }
  };

  const removerDoCarrinho = (idParaRemover) => {
    const novaLista = cart.filter(item => item.id !== idParaRemover);
    setcart(novaLista);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headersearchArea}
            onPress={() => setSearchModalVisible(true)}
          >
            <Text style={styles.placeholderText}>🔍 Buscar por Nome ou Categoria...</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView}>
          <View style={styles.produtos}>
            {produtos.map((produto) => (
              <View key={produto.id} style={styles.produto}>
                <View style={styles.imgContainer}>
                  <Text style={styles.emoji}>{produto.img}</Text>
                </View>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{produto.nome}</Text>
                <Text style={{ fontSize: 12, color: 'gray' }}>{produto.categoria}</Text>
                <Text>R$ {produto.valor.toFixed(2)}</Text>

                <TouchableOpacity style={styles.addcart} onPress={() => adicionarAoCarrinho(produto)}>
                  <Text style={{ fontWeight: 'bold' }}>Adicionar</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={styles.navgation}>
          <TouchableOpacity style={styles.navgation_button} onPress={() => setModalVisible(true)}>
            <Text style={{ fontSize: 20 }}>➕ Produto</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navgation_button} onPress={() => setCarrinho(true)}>
            <Text style={{ fontSize: 20 }}>🛒 ({cart.reduce((acc, item) => acc + item.quantity, 0)})</Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>

      <Modal
        animationType="fade"
        visible={searchModalVisible}
        onRequestClose={() => setSearchModalVisible(false)}
      >
        <SafeAreaView style={styles.modalSearchContainer}>
          <View style={styles.searchHeader}>
            <TouchableOpacity onPress={() => setSearchModalVisible(false)}>
              <Text style={{ fontSize: 30, marginRight: 10 }}>⬅️</Text>
            </TouchableOpacity>

            <TextInput
              style={styles.searchInputReal}
              placeholder="Ex: Banana ou Frutas"
              value={searchText}
              onChangeText={setSearchText}
              autoFocus={true}
            />
          </View>

          <View style={styles.searchResults}>
            <ScrollView>
              {produtosFiltrados.map((produto) => (
                <View key={produto.id} style={styles.searchItem}>
                  <Text style={{ fontSize: 30 }}>{produto.img}</Text>
                  <View style={{ flex: 1, marginLeft: 15 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{produto.nome}</Text>
                    <Text style={{ color: 'gray', fontStyle: 'italic' }}>{produto.categoria}</Text>
                    <Text style={{ fontWeight: 'bold', color: '#1fdfb6' }}>R$ {produto.valor.toFixed(2)}</Text>
                  </View>

                  <TouchableOpacity
                    style={styles.btnAddSearch}
                    onPress={() => adicionarAoCarrinho(produto)}
                  >
                    <Text style={{ fontWeight: 'bold' }}>Comprar</Text>
                  </TouchableOpacity>
                </View>
              ))}

              {produtosFiltrados.length === 0 && searchText !== "" && (
                <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 16 }}>
                  Nenhum produto encontrado.
                </Text>
              )}
            </ScrollView>
          </View>
        </SafeAreaView>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.teste}>Novo Produto</Text>
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
              placeholder="Valor"
              keyboardType="numeric"
            />

            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity style={[styles.botao, { backgroundColor: '#ff6b6b' }]} onPress={() => setModalVisible(false)}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.botao, { backgroundColor: '#1fdfb6' }]} onPress={adicionarProduto}>
                <Text style={{ fontWeight: 'bold' }}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        visible={carrinho}
        onRequestClose={() => setCarrinho(false)}
      >
        <SafeAreaView style={styles.modalcartContainer}>
          <View style={styles.cartView}>
            <View style={styles.headercart}>
              <Text style={styles.cartheader}>Seu Carrinho</Text>
            </View>
            <View style={styles.cart_products_container}>
              <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 20 }}>
                {cart.length === 0 ? (
                  <Text style={{ marginTop: 50, fontSize: 18, color: '#666' }}>O carrinho está vazio 🛒</Text>
                ) : (
                  cart.map((cart_products) => (
                    <View key={cart_products.id} style={styles.cart_item}>
                      <Text style={styles.emoji_cart}>{cart_products.img}</Text>
                      <View style={{ flex: 1, marginLeft: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#1fdfb6' }}>
                            {cart_products.quantity}x
                          </Text>
                          <Text style={{ fontWeight: 'bold', fontSize: 16, marginLeft: 5 }}>
                            {cart_products.nome}
                          </Text>
                        </View>
                        <Text style={{ fontSize: 14, color: '#333' }}>
                          Total: R$ {(cart_products.valor * cart_products.quantity).toFixed(2)}
                        </Text>
                      </View>
                      <TouchableOpacity style={styles.remove_cart} onPress={() => removerDoCarrinho(cart_products.id)}>
                        <Text style={{ color: 'white', fontSize: 12 }}>Remover</Text>
                      </TouchableOpacity>
                    </View>
                  ))
                )}
              </ScrollView>
            </View>
            <View style={styles.footer_cart}>
              <View style={styles.total_container}>
                <Text style={styles.total_text}>Total a pagar:</Text>
                <Text style={styles.total_valor}>R$ {totalCarrinho.toFixed(2)}</Text>
              </View>
              <TouchableOpacity style={styles.btn_fechar_cart} onPress={() => setCarrinho(false)}>
                <Text style={styles.text_cart_btn}>Fechar Carrinho</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>

    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e0e0e0",
    alignItems: "center",
    flex: 1,
  },
  header: {
    width: "100%",
    padding: 10,
    backgroundColor: "#e0e0e0",
  },
  headersearchArea: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 12,
    width: "100%",
    elevation: 2,
  },
  placeholderText: {
    color: '#999',
    fontWeight: 'bold'
  },
  produtos: {
    padding: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  produto: {
    backgroundColor: "#fff",
    width: '48%',
    height: 260,
    borderRadius: 15,
    elevation: 3,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  imgContainer: {
    height: 100,
    justifyContent: "center",
  },
  emoji: {
    fontSize: 60,
  },
  scrollView: {
    width: "100%",
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    elevation: 5,
    width: '85%',
  },
  input: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    textAlign: "center",
    marginBottom: 15,
    borderRadius: 10,
    width: "100%",
    height: 50,
  },
  teste: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  botao: {
    padding: 10,
    borderRadius: 10,
    width: 100,
    alignItems: 'center',
    elevation: 2
  },
  navgation: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingVertical: 10,
    elevation: 10,
  },
  navgation_button: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 10,
    width: '45%',
    alignItems: "center",
  },
  addcart: {
    backgroundColor: "#81ecec",
    padding: 8,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  modalSearchContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    elevation: 3,
  },
  searchInputReal: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
  },
  searchResults: {
    flex: 1,
    padding: 10,
  },
  searchItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 2,
  },
  btnAddSearch: {
    backgroundColor: "#81ecec",
    padding: 10,
    borderRadius: 8,
  },
  modalcartContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cartView: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
  },
  headercart: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cartheader: {
    fontSize: 24,
    fontWeight: "bold",
  },
  cart_products_container: {
    flex: 1,
    width: "100%",
    paddingTop: 10,
  },
  cart_item: {
    backgroundColor: "#f9f9f9",
    width: "90%",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 1,
    borderWidth: 1,
    borderColor: '#eee'
  },
  emoji_cart: {
    fontSize: 25,
  },
  remove_cart: {
    backgroundColor: '#ff7675',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  footer_cart: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  total_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  total_text: {
    fontSize: 18,
    color: '#666',
  },
  total_valor: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1fdfb6',
  },
  btn_fechar_cart: {
    backgroundColor: "#ff4444",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  text_cart_btn: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});