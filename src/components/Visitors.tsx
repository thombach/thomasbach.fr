import { Eye } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Badge } from "./ui/badge";
import { useState } from "react";

interface VisitorsProps {
  className?: string;
}

export default function Visitors(props: VisitorsProps) {
  const [visitorCount] = useState<number>(23);
  function ordinalOf(i: number) {
    let j = i % 10,
      k = i % 100;
    if (j === 1 && k !== 11) {
      return i + "st";
    }
    if (j === 2 && k !== 12) {
      return i + "nd";
    }
    if (j === 3 && k !== 13) {
      return i + "rd";
    }
    return i + "th";
  }
  return (
    <>
      {visitorCount && (
        <div className={props.className}>
          <Popover>
            <PopoverTrigger>
              <div className="relative">
                <Eye className="text-slate-600 ring-offset-background border border-input bg-background rounded-full size-10 text-sm p-2"></Eye>
                <Badge className="absolute top-0 left-8 px-1 py-0 hover:bg-primary">
                  {visitorCount}
                </Badge>
              </div>
            </PopoverTrigger>
            <PopoverContent side="top" className="w-72">
              <h2
                className={"mb-1 text-sm font-bold text-slate-700 text-balance"}
              >
                You are the{" "}
                <span className="text-primary">{ordinalOf(visitorCount)}</span>{" "}
                visitor.
              </h2>
              <p className="text-sm">
                Welcome to my website, enjoy your visit !
              </p>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </>
  );
}
