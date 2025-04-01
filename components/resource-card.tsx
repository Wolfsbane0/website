import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText, Video, Link2, BookOpen } from "lucide-react"
import Link from "next/link"

interface ResourceCardProps {
  id: string
  title: string
  description: string
  type: "article" | "video" | "link" | "book"
  url: string
}

export default function ResourceCard({ title, description, type, url }: ResourceCardProps) {
  const getIcon = () => {
    switch (type) {
      case "article":
        return <FileText className="h-6 w-6" />
      case "video":
        return <Video className="h-6 w-6" />
      case "link":
        return <Link2 className="h-6 w-6" />
      case "book":
        return <BookOpen className="h-6 w-6" />
      default:
        return <FileText className="h-6 w-6" />
    }
  }

  return (
    <Card className="h-full flex flex-col group hover:shadow-lg transition-all duration-300 border-primary/10">
      <CardContent className="p-6 flex-1">
        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6">
          {getIcon()}
        </div>

        <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Link href={url} className="w-full" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" className="w-full group">
            <span>Access Resource</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

