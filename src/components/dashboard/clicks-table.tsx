"use client";

import type { Click } from '@/lib/data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { ScrollArea } from '../ui/scroll-area';

export function ClicksTable({ clicks }: { clicks: Click[] }) {
  if (clicks.length === 0) {
    return <p className="text-muted-foreground">No clicks recorded yet. Generate and share a link to get started!</p>;
  }

  return (
    <ScrollArea className="h-[400px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Link ID</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Browser</TableHead>
            <TableHead>OS</TableHead>
            <TableHead>Location</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clicks.map((click) => (
            <TableRow key={click.id}>
              <TableCell>
                <Badge variant="outline" className="font-mono">{click.linkId}</Badge>
              </TableCell>
              <TableCell>
                {formatDistanceToNow(click.timestamp, { addSuffix: true })}
              </TableCell>
              <TableCell>{click.device.browser}</TableCell>
              <TableCell>{click.device.os}</TableCell>
              <TableCell>
                {click.location ? (
                  <span className="text-sm">{`${click.location.latitude.toFixed(2)}, ${click.location.longitude.toFixed(2)}`}</span>
                ) : (
                  <span className="text-muted-foreground text-xs">Not available</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
