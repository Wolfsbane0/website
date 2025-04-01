import { MathJax } from "better-react-mathjax"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface ResearchItemProps {
  id: string
  title: string
  description: string
  researchers: string[]
  formula?: string
  publications?: {
    title: string
    url: string
  }[]
}

export default function ResearchItem({ title, description, researchers, formula, publications }: ResearchItemProps) {
  return (
    <div className="mb-12 pb-12 border-b border-primary/10 last:border-0 last:mb-0 last:pb-0">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h3 className="text-2xl font-bold mb-4">{title}</h3>
          <p className="text-muted-foreground mb-4">{description}</p>

          <div className="mb-6">
            <h4 className="text-sm font-medium mb-2">Researchers</h4>
            <div className="flex flex-wrap gap-2">
              {researchers.map((researcher, index) => (
                <span key={index} className="inline-block bg-primary/10 text-primary text-sm px-3 py-1 rounded-full">
                  {researcher}
                </span>
              ))}
            </div>
          </div>

          {publications && publications.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">Publications</h4>
              <ul className="space-y-2">
                {publications.map((publication, index) => (
                  <li key={index}>
                    <a
                      href={publication.url}
                      className="text-primary hover:underline flex items-center"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {publication.title}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {formula && (
          <div className="bg-primary/5 rounded-xl p-6 flex items-center justify-center">
            <MathJax>{formula}</MathJax>
          </div>
        )}
      </div>

      <div className="mt-6">
        <Button variant="outline" className="group">
          <span>Learn More</span>
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  )
}

