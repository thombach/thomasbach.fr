import { Eye } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Badge } from "./ui/badge";
import { useEffect, useState } from "react";
import axios from "axios";

interface VisitorsProps {
  className?: string;
}

export default function Visitors(props: VisitorsProps) {
  const [visitorCount, setVisitorCount] = useState<number>();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    let visitorCountStored = sessionStorage.getItem("visitorCount");
    if (visitorCountStored) {
      setVisitorCount(+visitorCountStored);
    } else {
      updateVisitorCount();
    }
  }, []);

  const updateVisitorCount = async () => {
    try {
      const result = await axios.post(`${API_URL}/visitors`);
      if (result.data) {
        setVisitorCount(result.data);
        sessionStorage.setItem("visitorCount", result.data.toString());
      }
    } catch (error) {
      console.error("Error fetching visitor count: ", error);
    }
  };

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
                <Badge className="absolute top-0 left-8 px-1 py-0 hover:bg-primary font-sans">
                  {visitorCount}
                </Badge>
              </div>
            </PopoverTrigger>
            <PopoverContent side="top" className="w-72">
              <h2
                className={"mb-1 text-sm font-bold text-slate-700 text-balance"}
              >
                You are the{" "}
                <span className="text-primary font-sans">
                  {ordinalOf(visitorCount)}
                </span>{" "}
                visitor.
              </h2>
              <span className="text-sm">
                Welcome to my website, enjoy your visit !
              </span>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </>
  );
}
