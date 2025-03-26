// Este arquivo é executado no servidor e não é exposto ao cliente
export default function handler(req, res) {
  // Apenas permitir método GET
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  // Retornar apenas a URL pública e a chave anônima
  // Estas são seguras para uso no cliente, mas ainda assim é melhor não hardcoding
  res.status(200).json({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  })
}

