// Initialize Supabase client
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.38.4/+esm"

// Variáveis para armazenar as credenciais
let supabaseUrl = ""
let supabaseAnonKey = ""
let supabase = null

// Função para inicializar o cliente Supabase
async function initSupabase() {
  try {
    // Buscar credenciais da API
    const response = await fetch("/api/credentials")
    if (!response.ok) {
      throw new Error("Falha ao buscar credenciais do Supabase")
    }

    const credentials = await response.json()
    supabaseUrl = credentials.supabaseUrl
    supabaseAnonKey = credentials.supabaseAnonKey

    console.log("Credenciais obtidas com sucesso")

    // Criar cliente Supabase
    supabase = createClient(supabaseUrl, supabaseAnonKey)

    // Adicionar indicador de status
    addStatusIndicator(true)

    return supabase
  } catch (error) {
    console.error("Erro ao inicializar Supabase:", error)
    addStatusIndicator(false)
    return null
  }
}

// Função para adicionar indicador de status
function addStatusIndicator(isConnected = true) {
  // Verificar se o indicador já existe
  if (document.getElementById("supabase-status")) {
    return
  }

  const statusDiv = document.createElement("div")
  statusDiv.id = "supabase-status"
  statusDiv.style.position = "fixed"
  statusDiv.style.bottom = "10px"
  statusDiv.style.right = "10px"
  statusDiv.style.padding = "8px 12px"
  statusDiv.style.borderRadius = "var(--border-radius)"
  statusDiv.style.backgroundColor = "var(--surface-color)"

  if (isConnected && supabaseUrl && supabaseAnonKey) {
    statusDiv.textContent = "✓ Supabase Connected"
    statusDiv.style.color = "#4CAF50"
  } else {
    statusDiv.textContent = "✗ Supabase Not Connected"
    statusDiv.style.color = "#f44336"
  }

  document.body.appendChild(statusDiv)
}

// Inicializar Supabase quando o DOM estiver carregado
let initPromise = null

// Função para obter o cliente Supabase
export async function getSupabase() {
  if (supabase) {
    return supabase
  }

  if (!initPromise) {
    initPromise = initSupabase()
  }

  return await initPromise
}

// Inicializar quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", getSupabase)

// Exportar função para obter o cliente Supabase
export default getSupabase

