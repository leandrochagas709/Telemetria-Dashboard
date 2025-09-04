// Basic "front-end only" auth (demo). In produção, use backend e tokens!
const VALID_USER = "admin";
const VALID_PASS = "1234";

const loginSection = document.getElementById("login-section");
const dashboard = document.getElementById("dashboard");
const loginForm = document.getElementById("login-form");
const loginError = document.getElementById("login-error");
const logoutBtn = document.getElementById("logout");
const tbody = document.querySelector("#telemetry-table tbody");
const search = document.getElementById("search");

const rows = [
  { logo: "BV", emissora: "Boa Ventura", nome: "São Paulo - CH30", status: "Failure", ultima: "09/07/2025 12:30:17" },
  { logo: "RIT", emissora: "RIT", nome: "Dourados - CH41", status: "Ok", ultima: "08/08/2025 17:14:42" },
  { logo: "TV", emissora: "TV Guanandi", nome: "Campo Grande - CH21", status: "Ok", ultima: "08/08/2025 17:21:23" },
  { logo: "RIT", emissora: "RIT", nome: "Sao Paulo - CH40", status: "Ok", ultima: "08/08/2025 17:20:46" },
  { logo: "STB", emissora: "STB", nome: "Sao Paulo - CH30 - ANTIGO", status: "Ok", ultima: "27/06/2025 14:01:58" },
  { logo: "RIT", emissora: "RIT", nome: "Cabo Frio - CH48", status: "Ok", ultima: "04/07/2025 18:39:26" },
  { logo: "RIT", emissora: "RIT", nome: "Salvador - CH49", status: "Ok", ultima: "08/08/2025 17:14:42" },
  { logo: "RIT", emissora: "RIT", nome: "Curitiba - CH23", status: "Ok", ultima: "08/08/2025 17:17:45" },
  { logo: "STB", emissora: "STB", nome: "FÁBRICA - EM TESTE", status: "-", ultima: "27/06/2025 15:11:39" },
];

function renderTable(filter = "") {
  tbody.innerHTML = "";
  const f = filter.trim().toLowerCase();
  rows
    .filter(r => !f || Object.values(r).some(v => String(v).toLowerCase().includes(f)))
    .forEach(r => {
      const tr = document.createElement("tr");

      const tdLogo = document.createElement("td");
      tdLogo.className = "logo-cell";
      tdLogo.innerHTML = `<span class="logo-pill">${r.logo}</span>`;
      tr.appendChild(tdLogo);

      const tdEmis = document.createElement("td");
      tdEmis.className = "emissora";
      tdEmis.textContent = r.emissora;
      tr.appendChild(tdEmis);

      const tdNome = document.createElement("td");
      tdNome.className = "name";
      tdNome.textContent = r.nome;
      tr.appendChild(tdNome);

      const tdStatus = document.createElement("td");
      const st = document.createElement("span");
      st.className = "status " + (r.status.toLowerCase() === "ok" ? "ok" : r.status.toLowerCase());
      st.textContent = r.status;
      tdStatus.appendChild(st);
      tr.appendChild(tdStatus);

      const tdUlt = document.createElement("td");
      tdUlt.textContent = r.ultima;
      tr.appendChild(tdUlt);

      tbody.appendChild(tr);
    });
}

function showDashboard() {
  loginSection.classList.add("hidden");
  dashboard.classList.remove("hidden");
  renderTable();
}

function showLogin() {
  dashboard.classList.add("hidden");
  loginSection.classList.remove("hidden");
}

// Session using localStorage (demo only)
const session = localStorage.getItem("telemetry_session");
if (session === "logged") showDashboard();

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  if (user === VALID_USER && pass === VALID_PASS) {
    localStorage.setItem("telemetry_session", "logged");
    showDashboard();
  } else {
    loginError.textContent = "Usuário ou senha inválidos.";
  }
});

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("telemetry_session");
  showLogin();
});

search.addEventListener("input", (e) => {
  renderTable(e.target.value);
});
const modal = document.getElementById("emissora-modal");
const closeModalBtn = document.getElementById("close-modal");

function openModal(row) {
  document.getElementById("modal-emissora").textContent = row.emissora;
  document.getElementById("modal-nome").textContent = row.nome;
  document.getElementById("modal-status").textContent = row.status;
  document.getElementById("modal-ultima").textContent = row.ultima;
  modal.classList.remove("hidden");
}

closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// adiciona click nas linhas
function renderTable(filter = "") {
  tbody.innerHTML = "";
  const f = filter.trim().toLowerCase();
  rows
    .filter(r => !f || Object.values(r).some(v => String(v).toLowerCase().includes(f)))
    .forEach(r => {
      const tr = document.createElement("tr");

      tr.addEventListener("click", () => openModal(r));

      const tdLogo = document.createElement("td");
      tdLogo.className = "logo-cell";
      tdLogo.innerHTML = `<span class="logo-pill">${r.logo}</span>`;
      tr.appendChild(tdLogo);

      const tdEmis = document.createElement("td");
      tdEmis.className = "emissora";
      tdEmis.textContent = r.emissora;
      tr.appendChild(tdEmis);

      const tdNome = document.createElement("td");
      tdNome.className = "name";
      tdNome.textContent = r.nome;
      tr.appendChild(tdNome);

      const tdStatus = document.createElement("td");
      const st = document.createElement("span");
      st.className = "status " + (r.status.toLowerCase() === "ok" ? "ok" : r.status.toLowerCase());
      st.textContent = r.status;
      tdStatus.appendChild(st);
      tr.appendChild(tdStatus);

      const tdUlt = document.createElement("td");
      tdUlt.textContent = r.ultima;
      tr.appendChild(tdUlt);

      tbody.appendChild(tr);
    });
}