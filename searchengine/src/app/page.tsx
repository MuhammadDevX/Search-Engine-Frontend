"use client"
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import axios from "axios";

export default function Home() {
  const [query, setQuery] = useState("");
  const [allResults, setAllResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/api/search?q=${encodeURIComponent(query)}`
      );
      setAllResults(response.data.results);
      setCurrentPage(1); // Reset to first page on new search
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate pagination
  const totalResults = allResults.length;
  const totalPages = Math.ceil(totalResults / resultsPerPage);
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const currentResults = allResults.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Scroll to top on page change
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
             SearchDevX
          </h1>
          <p className="text-xl text-center text-muted-foreground">
            Welcome to my search engine{" "}
            <span className="font-bold text-primary">SearchX</span>. <br />{" "}
            Search anything regarding articles.
          </p>
          <form onSubmit={handleSearch} className="flex space-x-2">
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

          <div className="space-y-4">
            {currentResults.map((result, index) => (
              <Card
                key={index}
                className="bg-background/90 hover:bg-background/100 transition-colors"
              >
                <CardContent className="p-6">
                  <a
                    href={result.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <h2 className="text-2xl font-semibold mb-2">
                      {result.title}
                    </h2>
                    <p className="text-muted-foreground">{result.text}</p>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>

          {totalResults > 0 && (
            <Pagination className="my-4">
              <PaginationContent>
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(currentPage - 1)}
                    />
                  </PaginationItem>
                )}

                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i + 1}>
                    <PaginationLink
                      onClick={() => handlePageChange(i + 1)}
                      isActive={currentPage === i + 1}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                {currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(currentPage + 1)}
                    />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </div>
  );
}
