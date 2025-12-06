import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { X, Plus, Image as ImageIcon, ExternalLink } from "lucide-react";

/**
 * ImageManager component
 * Manages multiple image URLs with preview and add/remove functionality
 */
export function ImageManager({
  label,
  name,
  value = "", // string with URLs separated by newlines
  onChange,
  helpText,
  placeholder = "https://example.com/image.jpg",
  maxImages = 10,
  showPreview = true,
  className = "",
}) {
  const [newImageUrl, setNewImageUrl] = useState("");
  const [showRawInput, setShowRawInput] = useState(false);

  // Parse URLs from newline-separated string
  const imageUrls = value
    ? value.split("\n").map((url) => url.trim()).filter(Boolean)
    : [];

  // Add new image URL
  const handleAddImage = () => {
    if (!newImageUrl.trim()) return;
    
    if (imageUrls.length >= maxImages) {
      alert(`Maximum ${maxImages} images allowed`);
      return;
    }

    const updatedUrls = [...imageUrls, newImageUrl.trim()].join("\n");
    onChange({ target: { name, value: updatedUrls } });
    setNewImageUrl("");
  };

  // Remove image by index
  const handleRemoveImage = (indexToRemove) => {
    const updatedUrls = imageUrls
      .filter((_, index) => index !== indexToRemove)
      .join("\n");
    onChange({ target: { name, value: updatedUrls } });
  };

  // Handle raw textarea input
  const handleRawInput = (e) => {
    onChange(e);
  };

  // Handle Enter key in input
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddImage();
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">{label}</Label>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setShowRawInput(!showRawInput)}
          className="text-xs h-7"
        >
          {showRawInput ? "Card View" : "Raw Input"}
        </Button>
      </div>

      {showRawInput ? (
        // Raw textarea mode (original behavior)
        <div className="space-y-1">
          <Textarea
            name={name}
            value={value}
            onChange={handleRawInput}
            placeholder={`${placeholder}\n${placeholder}`}
            rows={4}
            className="font-mono text-xs"
          />
          {helpText && (
            <p className="text-xs text-muted-foreground">{helpText}</p>
          )}
        </div>
      ) : (
        // Card view mode
        <div className="space-y-3">
          {/* Add new image input */}
          <div className="flex gap-2">
            <Input
              type="url"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="flex-1"
            />
            <Button
              type="button"
              onClick={handleAddImage}
              size="sm"
              disabled={!newImageUrl.trim() || imageUrls.length >= maxImages}
            >
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>

          {helpText && (
            <p className="text-xs text-muted-foreground">{helpText}</p>
          )}

          {/* Image list */}
          {imageUrls.length > 0 ? (
            <div className="grid grid-cols-1 gap-3">
              {imageUrls.map((url, index) => (
                <Card
                  key={index}
                  className="p-3 flex items-center gap-3 hover:border-primary/50 transition-colors"
                >
                  {showPreview && (
                    <div className="w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={url}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextElementSibling.style.display = "flex";
                        }}
                      />
                      <div
                        className="w-full h-full hidden items-center justify-center"
                        style={{ display: "none" }}
                      >
                        <ImageIcon className="w-6 h-6 text-muted-foreground" />
                      </div>
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-muted-foreground mb-1">
                      Image {index + 1}
                    </p>
                    <p className="text-sm truncate font-mono">{url}</p>
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => window.open(url, "_blank")}
                      title="Open in new tab"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => handleRemoveImage(index)}
                      title="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground">
                No images added yet
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Add image URLs using the input above
              </p>
            </div>
          )}

          {imageUrls.length > 0 && (
            <p className="text-xs text-muted-foreground text-right">
              {imageUrls.length} / {maxImages} images
            </p>
          )}
        </div>
      )}
    </div>
  );
}