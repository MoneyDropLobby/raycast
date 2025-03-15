import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Status } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { Pencil } from "lucide-react";

const ArtikelDataTable = ({ artikel }: { artikel: any[] }) => {
  console.log(artikel);
  return (
    <div className="mt-4 rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">ID</TableHead>
            <TableHead className="font-bold">Name</TableHead>
            <TableHead className="font-bold">Barcodes</TableHead>
            <TableHead className="font-bold">Kategorie</TableHead>
            <TableHead className="text-right font-bold">Preis</TableHead>
            <TableHead className="text-center font-bold">Status</TableHead>
            <TableHead className="text-right font-bold">Aktionen</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {artikel.map((artikel) => (
            <TableRow key={artikel.id}>
              <TableCell>{artikel.id}</TableCell>
              <TableCell>{artikel.name}</TableCell>
              <TableCell>{artikel.eanCodes[0] || ""}</TableCell>
              <TableCell>{artikel.untergruppe?.name || ""}</TableCell>
              <TableCell className="text-right">
                {Number(artikel.verkaufspreis).toFixed(2)}
              </TableCell>
              <TableCell className="text-center">
                <Badge
                  variant={
                    artikel.status === Status.AKTIV ? "success" : "destructive"
                  }
                >
                  {artikel.status.toString()}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button>
                  <Pencil className="h-1 w-1" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ArtikelDataTable;
