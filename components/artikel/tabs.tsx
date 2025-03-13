import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import KategorieVerwaltung from "./verwaltung/category-management";
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
        <KategorieVerwaltung />
      </TabsContent>
    </Tabs>
  );
};

export default ArtikelverwaltungsTabs;
