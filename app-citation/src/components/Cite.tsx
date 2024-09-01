import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, GraduationCap, FileText } from "lucide-react"

export function Cite() {
  const [citation, setCitation] = useState('')
  const [formData, setFormData] = useState({
    authors: '',
    year: '',
    title: '',
    publisher: '',
    place: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const generateCitation = (e: React.FormEvent) => {
    e.preventDefault()
    const { authors, year, title, publisher, place } = formData
    
    let formattedAuthors = authors
      .split(',')
      .map(author => {
        const names = author.trim().split(' ')
        const lastName = names.pop()
        return `${lastName}, ${names.map(n => n[0].toUpperCase()).join('. ')}.`
      })
      .join(', ')

    if (formattedAuthors.includes(',')) {
      const lastAuthor = formattedAuthors.split(',').pop()
      formattedAuthors = formattedAuthors.replace(/, ([^,]*)$/, ' and$1')
    }

    const harvardCitation = `${formattedAuthors} (${year}) ${title}. ${place}: ${publisher}.`
    setCitation(harvardCitation)
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 ">
      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader className="bg-green-600 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center space-x-2">
            <GraduationCap className="w-8 h-8" />
            <span>CiteEase</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <p className="text-center text-green-700">Harvard Style Citation Generator</p>
          <form onSubmit={generateCitation} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="authors" className="text-green-700 font-semibold">Authors (comma-separated)</Label>
              <Input
                id="authors"
                name="authors"
                value={formData.authors}
                onChange={handleInputChange}
                placeholder="e.g. John Smith, Jane Doe"
                required
                className="border-green-300 focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year" className="text-green-700 font-semibold">Year</Label>
                <Input
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  placeholder="e.g. 2023"
                  required
                  className="border-green-300 focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="place" className="text-green-700 font-semibold">Place of Publication</Label>
                <Input
                  id="place"
                  name="place"
                  value={formData.place}
                  onChange={handleInputChange}
                  placeholder="e.g. New York"
                  required
                  className="border-green-300 focus:border-green-500 focus:ring-green-500"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="title" className="text-green-700 font-semibold">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g. The Great Book"
                required
                className="border-green-300 focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="publisher" className="text-green-700 font-semibold">Publisher</Label>
              <Input
                id="publisher"
                name="publisher"
                value={formData.publisher}
                onChange={handleInputChange}
                placeholder="e.g. Acme Publishing"
                required
                className="border-green-300 focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white transition-all duration-300 transform hover:scale-105">
              Generate Citation
            </Button>
          </form>
          {citation && (
            <div className="mt-6 p-4 bg-white rounded-md shadow-inner border border-green-200 transition-all duration-500 ease-in-out">
              <h2 className="text-lg font-semibold mb-2 text-green-700 flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Generated Harvard Style Citation:
              </h2>
              <p className="text-sm text-gray-700 italic">{citation}</p>
            </div>
          )}
        </CardContent>
      </Card>
      <div className="mt-8 text-center text-green-600 flex items-center justify-center">
        <FileText className="w-5 h-5 mr-2" />
        <span>CiteEase: Simplifying your academic citations</span>
      </div>
    </div>
  )
}