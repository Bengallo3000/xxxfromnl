"use client"

import { Button } from "@/components/ui/button"

interface CategoryFilterProps {
  categories: string[]
  selected: string
  onSelect: (category: string) => void
}

const CategoryFilter = ({ categories, selected, onSelect }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={selected === "all" ? "default" : "outline"}
        size="sm"
        onClick={() => onSelect("all")}
        className="font-mono text-xs"
      >
        Alle
      </Button>
      {categories.map((category) => (
        <Button
          key={category}
          variant={selected === category ? "default" : "outline"}
          size="sm"
          onClick={() => onSelect(category)}
          className="font-mono text-xs"
        >
          {category}
        </Button>
      ))}
    </div>
  )
}

export default CategoryFilter
