import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, GripVertical } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

/**
 * MultiItemManager component
 * Manages a dynamic list of items (like rooms, menu items, attractions)
 * 
 * @param {string} itemName - Singular name (e.g., "Room", "Menu Item")
 * @param {string} itemNamePlural - Plural name (e.g., "Rooms", "Menu Items")
 * @param {Array} items - Array of items to manage
 * @param {Function} onAdd - Callback when adding new item
 * @param {Function} onRemove - Callback when removing item (index)
 * @param {Function} renderItem - Render function for each item (item, index, onChange)
 * @param {number} minItems - Minimum number of items (default: 1)
 * @param {number} maxItems - Maximum number of items (default: 20)
 * @param {string} emptyMessage - Message when no items exist
 * @param {boolean} showIndex - Show item number in header
 * @param {boolean} allowReorder - Enable drag-to-reorder (future feature)
 */
export function MultiItemManager({
  itemName = "Item",
  itemNamePlural = "Items",
  items = [],
  onAdd,
  onRemove,
  renderItem,
  minItems = 1,
  maxItems = 20,
  emptyMessage,
  showIndex = true,
  allowReorder = false,
  cardClassName = "border-dashed border-primary/40",
}) {
  const canRemove = items.length > minItems;
  const canAdd = items.length < maxItems;

  const handleRemove = (index) => {
    if (canRemove) {
      onRemove(index);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header with Add button */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold">
            {itemNamePlural}
            {items.length > 0 && (
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                ({items.length} {items.length === 1 ? itemName.toLowerCase() : itemNamePlural.toLowerCase()})
              </span>
            )}
          </h3>
          {!canAdd && (
            <p className="text-xs text-muted-foreground mt-1">
              Maximum {maxItems} {itemNamePlural.toLowerCase()} reached
            </p>
          )}
        </div>
        <Button
          type="button"
          size="sm"
          onClick={onAdd}
          disabled={!canAdd}
        >
          <Plus className="w-4 h-4 mr-1" />
          Add {itemName}
        </Button>
      </div>

      {/* Items List */}
      {items.length > 0 ? (
        <div className="space-y-4">
          {items.map((item, index) => (
            <Card key={index} className={cardClassName}>
              <CardHeader className="flex flex-row items-center justify-between py-3 space-y-0">
                <div className="flex items-center gap-2">
                  {allowReorder && (
                    <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
                  )}
                  <CardTitle className="text-sm">
                    {showIndex && `${itemName} #${index + 1}`}
                    {!showIndex && itemName}
                  </CardTitle>
                </div>

                {canRemove && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Remove {itemName}?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to remove this {itemName.toLowerCase()}? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleRemove(index)}
                          className="bg-destructive hover:bg-destructive/90"
                        >
                          Remove
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </CardHeader>
              <Separator />
              <CardContent className="pt-4">
                {renderItem(item, index)}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-dashed">
          <CardContent className="py-12 text-center">
            <p className="text-sm text-muted-foreground">
              {emptyMessage || `No ${itemNamePlural.toLowerCase()} added yet`}
            </p>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={onAdd}
              className="mt-4"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add First {itemName}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Minimum items warning */}
      {items.length === minItems && minItems > 0 && (
        <p className="text-xs text-muted-foreground">
          At least {minItems} {minItems === 1 ? itemName.toLowerCase() : itemNamePlural.toLowerCase()} required
        </p>
      )}
    </div>
  );
}