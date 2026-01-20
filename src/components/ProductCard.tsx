import { ShoppingBag, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
  category: string;
  stock:number;
}

const ProductCard = ({
  id,
  name,
  price,
  image_url,
  category,
  stock,
}: ProductCardProps) => {
  const addItem = useCart((state) => state.addItem);

  const safeStock = stock ?? 0;
const isOutOfStock = safeStock <= 0;



  const handleAddToCart = () => {
    if (isOutOfStock) {
      toast.error("This product is out of stock");
      return;
    }

    addItem({ id, name, price, image_url });
    toast.success(`${name} added to cart`);
  };
  

  return (
      <div
  className={`group relative bg-card rounded-xl overflow-hidden shadow-card transition-all duration-300 animate-fade-in ${
    isOutOfStock ? "opacity-60" : "hover:shadow-glow"
  }`}
>

      {/* Image */}
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={image_url || "/placeholder.svg"}
          alt={name}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isOutOfStock ? "" : "group-hover:scale-105"
          }`}
          
        />
      </div>

      {/* Category Badge */}
      <span className="absolute top-3 left-3 px-3 py-1 text-xs font-medium bg-background/90 backdrop-blur-sm rounded-full text-muted-foreground capitalize">
        {category}
      </span>
      {isOutOfStock && (
  <span className="absolute top-3 right-3 px-3 py-1 text-xs font-semibold bg-red-600 text-white rounded-full">
    Out of stock
  </span>
)}


      {/* Quick Add Button */}

      <button
  onClick={handleAddToCart}
  disabled={isOutOfStock}
  className={`absolute top-3 right-3 h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-glow
    ${isOutOfStock
      ? "bg-muted text-muted-foreground cursor-not-allowed opacity-60"
      : "bg-gradient-rose text-primary-foreground opacity-0 group-hover:opacity-100 hover:scale-110"}
  `}
>
  <Plus className="h-5 w-5" />
</button>


      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="font-serif text-lg font-semibold text-foreground line-clamp-1">
          {name}
        </h3>
        <div className="flex items-center justify-between">
          <p className="text-primary font-semibold">
            ${price.toFixed(2)}
          </p>
          <Button
  onClick={handleAddToCart}
  size="sm"
  disabled={isOutOfStock}
  className="bg-gradient-rose hover:opacity-90 text-primary-foreground gap-1.5 disabled:opacity-60 disabled:cursor-not-allowed"
>
  <ShoppingBag className="h-4 w-4" />
  {isOutOfStock ? "Out of Stock" : "Add"}
</Button>

        </div>
      </div>
    </div>
  );
};

export default ProductCard;
