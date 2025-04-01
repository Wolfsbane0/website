import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

interface ProjectCardProps {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  formula?: string
}

export default function ProjectCard({ title, description, image, tags }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden h-full flex flex-col group hover:shadow-lg transition-all duration-300 border-primary/10">
      <div className="aspect-video relative">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-bold text-xl text-white drop-shadow-sm">{title}</h3>
        </div>
      </div>

      <CardContent className="p-6 flex-1">
        <p className="text-muted-foreground text-sm mb-4">{description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="bg-primary/10 hover:bg-primary/20 text-primary border-0">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button variant="outline" className="w-full group">
          <span>Learn More</span>
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardFooter>
    </Card>
  )
}

