"use client";

import { useFormState, useFormStatus } from "react-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BrainCircuit, Bot, AlertTriangle, WandSparkles } from "lucide-react";
import { runAnalysis, type AiAnalyzerState } from "@/app/actions";
import { Label } from "../ui/label";

const initialState: AiAnalyzerState = {
  result: null,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Bot className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        <>
          <BrainCircuit className="mr-2 h-4 w-4" />
          Run Analysis
        </>
      )}
    </Button>
  );
}

export function AiAnalyzer() {
  const [state, formAction] = useFormState(runAnalysis, initialState);

  return (
    <Card className="h-full flex flex-col">
      <form action={formAction} className="flex flex-col flex-1">
        <CardHeader>
          <CardTitle>AI-Assisted Anomaly Detection</CardTitle>
          <CardDescription>
            Select a security to find significant patterns and potential alpha drivers.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 flex-1">
          <div className="space-y-2">
            <Label htmlFor="security-select">Security</Label>
            <Select name="security" required>
              <SelectTrigger id="security-select" className="w-full">
                <SelectValue placeholder="Select a security..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AAPL">Apple Inc. (AAPL)</SelectItem>
                <SelectItem value="GOOGL">Alphabet Inc. (GOOGL)</SelectItem>
                <SelectItem value="MSFT">Microsoft Corp. (MSFT)</SelectItem>
                <SelectItem value="TSLA">Tesla, Inc. (TSLA)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {state.result && (
            <div className="p-4 bg-secondary rounded-lg border border-border">
                <div className="flex items-start gap-3">
                  <WandSparkles className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-sm text-secondary-foreground">{state.result}</p>
                </div>
            </div>
          )}
          {state.error && (
            <div className="p-3 bg-destructive/10 text-destructive rounded-lg flex items-center gap-2 border border-destructive/20">
                <AlertTriangle className="h-4 w-4 flex-shrink-0"/>
                <p className="text-sm font-medium">{state.error}</p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}
