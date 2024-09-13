"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerDemoProps {
  deadline : Date | undefined; 
  setDeadline: (date: Date ) => void; 
}

export function DatePickerDemo({ deadline, setDeadline }: DatePickerDemoProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] bg-black justify-start text-left font-normal",
            !deadline && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {deadline ? format(deadline, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={deadline}
          onSelect={(date: Date | undefined) => setDeadline(date || new Date())}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
