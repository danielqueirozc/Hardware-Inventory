export function generateCode() {
  const prefix = "#"
  
  // 4 números aleatórios
  const numbers = Math.floor(1000 + Math.random() * 9000) // de 1000 a 9999
  
  // 3 letras aleatórias
  const letters = Array.from({ length: 3 }, () => {
    return String.fromCharCode(65 + Math.floor(Math.random() * 26)) // A–Z
  }).join("")
  
  return `${prefix}${numbers}${letters}`
}

console.log(generateCode()) // ex: #4837DFP
