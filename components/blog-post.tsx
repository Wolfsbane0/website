import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays, User, ArrowRight } from "lucide-react"
import Link from "next/link"

interface BlogPostProps {
  id: string
  title: string
  excerpt: string
  image: string
  date: string
  author: string
  slug: string
}

export default function BlogPost({ title, excerpt, image, date, author, slug }: BlogPostProps) {
  return (
    <Card className="overflow-hidden h-full flex flex-col group hover:shadow-lg transition-all duration-300 border-primary/10">
      <div className="aspect-video relative">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <CardContent className="p-6 flex-1">
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <CalendarDays className="h-4 w-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{author}</span>
          </div>
        </div>

        <Link href={`/blog/${slug}`}>
          <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">{title}</h3>
        </Link>

        <p className="text-muted-foreground text-sm">{excerpt}</p>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Link href={`/blog/${slug}`} className="w-full">
          <Button variant="outline" className="w-full group">
            <span>Read More</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

