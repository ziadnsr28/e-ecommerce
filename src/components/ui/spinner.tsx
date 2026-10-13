import { cn } from "cn"
import { Loader2Icon } from "lucide-react"

// Renders an animated loading spinner icon.
function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon data-slot="spinner" role="status" aria-label="Loading" className={cn("size-4 animate-spin", className)} {...props} />
  )
}

export { Spinner }
