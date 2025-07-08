"use client"

import * as React from "react"
import { AppShell } from "@/components/layout/app-shell"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon, Loader2 } from "lucide-react"
import type { DateRange } from "react-day-picker"

function BacktestingForm() {
    const [ticker, setTicker] = React.useState("AAPL");
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(2024, 0, 1),
        to: new Date(),
    });
    const [isLoading, setIsLoading] = React.useState(false);
    const [result, setResult] = React.useState<string | null>(null);
    const [error, setError] = React.useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setResult(null);
        setError(null);

        if (!ticker || !date?.from) {
            setError("Please provide a ticker and a start date.");
            setIsLoading(false);
            return;
        }

        // In a real application, you would make a fetch request here.
        // For demonstration purposes, we'll simulate a delay and mock a response.
        const url = `http://localhost:8000/backtest?ticker=${ticker}&from=${format(date.from, "yyyy-MM-dd")}${date.to ? `&to=${format(date.to, "yyyy-MM-dd")}` : ''}`;
        console.log(`Simulating API call to: ${url}`);
        
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mock response
        const mockResult = {
            ticker: ticker,
            period: `${format(date.from, "LLL dd, y")} - ${date.to ? format(date.to, "LLL dd, y") : 'Today'}`,
            strategy: "Simulated Momentum Strategy",
            return: `${(Math.random() * 40 - 10).toFixed(2)}%`,
            sharpeRatio: (Math.random() * 2.5).toFixed(2),
        };
        setResult(JSON.stringify(mockResult, null, 2));

        setIsLoading(false);
    }

    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <CardHeader>
                    <CardTitle>Configure Backtest</CardTitle>
                    <CardDescription>
                        Enter a stock ticker and a date range to run a historical simulation.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="ticker">Ticker Symbol</Label>
                            <Input
                                id="ticker"
                                placeholder="e.g., AAPL"
                                value={ticker}
                                onChange={(e) => setTicker(e.target.value.toUpperCase())}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="date-range">Date Range</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        id="date-range"
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date?.from ? (
                                            date.to ? (
                                                <>
                                                    {format(date.from, "LLL dd, y")} -{" "}
                                                    {format(date.to, "LLL dd, y")}
                                                </>
                                            ) : (
                                                format(date.from, "LLL dd, y")
                                            )
                                        ) : (
                                            <span>Pick a date range</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        initialFocus
                                        mode="range"
                                        defaultMonth={date?.from}
                                        selected={date}
                                        onSelect={setDate}
                                        numberOfMonths={2}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    {result && (
                        <div className="space-y-2">
                            <Label>Results</Label>
                            <pre className="mt-2 w-full rounded-md bg-secondary p-4 text-sm overflow-x-auto">
                                <code>{result}</code>
                            </pre>
                        </div>
                    )}
                    {error && <p className="text-sm font-medium text-destructive">{error}</p>}
                </CardContent>
                <CardFooter>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Run Backtest
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}

export default function BacktestingPage() {
    return (
        <AppShell>
            <div className="flex flex-col gap-6">
                <h1 className="text-3xl font-bold tracking-tight">Backtesting Engine</h1>
                <BacktestingForm />
            </div>
        </AppShell>
    )
}
