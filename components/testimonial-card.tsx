import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface TestimonialCardProps {
  id: string
  content: string
  name: string
  role: string
  image: string
}

export default function TestimonialCard({ content, name, role, image }: TestimonialCardProps) {
  return (
    <Card className="h-full group hover:shadow-lg transition-all duration-300 border-primary/10">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="mb-6">
          <svg
            className="h-8 w-8 text-primary/40"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11.9999 14.1094H6.99988C6.99988 17.0156 9.09363 19.5 11.9999 19.5V14.1094ZM11.9999 14.1094H16.9999C16.9999 11.2031 14.9061 8.71875 11.9999 8.71875V14.1094Z" />
            <path d="M4.5 14.1094H0C0 17.0156 2.09375 19.5 5 19.5V14.1094ZM4.5 14.1094H9C9 11.2031 6.90625 8.71875 4 8.71875V14.1094Z" />
          </svg>
        </div>

        <p className="text-muted-foreground mb-6 flex-1">{content}</p>

        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12 rounded-full overflow-hidden">
            <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
          </div>
          <div>
            <h4 className="font-medium">{name}</h4>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

