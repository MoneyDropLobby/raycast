import Artikelverwaltung from "@/components/artikel/verwaltung/artikel-verwaltung";
import KategorieVerwaltung from "@/components/artikel/verwaltung/kategorie-verwaltung";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ArtikelverwaltungsPage = () => {
  <Tabs defaultValue="artikelverwaltung" className="w-full">
    <TabsList className="w-full">
      <TabsTrigger value="artikelverwaltung">Artikelverwaltung</TabsTrigger>
      <TabsTrigger value="kategorieverwaltung">Kategorieverwaltung</TabsTrigger>
    </TabsList>
    <TabsContent value="artikelverwaltung">
      <Artikelverwaltung />
    </TabsContent>
    <TabsContent value="kategorieverwaltung">
      <KategorieVerwaltung />
    </TabsContent>
  </Tabs>;
};

export default Artikelverwaltung;
