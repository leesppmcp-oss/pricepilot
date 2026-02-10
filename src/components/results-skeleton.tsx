import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

export function ResultsSkeleton() {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">
              <Skeleton className="h-5 w-24" />
            </TableHead>
            <TableHead className="w-[120px]">
              <Skeleton className="h-5 w-16" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-5 w-32" />
            </TableHead>
            <TableHead className="text-right">
              <Skeleton className="h-5 w-20 ml-auto" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(3)].map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <Skeleton className="h-6 w-24" />
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-20" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-9 w-32" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-10 w-10 rounded-md inline-block" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
