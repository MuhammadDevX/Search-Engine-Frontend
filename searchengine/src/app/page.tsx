"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import "./globals.css";
export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `http://your-flask-backend-url/search?q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('../../../background.jpg?height=920')",
      }}
    >
      <div className="min-h-screen bg-black bg-opacity-60 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-background/80 backdrop-blur-sm rounded-lg shadow-lg p-8 space-y-8">
          <h1 className="text-5xl font-bold text-center text-primary">
            SearchX
          </h1>
          <p className="text-xl text-center text-muted-foreground">
            Search anything using this search engine
          </p>
          <form onSubmit={(e) => handleSearch(e)} className="flex space-x-2">
            <Input
              type="text"
              placeholder="Enter your search query..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-grow text-lg py-6"
            />
            <Button type="submit" size="lg" disabled={loading} className="px-8">
              {loading ? "Searching..." : <Search className="h-6 w-6" />}
            </Button>
          </form>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            {results.map((result, index) => (
              <Card
                key={index}
                className="bg-background/90 hover:bg-background/100 transition-colors"
              >
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-2">
                    {result.title}
                  </h2>
                  <p className="text-muted-foreground">{result.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
