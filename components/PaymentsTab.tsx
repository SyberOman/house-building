import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function PaymentsTab({ payments }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>الوصف</TableHead>
          <TableHead className="text-right">المبلغ</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payments.map((payment, index) => (
          <TableRow key={index}>
            <TableCell>{payment.description}</TableCell>
            <TableCell className="text-right">{payment.amount.toLocaleString()} ريال</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}