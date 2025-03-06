import ArtikelverwaltungsTabs from "@/components/artikel/verwaltung/tabs";

const Artikelverwaltung = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <main className="flex-1">
          <ArtikelverwaltungsTabs />
        </main>
      </div>
    </div>
  );
};

export default Artikelverwaltung;
