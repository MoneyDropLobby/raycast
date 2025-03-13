"use client";
import { artikelErstellSchema } from "@/lib/validation-schema";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "../ui/button";
import { Plus, Trash, RefreshCw } from "lucide-react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ArtikelErstellen from "@/lib/actions";

// Vereinfachen des Barcode-Typs - nur noch der Code selbst wird gespeichert
type BarcodeEntry = string;

const ArtikelErstellForm = () => {
  const [newBarcode, setNewBarcode] = useState("");
  const [barcodeEntries, setBarcodeEntries] = useState<BarcodeEntry[]>([]);

  // 1. Define your form.
  const form = useForm<z.infer<typeof artikelErstellSchema>>({
    resolver: zodResolver(artikelErstellSchema),
    defaultValues: {
      name: "",
      beschreibung: undefined,
      preis: 0,
      einkaufspreis: 0,
      bestand: 0,
      categoryId: "",
      barcode: [],
    },
  });

  // Funktion zum Hinzufügen eines Barcodes
  const addBarcode = () => {
    if (!newBarcode.trim()) return;

    // Aktualisiere die Barcode-Einträge
    const updatedEntries = [...barcodeEntries, newBarcode.trim()];
    setBarcodeEntries(updatedEntries);

    // Aktualisiere die Barcode-Codes im Formular
    form.setValue("barcode", updatedEntries);

    setNewBarcode("");
  };

  // Funktion zum Entfernen eines Barcodes
  const removeBarcode = (index: number) => {
    // Entferne aus den Barcode-Einträgen
    const updatedEntries = barcodeEntries.filter((_, i) => i !== index);
    setBarcodeEntries(updatedEntries);

    // Aktualisiere die Barcode-Codes im Formular
    form.setValue("barcode", updatedEntries);
  };

  // Funktion zum Generieren eines zufälligen Barcodes
  const generateBarcode = () => {
    // Generiere einen 13-stelligen EAN-13 Barcode (übliches Format)
    const randomDigits = Array.from({ length: 12 }, () =>
      Math.floor(Math.random() * 10)
    ).join("");

    // Berechne die Prüfziffer für EAN-13
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(randomDigits[i]) * (i % 2 === 0 ? 1 : 3);
    }
    const checkDigit = (10 - (sum % 10)) % 10;

    const generatedBarcode = randomDigits + checkDigit;
    setNewBarcode(generatedBarcode);
  };

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof artikelErstellSchema>) {
    // const request = await fetch("/api/artikel", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(values),
    // });
    const req = await ArtikelErstellen(values);
    console.log(req);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Tabs defaultValue="grunddaten" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="grunddaten">Grunddaten</TabsTrigger>

              <TabsTrigger value="barcodes">Barcodes</TabsTrigger>
            </TabsList>

            <TabsContent value="grunddaten">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="preis"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Verkaufspreis</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Verkaufspreis"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kategorie</FormLabel>
                      <FormControl>
                        <Input placeholder="Kategorie" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="einkaufspreis"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Einkaufspreis</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Einkaufspreis"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bestand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lagerbestand</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Lagerbestand"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="beschreibung"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Beschreibung</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Produktbeschreibung"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </TabsContent>

            <TabsContent value="barcodes">
              <div className="flex gap-4 items-end my-4">
                <div className="flex-1 relative">
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Barcode"
                        value={newBarcode}
                        onChange={(e) => setNewBarcode(e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full"
                        onClick={generateBarcode}
                        title="Barcode generieren"
                      >
                        <RefreshCw size={16} />
                      </Button>
                    </div>
                  </FormControl>
                </div>
                <Button type="button" onClick={addBarcode}>
                  <Plus size={16} />
                  Barcode hinzufügen
                </Button>
              </div>

              {barcodeEntries.length > 0 && (
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Barcode</TableHead>
                        <TableHead className="w-20">Aktion</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {barcodeEntries.map((code, index) => (
                        <TableRow key={index}>
                          <TableCell>{code}</TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeBarcode(index)}
                            >
                              <Trash size={16} className="text-red-500" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>
          </Tabs>

          <div className="flex justify-end">
            <Button type="submit">Artikel erstellen</Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ArtikelErstellForm;
