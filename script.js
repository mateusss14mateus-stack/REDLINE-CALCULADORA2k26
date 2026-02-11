/* ========= USUÁRIOS ========= */
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || {
  admin: { senha: "1234", tipo: "adm" }
};

let usuarioLogado = null;

/* ========= ITENS ========= */
let itens = JSON.parse(localStorage.getItem("itens")) || {
  "Turbo": 50000,
  "Transmissão N1": 60000,
  "Transmissão N2": 80000,
  "Transmissão N3": 100000,

  "Vidro": 20000,
  "Cor Primária": 20000,
  "Cor Secundária": 20000,
  "Parachoque Dianteiro": 20000,
  "Parachoque Traseiro": 20000,
  "Aerofólio": 20000,
  "Painel": 20000,
  "Roda": 20000,
  "Manopola do Câmbio": 20000,
  "Extras do Veículo": 20000,
  "Buzina": 20000,
  "Neon": 80000,
  "Xenon": 80000,
  "Cor do Xenon": 30000,

  "Blindagem Full": 1500000,
  "Full Tuning": 350000,
  "Remap": 900000
};

function salvar() {
  localStorage.setItem("itens", JSON.stringify(itens));
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

/* ========= LOGIN ========= */
function login() {
  const u = loginUser.value;
  const p = loginPass.value;

  if (!usuarios[u] || usuarios[u].senha !== p) {
    loginMsg.innerText = "Usuário ou senha inválidos";
    return;
  }

  usuarioLogado = usuarios[u];
  loginBox.classList.add("hidden");
  calcBox.classList.remove("hidden");

  if (usuarioLogado.tipo === "adm") {
    adminBox.classList.remove("hidden");
  }

  render();
}

function logout() {
  location.reload();
}

/* ========= CALCULADORA ========= */
function render() {
  const div = document.getElementById("itens");
  const admin = document.getElementById("listaAdmin");
  div.innerHTML = "";
  admin.innerHTML = "";

  Object.keys(itens).forEach(nome => {
    div.innerHTML += `
      <div class="item">
        <label>
          <input type="checkbox" value="${itens[nome]}" onchange="calcular()">
          ${nome}
        </label>
        <span>${formatar(itens[nome])}</span>
      </div>
    `;

    admin.innerHTML += `${nome} - ${formatar(itens[nome])}<br>`;
  });
}

function calcular() {
  let total = 0;
  document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    if (cb.checked) total += Number(cb.value);
  });
  total.innerText = formatar(total);
}

function resetar() {
  document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
  calcular();
}

/* ========= ADM ========= */
function adicionarItem() {
  itens[nomeItem.value] = Number(valorItem.value);
  salvar();
  render();
}

function criarUsuario() {
  usuarios[novoUser.value] = {
    senha: novaPass.value,
    tipo: novoTipo.value
  };
  salvar();
  alert("Usuário criado com sucesso");
}

/* ========= UTIL ========= */
function formatar(v) {
  return "R$ " + v.toLocaleString("pt-BR");
}

salvar();
