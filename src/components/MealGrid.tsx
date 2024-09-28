import { useAtomValue } from "jotai";
import cartAtom from "../store";
import MealItem from "./MealItem";

export default function MealGrid() {
  const cart = useAtomValue(cartAtom);

  return (
    <main>
      <h1 className="mb-12 text-4xl font-bold">Desserts</h1>
      <div className="grid w-full gap-x-4 gap-y-6 min-[580px]:grid-cols-2 lg:grid-cols-3">
        {cart.map((datum) => (
          <MealItem
            key={datum.name}
            category={datum.category}
            name={datum.name}
            price={datum.price}
            quantity={datum.quantity}
            image={datum.image}
          />
        ))}
      </div>
    </main>
  );
}
