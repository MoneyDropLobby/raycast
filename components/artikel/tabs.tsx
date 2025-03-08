import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import Artikelverwaltung from "./verwaltung/artikel-verwaltung";

const ArtikelverwaltungsTabs = () => {
  return (
    <Tabs defaultValue="artikelverwaltung" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="artikelverwaltung">Artikelverwaltung</TabsTrigger>
        <TabsTrigger value="kategorieverwaltung">
          Kategorieverwaltung
        </TabsTrigger>
      </TabsList>
      <TabsContent value="artikelverwaltung">
        <Artikelverwaltung />
      </TabsContent>
      <TabsContent value="kategorieverwaltung">
        Change your password here.
      </TabsContent>
    </Tabs>
  );
};

export default ArtikelverwaltungsTabs;
