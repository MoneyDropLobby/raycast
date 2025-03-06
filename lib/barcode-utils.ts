export const BARCODE_TYPES = [
  { value: "EAN13", label: "EAN-13" },
  { value: "EAN8", label: "EAN-8" },
  { value: "CODE128", label: "Code 128" },
  { value: "CODE39", label: "Code 39" },
  { value: "UPC", label: "UPC" },
  { value: "QR", label: "QR Code" },
]

// Funktion zum Generieren einer zufälligen Zahl in einem Bereich
function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Funktion zum Generieren einer Prüfziffer für EAN-13
function calculateEAN13CheckDigit(digits: string): string {
  // EAN-13 verwendet eine gewichtete Summe der ersten 12 Ziffern
  // Gerade Positionen werden mit 3 multipliziert, ungerade mit 1
  let sum = 0
  for (let i = 0; i < 12; i++) {
    const digit = Number.parseInt(digits[i], 10)
    sum += i % 2 === 0 ? digit : digit * 3
  }

  // Die Prüfziffer ist die Differenz zwischen der nächsten durch 10 teilbaren Zahl und der Summe
  const checkDigit = (10 - (sum % 10)) % 10
  return checkDigit.toString()
}

// Funktion zum Generieren einer Prüfziffer für EAN-8
function calculateEAN8CheckDigit(digits: string): string {
  // EAN-8 verwendet eine gewichtete Summe der ersten 7 Ziffern
  // Ungerade Positionen werden mit 3 multipliziert, gerade mit 1
  let sum = 0
  for (let i = 0; i < 7; i++) {
    const digit = Number.parseInt(digits[i], 10)
    sum += i % 2 === 0 ? digit * 3 : digit
  }

  // Die Prüfziffer ist die Differenz zwischen der nächsten durch 10 teilbaren Zahl und der Summe
  const checkDigit = (10 - (sum % 10)) % 10
  return checkDigit.toString()
}

// Interface für Barcode-Objekte
interface Barcode {
  id: string
  code: string
  type: string
  isMain: boolean
  createdAt: string
}

// Funktion zum Generieren eines Barcodes basierend auf dem Typ
export function generateBarcode(type: string, articleId: string): string {
  switch (type) {
    case "EAN13": {
      // Generiere 12 zufällige Ziffern
      let digits = ""
      for (let i = 0; i < 12; i++) {
        digits += getRandomInt(0, 9).toString()
      }
      // Füge die Prüfziffer hinzu
      return digits + calculateEAN13CheckDigit(digits)
    }

    case "EAN8": {
      // Generiere 7 zufällige Ziffern
      let digits = ""
      for (let i = 0; i < 7; i++) {
        digits += getRandomInt(0, 9).toString()
      }
      // Füge die Prüfziffer hinzu
      return digits + calculateEAN8CheckDigit(digits)
    }

    case "CODE128": {
      // Für Code 128 verwenden wir eine Kombination aus dem Artikel-ID und Zufallszahlen
      const prefix = "C128"
      const randomPart = getRandomInt(100000, 999999).toString()
      return `${prefix}-${articleId.substring(0, 4)}-${randomPart}`
    }

    case "CODE39": {
      // Für Code 39 verwenden wir Buchstaben und Zahlen
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
      let result = "*" // Code 39 beginnt und endet mit *
      for (let i = 0; i < 10; i++) {
        result += chars.charAt(getRandomInt(0, chars.length - 1))
      }
      return result + "*"
    }

    case "UPC": {
      // UPC-A hat 11 Ziffern plus eine Prüfziffer
      let digits = ""
      for (let i = 0; i < 11; i++) {
        digits += getRandomInt(0, 9).toString()
      }
      // Berechne die Prüfziffer (ähnlich wie bei EAN)
      let sum = 0
      for (let i = 0; i < 11; i++) {
        const digit = Number.parseInt(digits[i], 10)
        sum += i % 2 === 0 ? digit * 3 : digit
      }
      const checkDigit = (10 - (sum % 10)) % 10
      return digits + checkDigit.toString()
    }

    case "QR": {
      // Für QR-Codes generieren wir einen eindeutigen String
      const timestamp = new Date().getTime()
      const random = getRandomInt(1000, 9999)
      return `QR-${articleId}-${timestamp}-${random}`
    }

    default:
      throw new Error(`Unbekannter Barcode-Typ: ${type}`)
  }
}

// Funktion zum Erstellen eines neuen Barcode-Objekts
export function createBarcode(type: string, articleId: string, isMain = false): Barcode {
  return {
    id: `bc-${new Date().getTime()}-${getRandomInt(1000, 9999)}`,
    code: generateBarcode(type, articleId),
    type,
    isMain,
    createdAt: new Date().toISOString(),
  }
}

