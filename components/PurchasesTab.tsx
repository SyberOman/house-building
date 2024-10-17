import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function PurchasesTab({ purchases }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>العنصر</TableHead>
          <TableHead className="text-right">المبلغ</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {purchases.map((purchase, index) => (
          <TableRow key={index}>
            <TableCell>{purchase.itemName}</TableCell>
            <TableCell className="text-right">{purchase.amount.toLocaleString()} ريال</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}