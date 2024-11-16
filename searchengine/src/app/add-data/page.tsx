"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import "../globals.css";
export default function AddData() {
  const [jsonData, setJsonData] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://your-flask-backend-url/add-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonData,
      });
      if (response.ok) {
        toast({
          title: "Success",
          description: "Data added successfully",
        });
        setJsonData("");
      } else {
        throw new Error("Failed to add data");
      }
    } catch (error) {
      console.error("Error adding data:", error);
      toast({
        title: "Error",
        description: "Failed to add data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
      }}
    >
      <div className="min-h-screen bg-black bg-opacity-60 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-background/80 backdrop-blur-sm rounded-lg shadow-lg p-8 space-y-8">
          <h1 className="text-5xl font-bold text-center text-primary">
            Add Data
          </h1>
          <p className="text-xl text-center text-muted-foreground">
            Paste your JSON data to add to the search index
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              placeholder="Paste your JSON data here..."
              value={jsonData}
              onChange={(e) => setJsonData(e.target.value)}
              rows={10}
              className="w-full text-lg"
            />
            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                "Adding..."
              ) : (
                <>
                  <Upload className="h-6 w-6 mr-2" /> Add Data
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
