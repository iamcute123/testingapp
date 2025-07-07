"use client";

import * as React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

type Strategy = {
  name: string;
  type: "Momentum" | "Value" | "Arbitrage" | "Macro";
  ytdReturn: number;
  sharpeRatio: number;
  maxDrawdown: number;
  status: "Active" | "Inactive" | "Under Review";
};

const strategies: Strategy[] = [
  { name: "Momentum Growth", type: "Momentum", ytdReturn: 18.7, sharpeRatio: 1.5, maxDrawdown: -8.2, status: "Active" },
  { name: "Deep Value", type: "Value", ytdReturn: 9.2, sharpeRatio: 1.1, maxDrawdown: -12.5, status: "Active" },
  { name: "StatArb Pairs", type: "Arbitrage", ytdReturn: 6.5, sharpeRatio: 2.1, maxDrawdown: -4.1, status: "Active" },
  { name: "Global Macro", type: "Macro", ytdReturn: -2.1, sharpeRatio: -0.2, maxDrawdown: -15.8, status: "Under Review" },
  { name: "Legacy Dividend", type: "Value", ytdReturn: 4.3, sharpeRatio: 0.8, maxDrawdown: -9.9, status: "Inactive" },
  { name: "Tech Momentum", type: "Momentum", ytdReturn: 25.4, sharpeRatio: 1.8, maxDrawdown: -11.3, status: "Active" },
];

type SortKey = keyof Strategy;

export function StrategyTable() {
  const [sortConfig, setSortConfig] = React.useState<{ key: SortKey; direction: 'ascending' | 'descending' } | null>({ key: 'ytdReturn', direction: 'descending' });

  const sortedStrategies = React.useMemo(() => {
    let sortableItems = [...strategies];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [sortConfig]);

  const requestSort = (key: SortKey) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  const getSortIcon = (key: SortKey) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <ArrowUpDown className="ml-2 h-3 w-3" />;
    }
    // Icons for ascending/descending can be added here
    return <ArrowUpDown className="ml-2 h-3 w-3" />;
  }

  const getStatusBadgeVariant = (status: Strategy["status"]) => {
    switch (status) {
      case "Active": return "default";
      case "Under Review": return "secondary";
      case "Inactive": return "outline";
    }
  }

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead><Button variant="ghost" className="px-0" onClick={() => requestSort('name')}>Strategy{getSortIcon('name')}</Button></TableHead>
            <TableHead><Button variant="ghost" className="px-0" onClick={() => requestSort('type')}>Type{getSortIcon('type')}</Button></TableHead>
            <TableHead className="text-right"><Button variant="ghost" className="px-0" onClick={() => requestSort('ytdReturn')}>YTD Return{getSortIcon('ytdReturn')}</Button></TableHead>
            <TableHead className="text-right"><Button variant="ghost" className="px-0" onClick={() => requestSort('sharpeRatio')}>Sharpe Ratio{getSortIcon('sharpeRatio')}</Button></TableHead>
            <TableHead className="text-right"><Button variant="ghost" className="px-0" onClick={() => requestSort('maxDrawdown')}>Max Drawdown{getSortIcon('maxDrawdown')}</Button></TableHead>
            <TableHead><Button variant="ghost" className="px-0" onClick={() => requestSort('status')}>Status{getSortIcon('status')}</Button></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedStrategies.map((strategy) => (
            <TableRow key={strategy.name}>
              <TableCell className="font-medium whitespace-nowrap">{strategy.name}</TableCell>
              <TableCell className="whitespace-nowrap">{strategy.type}</TableCell>
              <TableCell className={`text-right font-semibold whitespace-nowrap ${strategy.ytdReturn >= 0 ? 'text-[hsl(var(--chart-2))]' : 'text-destructive'}`}>
                {strategy.ytdReturn.toFixed(1)}%
              </TableCell>
              <TableCell className="text-right whitespace-nowrap">{strategy.sharpeRatio.toFixed(2)}</TableCell>
              <TableCell className="text-right text-destructive whitespace-nowrap">{strategy.maxDrawdown.toFixed(1)}%</TableCell>
              <TableCell>
                <Badge variant={getStatusBadgeVariant(strategy.status)}>{strategy.status}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
