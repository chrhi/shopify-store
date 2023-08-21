import { ShoppingCartIcon } from "lucide-react";
import clsx from "clsx";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Icons } from "../shared/icons";

export default function OpenCart({
  className,
  quantity,
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <Button
      aria-label="Open cart"
      variant="outline"
      size="icon"
      className="relative"
    >
      {quantity && quantity > 0 && (
        <Badge
          variant="secondary"
          className="absolute -right-2 -top-2 h-6 w-6 rounded-full p-2"
        >
          {quantity}
        </Badge>
      )}
      <Icons.cart className="h-4 w-4" aria-hidden="true" />
    </Button>
  );
}
