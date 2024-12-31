"use client";

import { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import axios from "axios";

// Function to generate a numeric ID based on timestamp and random number
const generateUniqueId = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return parseInt(`${timestamp}${random}`.slice(-12));
};

export default function AddData() {
  const [formData, setFormData] = useState({
    doc_id: "",
    title: "",
    text: "",
    tags: "",
    authors: "",
    url: "",
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Generate unique ID when component mounts
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      doc_id: generateUniqueId(),
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = [];
    if (!formData.title.trim()) errors.push("Title is required");
    if (!formData.text.trim()) errors.push("Content is required");
    if (!formData.tags.trim()) errors.push("Tags are required");
    if (!formData.authors.trim()) errors.push("Authors are required");
    if (!formData.url.trim()) errors.push("URL is required");

    // Basic URL validation
    if (formData.url && !formData.url.match(/^(http|https):\/\/[^ "]+$/)) {
      errors.push("Please enter a valid URL starting with http:// or https://");
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (errors.length > 0) {
      toast({
        title: "Validation Error",
        description: errors.join(", "),
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/add",
        formData
      );

      toast({
        title: "Success",
        description: "Document added successfully to the search index",
      });

      // Clear form but generate new ID
      setFormData({
        doc_id: generateUniqueId(),
        title: "",
        text: "",
        tags: "",
        authors: "",
        url: "",
      });
    } catch (error) {
      console.error("Error adding document:", error);
      toast({
        title: "Error",
        description:
          error.response?.data?.error ||
          "Failed to add document. Please try again.",
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
        backgroundImage: "url('../../background.jpg?height=1080&width=1920')",
      }}
    >
      <div className="min-h-screen bg-black bg-opacity-60 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-background/80 backdrop-blur-sm rounded-lg shadow-lg p-8 space-y-8">
          <h1 className="text-5xl font-bold text-center text-primary">
            Add Document
          </h1>
          <p className="text-xl text-center text-muted-foreground">
            Add a new document to the search index
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="doc_id">Document ID (Auto-generated)</Label>
                <Input
                  id="doc_id"
                  name="doc_id"
                  type="text"
                  value={formData.doc_id}
                  disabled
                  className="text-lg bg-muted"
                />
              </div>

              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Enter document title"
                  value={formData.title}
                  onChange={handleChange}
                  className="text-lg"
                />
              </div>

              <div>
                <Label htmlFor="authors">Authors</Label>
                <Input
                  id="authors"
                  name="authors"
                  type="text"
                  placeholder="Enter authors (comma-separated)"
                  value={formData.authors}
                  onChange={handleChange}
                  className="text-lg"
                />
              </div>

              <div>
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  name="url"
                  type="url"
                  placeholder="https://example.com/article"
                  value={formData.url}
                  onChange={handleChange}
                  className="text-lg"
                />
              </div>

              <div>
                <Label htmlFor="text">Content</Label>
                <Textarea
                  id="text"
                  name="text"
                  placeholder="Enter document content"
                  value={formData.text}
                  onChange={handleChange}
                  rows={6}
                  className="text-lg"
                />
              </div>

              <div>
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  name="tags"
                  type="text"
                  placeholder="Enter tags (space-separated)"
                  value={formData.tags}
                  onChange={handleChange}
                  className="text-lg"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Add relevant tags separated by spaces (e.g., technology ai
                  research)
                </p>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                "Adding Document..."
              ) : (
                <>
                  <Upload className="h-6 w-6 mr-2" /> Add Document
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
