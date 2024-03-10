import { Eye } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Badge } from "./ui/badge";
import { useEffect, useState } from "react";
import axios from "axios";

interface VisitorsProps {
  className?: string;
}

export default function Visitors(props: VisitorsProps) {
  const http = axios.create({
    baseURL: "http://numbersapi.com",
    headers: {
      "Content-type": "text/plain",
    },
  });
  const params = "/trivia?notfound=floor&fragment";
  const [visitorCount, setVisitorCount] = useState<number>(345);
  const [trivia, setTrivia] = useState<String>("");
  useEffect(() => {
    http
      .get<String>(visitorCount + params)
      .then((response) => setTrivia(response.data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <div className={props.className}>
        <Popover>
          <PopoverTrigger>
            <div className="relative">
              <Eye className="text-slate-600 ring-offset-background border border-input bg-background rounded-full size-10 text-sm p-2"></Eye>
              <Badge className="absolute top-0 -right-6 px-1 py-0 hover:bg-primary">
                {visitorCount}
              </Badge>
            </div>
          </PopoverTrigger>
          <PopoverContent side="top">
            <h2
              className={"mb-1 text-sm font-bold text-slate-700 text-balance"}
            >
              <span className="text-primary">{visitorCount}</span> visits on
              this website
            </h2>
            <p className="text-xs">That's is more than {trivia}.</p>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}
