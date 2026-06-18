# 📱 Pokédex Suprema v3 - React Native

Este é um aplicativo móvel funcional desenvolvido em **React Native** (utilizando o ecossistema **Expo**) para a disciplina de **Programação de Banco de Dados SQL**. O app integra consumo de serviços externos, navegação nativa por abas, animações de interface e persistência de dados em nuvem.

---

## 🛠️ Requisitos Atendidos (Checklist da Atividade)

* **🗺️ Navegação Roteada (Mínimo de 3 Telas):** Implementada via `@react-navigation/bottom-tabs` com as telas de *Início*, *Habitats* e *Favoritos*.
* **🌐 Consumo de API Externa:** Integração com a **PokeAPI** utilizando requisições assíncronas (`fetch`) para carregar dados detalhados dos Pokémons.
* **🔥 CRUD Completo com Firebase:** Conexão real com o **Firebase Firestore** para gerenciar os favoritos:
  * **Create:** Salva o Pokémon exibido no banco de dados.
  * **Read:** Lista todos os itens salvos em tempo real com `onSnapshot`.
  * **Update:** Permite alterar/atualizar o apelido do Pokémon diretamente no banco.
  * **Delete:** Remove o Pokémon dos favoritos e deleta o registro no Firestore.
* **✨ Animações na Interface:** Utilização da API nativa `Animated.spring` para criar um efeito de pulo dinâmico na imagem do Pokémon ao ser carregado.

---

## 📁 Estrutura do Repositório

```text
pokedex-suprema/
├── package.json          # Dependências nativas e scripts do Expo
├── App.js                # Configuração do NavigationContainer e Tab Navigator
└── src/
    ├── config/
    │   └── firebase.js   # Arquivo de conexão e credenciais do Firestore
    └── screens/
        ├── HomeScreen.js # Tela principal (Busca, Roleta Geral e Animações)
        ├── ZonesScreen.js# Roletas Elementais (Filtro por habitat puro)
        └── FavScreen.js  # Painel de controle do CRUD de Favoritos

🚀 Como Executar o Aplicativo
Certifique-se de ter o Node.js instalado na sua máquina.

Clone este repositório:

Bash
git clone [https://github.com/SEU-USUARIO/NOME-DO-REPOSITORIO.git](https://github.com/SEU-USUARIO/NOME-DO-REPOSITORIO.git)
Instale as dependências do projeto:

Bash
npm install
Inicie o servidor do Expo:

Bash
npm start
Use o aplicativo Expo Go no seu celular para escanear o QR Code gerado no terminal, ou pressione w para abrir no navegador.
