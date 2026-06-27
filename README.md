# 📱 Pokédex Expo - React Native

Este é um aplicativo móvel funcional desenvolvido em **React Native** (utilizando o ecossistema **Expo**) que integra consumo de API externa, navegação nativa, animações de interface e persistência de dados em nuvem via banco de dados NoSQL.

---

## 🛠️ Requisitos Atendidos (Checklist da Atividade)

* **🗺️ Navegação Roteada (3 Telas):** Implementada via `@react-navigation/stack` com as telas de *Início (Home)*, *Detalhes (Details)* e *Favoritos (Favorites)*.
* **🌐 Consumo de API Externa:** Integração com a **PokeAPI** utilizando o **Axios** para efetuar requisições assíncronas e carregar dados e imagens detalhadas dos Pokémons.
* **🔥 CRUD Completo com Firebase:** Conexão real com o **Firebase Firestore** para gerenciar os favoritos:
  * **Create:** Salva o Pokémon exibido e suas informações no banco de dados.
  * **Read:** Lista todos os itens salvos em uma `FlatList`.
  * **Update:** Permite alterar/atualizar o apelido do Pokémon diretamente no banco via `Alert.prompt`.
  * **Delete:** Remove o Pokémon dos favoritos e deleta o registro no Firestore.
* **✨ Animações na Interface:** Utilização da API nativa `Animated.timing` para criar um efeito suave de *Fade-in* (opacidade gradual) ao abrir a tela de detalhes do Pokémon.

---

## 📁 Estrutura do Repositório

```text
Pokedext/
├── package.json          # Dependências nativas e scripts do Expo
├── App.js                # Configuração do NavigationContainer e Stack Navigator
└── src/
    ├── config/
    │   └── firebase.js   # Arquivo de conexão e credenciais do Firestore
    └── screens/
        ├── HomeScreen.js # Tela principal (Busca por nome/ID e consumo de API)
        ├── FavScreen.js  # Painel de controle do CRUD de Favoritos (Listar, Editar e Deletar)
        └── ZonesScreen.js# Tela adicional de Habitats/Zonas

```
## 🚀 Como Executar o Aplicativo
Certifique-se de ter o **Node.js** instalado na sua máquina.
 1. **Clone este repositório:**
   ```bash
   git clone [https://github.com/eduforte2024/Pokedext.git](https://github.com/eduforte2024/Pokedext.git)
   
   ```
 2. **Entre na pasta do projeto:**
   ```bash
   cd Pokedext
   
   ```
 3. **Instale as dependências do projeto:**
   ```bash
   npm install
   
   ```
 4. **Inicie o servidor do Expo:**
   ```bash
   npx expo start
   
   ```
Use o aplicativo **Expo Go** no seu celular para escanear o QR Code gerado no terminal, ou pressione a para abrir no emulador Android / w para abrir no navegador.
```

```
