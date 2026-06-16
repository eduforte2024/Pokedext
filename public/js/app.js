let localFirebaseStorage = [];
let currentPokemonData = null;
let originalFormPokemonData = null; 
let logs = [];
let currentActiveId = 1; 

const typeColors = {
    fire: "#aa3838", water: "#297bb8", grass: "#239a51",
    electric: "#ca9f0e", psychic: "#7d4694", normal: "#707a7a",
    bug: "#5d8233", poison: "#843282", ground: "#b89a4f",
    flying: "#846ec5", fighting: "#96241f", rock: "#91802b",
    ghost: "#594375", ice: "#74b1af", dragon: "#5424ca",
    steel: "#506060", fairy: "#ca7ca4"
};

window.onload = () => {
    loadInitialPokemonList();
    fetchPokemonById(1, false); 
};

function switchTab(tabName) {
    document.getElementById('tab-content-home').classList.add('hidden');
    document.getElementById('tab-content-zones').classList.add('hidden');
    document.getElementById('tab-content-list').classList.add('hidden');
    document.getElementById('tab-content-favorites').classList.add('hidden');
    document.getElementById('tab-content-history').classList.add('hidden');
    
    document.getElementById('tab-home').classList.remove('active');
    document.getElementById('tab-zones').classList.remove('active');
    document.getElementById('tab-list').classList.remove('active');
    document.getElementById('tab-favorites').classList.remove('active');
    document.getElementById('tab-history').classList.remove('active');

    if(tabName === 'home') {
        document.getElementById('tab-content-home').classList.remove('hidden');
        document.getElementById('tab-home').classList.add('active');
        document.getElementById('header-title').innerText = "Início - Pokédex";
    } else if(tabName === 'zones') {
        document.getElementById('tab-content-zones').classList.remove('hidden');
        document.getElementById('tab-zones').classList.add('active');
        document.getElementById('header-title').innerText = "Zonas de Habitat";
    } else if(tabName === 'list') {
        document.getElementById('tab-content-list').classList.remove('hidden');
        document.getElementById('tab-list').classList.add('active');
        document.getElementById('header-title').innerText = "Lista Completa";
    } else if(tabName === 'favorites') {
        document.getElementById('tab-content-favorites').classList.remove('hidden');
        document.getElementById('tab-favorites').classList.add('active');
        document.getElementById('header-title').innerText = "Favoritos";
        triggerRead();
    } else if(tabName === 'history') {
        document.getElementById('tab-content-history').classList.remove('hidden');
        document.getElementById('tab-history').classList.add('active');
        document.getElementById('header-title').innerText = "Histórico";
        renderHistory();
    }
}

function addLog(actionText) {
    const time = new Date().toLocaleTimeString();
    logs.unshift(`[${time}] ${actionText}`);
}

function renderHistory() {
    const container = document.getElementById('history-box');
    if(!container) return;
    if(logs.length === 0) {
        container.innerHTML = '<p style="color: var(--text-muted); text-align: center; font-style: italic;">Nenhuma atividade recente.</p>';
        return;
    }
    container.innerHTML = logs.map(item => `<div class="log-item">${item}</div>`).join('');
}

function clearHistory() {
    if(confirm("Deseja mesmo apagar todo o histórico de consultas?")) {
        logs = [];
        renderHistory();
    }
}

function navigatePokemon(direction) {
    let targetId = currentActiveId + direction;
    if (targetId < 1) targetId = 1;
    if (targetId > 1010) targetId = 1010; 
    fetchPokemonById(targetId, true);
}

async function fetchPokemonById(idValue, logActivity = true) {
    const loader = document.getElementById('home-loading');
    if(loader) loader.classList.remove('hidden');
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${idValue}`);
        const data = await res.json();
        originalFormPokemonData = data; 
        showPokemonDetails(data, true);
        if (logActivity) addLog(`Navegou para o ID: ${data.id} (${data.name.toUpperCase()})`);
    } catch (e) {
        console.error(e);
    } finaly {
        if(loader) loader.classList.add('hidden');
    }
}

async function fetchZonePokemon(targetType, zoneName) {
    const loader = document.getElementById('zone-loading');
    if(loader) loader.classList.remove('hidden');
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/type/${targetType}`);
        const typeData = await response.json();
        const rawList = typeData.pokemon;
        if(rawList.length === 0) return alert("Nenhum Pokémon mapeado nesse habitat.");

        let attempts = 0; let foundValidPokemon = false; let data = null;
        while (attempts < 15 && !foundValidPokemon) {
            attempts++;
            const randomIndex = Math.floor(Math.random() * rawList.length);
            const resDetails = await fetch(rawList[randomIndex].pokemon.url);
            data = await resDetails.json();
            if (data.types && data.types[0].type.name === targetType) foundValidPokemon = true;
        }

        originalFormPokemonData = data;
        showPokemonDetails(data, true);
        addLog(`Girou Roleta de Ambiente [${zoneName}]: "${data.name.toUpperCase()}"`);
        switchTab('home');
    } catch (error) {
        alert("Erro ao rodar a roleta do habitat.");
    } finaly {
        if(loader) loader.classList.add('hidden');
    }
}

async function loadInitialPokemonList() {
    const grid = document.getElementById('main-pokemon-grid');
    const loader = document.getElementById('list-loading');
    if(loader) loader.classList.remove('hidden');
    try {
        for(let i = 1; i <= 30; i++) {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
            const data = await res.json();
            const miniCard = document.createElement('div');
            miniCard.className = 'poke-mini-card';
            miniCard.onclick = () => { originalFormPokemonData = data; showPokemonDetails(data, true); switchTab('home'); };
            miniCard.innerHTML = `<img src="${data.sprites.front_default}"><div>${data.name}</div>`;
            if(grid) grid.appendChild(miniCard);
        }
    } catch (e) {} finaly {
        if(loader) loader.classList.add('hidden');
    }
}

async function searchPokemon() {
    const val = document.getElementById('search-input').value.toLowerCase().trim();
    if(!val) return alert("Digite algo!");
    const loader = document.getElementById('home-loading');
    if(loader) loader.classList.remove('hidden');
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${val}`);
        const data = await res.json();
        originalFormPokemonData = data;
        showPokemonDetails(data, true);
        addLog(`Buscou por: "${data.name.toUpperCase()}"`);
    } catch {
        alert("Não encontrado!");
    } finaly {
        if(loader) loader.classList.add('hidden');
    }
}

async function fetchRandomPokemon() {
    const loader = document.getElementById('home-loading');
    if(loader) loader.classList.remove('hidden');
    try {
        const randomId = Math.floor(Math.random() * 151) + 1;
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        const data = await res.json();
        originalFormPokemonData = data;
        showPokemonDetails(data, true);
        addLog(`Sorteou na roleta geral: "${data.name.toUpperCase()}"`);
    } catch (e) {
    } finaly {
        if(loader) loader.classList.add('hidden');
    }
}

async function showPokemonDetails(data, isBaseForm = true) {
    currentPokemonData = data; currentActiveId = data.id;
    const targetArea = document.getElementById('detail-card-area');
    if(!targetArea) return;
    document.body.style.backgroundColor = typeColors[data.types[0].type.name] || "#13131a";

    let actionButtonHtml = '';
    if (isBaseForm) {
        try {
            const speciesRes = await fetch(data.species.url); const speciesData = await speciesRes.json();
            const evoRes = await fetch(speciesData.evolution_chain.url); const evoData = await evoRes.json();
            let currentEvo = evoData.chain; let evoChainNames = [];
            while (currentEvo) { evoChainNames.push(currentEvo.species.name); currentEvo = currentEvo.evolves_to[0]; }
            const currentIndex = evoChainNames.indexOf(data.name);
            if (currentIndex !== -1 && currentIndex < evoChainNames.length - 1) {
                let nextEvoName = evoChainNames[currentIndex + 1];
                actionButtonHtml = `<button class="btn-primary" style="margin-top:15px; width:100%; background:#2ecc71;" onclick="fetchEvolutionForm('${nextEvoName}')">🧬 Ver Evolução: ${nextEvoName.toUpperCase()} ➔</button>`;
            } else { actionButtonHtml = `<p style="font-size:13px; color:var(--text-muted); margin-top:15px;">Sem evoluções adicionais.</p>`; }
        } catch (err) { actionButtonHtml = `<p style="font-size:13px; color:var(--text-muted); margin-top:15px;">Evoluções não mapeadas.</p>`; }
    } else {
        actionButtonHtml = `<button class="btn-primary" style="margin-top:15px; width:100%; background:#34495e;" onclick="restoreBaseForm()">↩ Voltar para Forma Base</button>`;
    }

    targetArea.innerHTML = `
        <div class="card">
            <img class="animated-image" src="${data.sprites.front_default}">
            <div class="poke-name">${data.name.toUpperCase()}</div>
            <div class="poke-info">Nº ${data.id} - Tipo: ${data.types.map(t => t.type.name.toUpperCase()).join('/')}</div>
            <div style="display:flex; justify-content:space-around; background:rgba(0,0,0,0.3); padding:10px; border-radius:10px; margin:15px 0;">
                <div>⚖️ ${data.weight / 10} kg</div><div>📏 ${data.height / 10} m</div>
            </div>
            ${actionButtonHtml}
            <button class="btn-accent" style="margin-top:20px; width:100%;" onclick="triggerCreate()">⭐ Salvar nos Favoritos</button>
        </div>
    `;
}

async function fetchEvolutionForm(name) {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await res.json(); showPokemonDetails(data, false);
    } catch (e) {}
}

function restoreBaseForm() { if (originalFormPokemonData) showPokemonDetails(originalFormPokemonData, true); }

function triggerCreate() {
    if(!currentPokemonData) return;
    if(localFirebaseStorage.some(p => p.pokeId === currentPokemonData.id)) return alert("Já está nos favoritos!");
    const newFav = { id: Date.now().toString(), pokeId: currentPokemonData.id, nome: currentPokemonData.name, apelido: currentPokemonData.name.toUpperCase(), imagem: currentPokemonData.sprites.front_default, tipo: currentPokemonData.types[0].type.name };
    localFirebaseStorage.push(newFav); addLog(`Favoritou: "${newFav.nome.toUpperCase()}"`); switchTab('favorites');
}

function triggerRead() {
    const list = document.getElementById('favorites-list'); if(!list) return; list.innerHTML = '';
    if(localFirebaseStorage.length === 0) { list.innerHTML = '<p style="color:var(--text-muted); text-align:center; font-style:italic; margin-top:30px;">Lista vazia.</p>'; return; }
    localFirebaseStorage.forEach(item => {
        list.innerHTML += `
            <div class="fav-item">
                <img src="${item.imagem}" class="fav-avatar">
                <div class="fav-info"><div class="fav-name">${item.nome}</div><div class="fav-nickname">"${item.apelido}"</div></div>
                <div><button class="btn-primary" style="background:#2980b9; padding:5px 10px;" onclick="triggerUpdate('${item.id}', '${item.apelido}')">✏️</button>
                <button class="btn-primary" style="background:#c0392b; padding:5px 10px;" onclick="triggerDelete('${item.id}')">🗑️</button></div>
            </div>`;
    });
}

function triggerUpdate(id, currentNick) {
    const newNick = prompt("Novo apelido:", currentNick);
    if(newNick && newNick.trim() !== "") {
        const index = localFirebaseStorage.findIndex(p => p.id === id);
        if(index !== -1) { localFirebaseStorage[index].apelido = newNick.trim(); triggerRead(); }
    }
}

function triggerDelete(id) {
    if(confirm("Remover?")) { localFirebaseStorage = localFirebaseStorage.filter(p => p.id !== id); triggerRead(); }
}
