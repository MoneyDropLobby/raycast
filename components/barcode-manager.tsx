"use client"

import { useState } from "react"
import { Plus, Trash2, Check, X, BarcodeIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BARCODE_TYPES, createBarcode } from "@/lib/barcode-utils"
import type { Barcode } from "@/types" // Import the Barcode type

interface BarcodeManagerProps {
  barcodes: Barcode[]
  onBarcodesChange: (barcodes: Barcode[]) => void
  articleId: string
}

export function BarcodeManager({ barcodes, onBarcodesChange, articleId }: BarcodeManagerProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [newBarcodeType, setNewBarcodeType] = useState("EAN13")
  const [newBarcodeValue, setNewBarcodeValue] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  // Funktion zum Hinzufügen eines neuen Barcodes
  const addBarcode = () => {
    let newBarcode: Barcode

    if (isGenerating) {
      // Generiere einen neuen Barcode
      newBarcode = createBarcode(newBarcodeType, articleId, barcodes.length === 0)
    } else {
      // Verwende den manuell eingegebenen Barcode
      if (!newBarcodeValue.trim()) {
        return // Verhindere leere Barcodes
      }

      newBarcode = {
        id: `bc-${new Date().getTime()}-${Math.floor(Math.random() * 9000) + 1000}`,
        code: newBarcodeValue.trim(),
        type: newBarcodeType,
        isMain: barcodes.length === 0, // Der erste Barcode ist standardmäßig der Hauptbarcode
        createdAt: new Date().toISOString(),
      }
    }

    onBarcodesChange([...barcodes, newBarcode])
    resetForm()
  }

  // Funktion zum Löschen eines Barcodes
  const deleteBarcode = (id: string) => {
    const updatedBarcodes = barcodes.filter((barcode) => barcode.id !== id)

    // Wenn der Hauptbarcode gelöscht wurde und es noch andere Barcodes gibt,
    // setze den ersten verbleibenden Barcode als Hauptbarcode
    if (barcodes.find((b) => b.id === id)?.isMain && updatedBarcodes.length > 0) {
      updatedBarcodes[0].isMain = true
    }

    onBarcodesChange(updatedBarcodes)
  }

  // Funktion zum Festlegen eines Barcodes als Hauptbarcode
  const setAsMainBarcode = (id: string) => {
    const updatedBarcodes = barcodes.map((barcode) => ({
      ...barcode,
      isMain: barcode.id === id,
    }))

    onBarcodesChange(updatedBarcodes)
  }

  // Formular zurücksetzen
  const resetForm = () => {
    setIsAdding(false)
    setNewBarcodeType("EAN13")
    setNewBarcodeValue("")
    setIsGenerating(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Barcodes</h3>
        {!isAdding && (
          <Button onClick={() => setIsAdding(true)} size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Barcode hinzufügen
          </Button>
        )}
      </div>

      {/* Barcode-Tabelle */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Barcode</TableHead>
              <TableHead>Typ</TableHead>
              <TableHead>Erstellt am</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aktionen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {barcodes.length > 0 ? (
              barcodes.map((barcode) => (
                <TableRow key={barcode.id}>
                  <TableCell className="font-mono">{barcode.code}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {BARCODE_TYPES.find((t) => t.value === barcode.type)?.label || barcode.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(barcode.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {barcode.isMain ? (
                      <Badge variant="default">Hauptbarcode</Badge>
                    ) : (
                      <Badge variant="outline">Zusätzlich</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {!barcode.isMain && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setAsMainBarcode(barcode.id)}
                          title="Als Hauptbarcode festlegen"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteBarcode(barcode.id)}
                        title="Barcode löschen"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  Keine Barcodes vorhanden. Fügen Sie einen Barcode hinzu.
                </TableCell>
              </TableRow>
            )}

            {/* Formular zum Hinzufügen eines neuen Barcodes */}
            {isAdding && (
              <TableRow className="bg-muted/50">
                <TableCell>
                  <div className="space-y-2">
                    {isGenerating ? (
                      <div className="flex items-center gap-2">
                        <BarcodeIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground italic">Wird automatisch generiert</span>
                      </div>
                    ) : (
                      <Input
                        placeholder="Barcode eingeben"
                        value={newBarcodeValue}
                        onChange={(e) => setNewBarcodeValue(e.target.value)}
                        className="font-mono"
                      />
                    )}
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="generate-barcode"
                        checked={isGenerating}
                        onChange={() => setIsGenerating(!isGenerating)}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <Label htmlFor="generate-barcode" className="text-sm cursor-pointer">
                        Barcode automatisch generieren
                      </Label>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Select value={newBarcodeType} onValueChange={setNewBarcodeType}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Typ auswählen" />
                    </SelectTrigger>
                    <SelectContent>
                      {BARCODE_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground italic">Jetzt</span>
                </TableCell>
                <TableCell>
                  <Badge variant={barcodes.length === 0 ? "default" : "outline"}>
                    {barcodes.length === 0 ? "Hauptbarcode" : "Zusätzlich"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={resetForm}>
                      <X className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={addBarcode}
                      disabled={!isGenerating && !newBarcodeValue.trim()}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

