import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function AgreementsTab({ agreements }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>المورد</TableHead>
          <TableHead className="text-right">المبلغ</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {agreements.map((agreement, index) => (
          <TableRow key={index}>
            <TableCell>{agreement.supplierName}</TableCell>
            <TableCell className="text-right">{agreement.amount.toLocaleString()} ريال</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}