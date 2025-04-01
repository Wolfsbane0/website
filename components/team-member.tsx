import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Github, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"

interface TeamMemberProps {
  id: string
  name: string
  role: string
  image: string
  bio: string
  social: {
    twitter?: string
    linkedin?: string
    github?: string
  }
}

export default function TeamMember({ name, role, image, bio, social }: TeamMemberProps) {
  return (
    <Card className="overflow-hidden h-full group hover:shadow-lg transition-all duration-300 border-primary/10">
      <div className="aspect-square relative overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <CardContent className="p-6 relative">
        <h3 className="font-bold text-lg">{name}</h3>
        <p className="text-primary font-medium text-sm mb-2">{role}</p>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{bio}</p>
        <div className="flex gap-3">
          {social.twitter && (
            <Link href={social.twitter} className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="h-4 w-4" />
            </Link>
          )}
          {social.linkedin && (
            <Link href={social.linkedin} className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="h-4 w-4" />
            </Link>
          )}
          {social.github && (
            <Link href={social.github} className="text-muted-foreground hover:text-primary transition-colors">
              <Github className="h-4 w-4" />
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

