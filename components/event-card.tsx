import { CalendarDays, Clock, MapPin, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MathJax } from "better-react-mathjax";

interface EventCardProps {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  formula?: string;
  upcoming: boolean;
}

export default function EventCard({
  title,
  date,
  time,
  location,
  description,
  formula,
  upcoming,
}: EventCardProps) {
  return (
    <Card className="h-full flex flex-col overflow-hidden group hover:shadow-lg transition-all duration-300 border-primary/10">
      <CardContent className="p-6 flex-1">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-bold text-xl group-hover:text-primary transition-colors">
            {title}
          </h3>
          {upcoming && (
            <Badge className="bg-primary/90 hover:bg-primary">Upcoming</Badge>
          )}
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <CalendarDays className="h-4 w-4 text-primary" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-primary" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{location}</span>
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-4">{description}</p>

        {formula && (
          <div className="p-3 bg-primary/5 rounded-lg flex justify-center">
            {/*<MathJax>{formula}</MathJax>*/}
          </div>
        )}
      </CardContent>

      <CardFooter className="p-6 pt-0">
        {upcoming ? (
          <Button className="w-full bg-primary/90 hover:bg-primary group">
            <span>Register Now</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        ) : (
          <Button variant="outline" className="w-full group">
            <span>View Details</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
