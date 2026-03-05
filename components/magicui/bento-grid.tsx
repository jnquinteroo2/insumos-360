import { ReactNode } from "react";
import { ArrowRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[28rem] grid-cols-1 md:grid-cols-3 gap-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  onClick,
}: {
  name: string;
  className?: string;
  background: ReactNode;
  Icon: React.ElementType | LucideIcon;
  description: string;
  href: string;
  cta: string;
  onClick?: () => void;
}) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-end overflow-hidden rounded-xl",
      "bg-transparent h-full",
      className,
    )}
  >
    <div>{background}</div>

    <div
      className={cn("z-20 flex flex-col gap-2 p-6 transition-all duration-300")}
    >
      <Icon className="h-10 w-10 text-gold-400 origin-left transform-gpu transition-all duration-300 group-hover:scale-110" />
      <h3 className="text-xl font-bold font-heading text-white drop-shadow-md">
        {name}
      </h3>
      <p className="max-w-lg text-gray-100 text-sm font-medium leading-relaxed drop-shadow-md">
        {description}
      </p>
    </div>

    <div className={cn("w-full px-6 pb-6 z-30")}>
      {onClick ? (
        <Button
          onClick={onClick}
          variant="default"
          size="sm"
          className="w-full sm:w-auto bg-gold-500 hover:bg-gold-600 text-white font-bold shadow-lg border-none"
        >
          {cta}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      ) : (
        <a
          href={href}
          download
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 px-3 w-full sm:w-auto bg-gold-500 hover:bg-gold-600 text-white shadow-lg cursor-pointer border-none"
        >
          {cta}
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      )}
    </div>

    <div className="pointer-events-none absolute inset-0 bg-transparent z-10" />
  </div>
);

export { BentoCard, BentoGrid };
