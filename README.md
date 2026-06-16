# 🚀 Pokédex Suprema v3

Uma Pokédex interativa e moderna construída com **Node.js**, **Express** e integração com a **PokeAPI**. O projeto conta com mecânicas avançadas de filtragem por habitats puros, simulação de operações CRUD para favoritos e histórico de navegação em tempo real.

---

## 🗺️ Funcionalidades Principais

* **🎲 Roleta Pokémon Aleatória:** Sorteie qualquer criatura da primeira geração com animações fluidas.
* **🔥 Roletas Elementais (Zonas de Habitat):** Sistema de filtragem corrigido e calibrado! Garante que apenas Pokémons cujo **tipo principal** corresponde ao ambiente sejam sorteados (evitando misturas indesejadas como tipos água na zona de fogo).
* **🧬 Sistema de Evolução Dinâmica:** Identifica a cadeia evolutiva do Pokémon atual e permite avançar para a próxima forma com um único clique.
* **⭐ Favoritos com CRUD:** Interface simulada no padrão Firebase que permite Salvar (Create), Listar (Read), Apelidar/Editar (Update) e Excluir (Delete) seus Pokémons favoritos.
* **📝 Histórico de Consultas:** Registro cronológico de todas as suas atividades na Pokédex durante a sessão.

---

## 📁 Estrutura do Projeto

O projeto foi modularizado seguindo as melhores práticas de desenvolvimento web de mercado:

```text
pokedex-suprema/
│
├── package.json         # Dependências do Node.js (Express)
├── server.js            # Servidor web local backend
└── public/              # Arquivos front-end servidos pelo app
    ├── index.html       # Estrutura esquelética e abas do app
    ├── css/
    │   └── styles.css   # Estilização completa e responsiva (Dark Mode)
    └── js/
        └── app.js       # Toda a lógica de consumo da PokeAPI e CRUD
🛠️ Tecnologias Utilizadas
HTML5 & CSS3 (Variáveis nativas, Flexbox, Grid e Animações @keyframes)

JavaScript (ES6+) (Consumo de API Assíncrona com async/await e manipulação de DOM)

Node.js & Express (Estruturação de servidor local para entrega dos arquivos)

PokeAPI (Fonte oficial de dados dos monstrinhos)

🚀 Como Executar o Projeto Localmente
Caso queira baixar e rodar este repositório na sua máquina:

Clone o repositório:

Bash
git clone [https://github.com/SEU-USUARIO/pokedex-suprema.git](https://github.com/SEU-USUARIO/pokedex-suprema.git)
Acesse a pasta do projeto:

Bash
cd pokedex-suprema
Instale as dependências necessárias:

Bash
npm install
Inicie o servidor:

Bash
npm start
Abra o seu navegador e acesse: http://localhost:3000
