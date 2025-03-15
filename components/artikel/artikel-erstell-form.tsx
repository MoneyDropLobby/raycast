"use client";
import { useState } from "react";
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
import MultipleSelector from "@/components/multi-selection";
import { APIResponse } from "@/types";

const ArtikelErstellForm = () => {
  const [newBarcode, setNewBarcode] = useState("");

  // 1. Define your form mit Barcode-Logik
  const form = useForm<z.infer<typeof artikelErstellSchema>>({
    resolver: zodResolver(artikelErstellSchema),
    defaultValues: {
      name: "",
      beschreibung: undefined,
      preis: 0,
      einkaufspreis: 0,
      bestand: 0,
      categoryId: "",
      eanCodes: [], // eanCodes bleiben im Formular
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof artikelErstellSchema>) {
    try {
      const response = await fetch("/api/artikel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      // Erfolgsbenachrichtigung oder Weiterleitung
    } catch (error) {
      // Fehlermeldung anzeigen
    }
  }

  // Debug-Funktion, um Formularvalidierungsfehler anzuzeigen
  const formErrors = form.formState.errors;
  console.log("Formularfehler:", formErrors);

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
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="eanCodes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>EAN-Codes</FormLabel>
                      <FormControl>
                        <MultipleSelector
                          {...field}
                          placeholder="EAN-Codes eingeben oder hinzufügen..."
                          creatable
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* {form.watch("eanCodes").length > 0 && (
                  <div className="border rounded-md p-3">
                    <h3 className="text-sm font-medium mb-2">
                      Hinzugefügte EAN-Codes
                    </h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>EAN-Code</TableHead>
                          <TableHead className="w-[100px]">Aktion</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {form.watch("eanCodes").map((code, index) => (
                          <TableRow key={index}>
                            <TableCell>{code}</TableCell>
                            <TableCell>
                              <Button
                                type="button"
                                size="icon"
                                variant="ghost"
                                onClick={() => {
                                  const currentCodes =
                                    form.getValues("eanCodes");
                                  const updatedCodes = currentCodes.filter(
                                    (_, i) => i !== index
                                  );
                                  form.setValue("eanCodes", updatedCodes, {
                                    shouldValidate: true,
                                    shouldDirty: true,
                                    shouldTouch: true,
                                  });
                                }}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )} */}
              </div>
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
