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
}

const ProductCard = ({ id, name, price, image_url, category }: ProductCardProps) => {
  const addItem = useCart((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({ id, name, price, image_url });
    toast.success(`${name} added to cart`);
  };

  return (
    <div className="group relative bg-card rounded-xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 animate-fade-in">
      {/* Image */}
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={image_url || "/placeholder.svg"}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Category Badge */}
      <span className="absolute top-3 left-3 px-3 py-1 text-xs font-medium bg-background/90 backdrop-blur-sm rounded-full text-muted-foreground capitalize">
        {category}
      </span>

      {/* Quick Add Button */}
      <button
        onClick={handleAddToCart}
        className="absolute top-3 right-3 h-10 w-10 rounded-full bg-gradient-rose text-primary-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-glow"
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
            className="bg-gradient-rose hover:opacity-90 text-primary-foreground gap-1.5"
          >
            <ShoppingBag className="h-4 w-4" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
