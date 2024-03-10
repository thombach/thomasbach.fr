import { Mail } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { cn } from "@/lib/utils";

interface ContactProps {
  className?: string;
}

export default function Contact(props: ContactProps) {
  return (
    <>
      <Alert className={cn(props.className, "w-fit")}>
        <Mail className="h-6 w-6" />
        <AlertTitle className="text-xl font-bold">Get in touch</AlertTitle>
        <AlertDescription>
          If you have any questions or ideas to share, feel free to{" "}
          <a
            className="underline underline-offset-4 hover:text-primary"
            href="mailto:thomasbach.contact@gmail.com"
          >
            email me.
          </a>
        </AlertDescription>
      </Alert>
    </>
  );
}
