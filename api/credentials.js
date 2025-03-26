export default function handler(req, res) {
    // Configurar CORS para permitir acesso da sua origem
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type")
  
    // Retornar as credenciais do Supabase
    res.status(200).json({
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
    })
  }
  