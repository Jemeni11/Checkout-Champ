import { useMemo, useCallback } from "react";
import { useAtom } from "jotai";
import cartAtom from "../store";
import type { Meal } from "../types";

export default function Cart() {
  const [cart, setCart] = useAtom(cartAtom);

  const pickedMeals = useMemo(
    () => cart.filter((meal) => meal.quantity > 0),
    [cart],
  );
  const pickedMealsLength = pickedMeals.length;

  const removeMealFromCart = useCallback(
    (name: string) => {
      setCart((prev) =>
        prev.map((p) => (p.name === name ? { ...p, quantity: 0 } : p)),
      );
    },
    [setCart],
  );

  return (
    <aside className="h-fit rounded-2xl bg-white px-8 py-10">
      <h2 className="text-2xl font-semibold text-red">
        Your Cart ({pickedMealsLength})
      </h2>
      {pickedMealsLength > 0 ? (
        <CartContent
          pickedMeals={pickedMeals}
          removeMealFromCart={removeMealFromCart}
        />
      ) : (
        <EmptyCart />
      )}
    </aside>
  );
}

function CartContent({
  pickedMeals,
  removeMealFromCart,
}: {
  pickedMeals: Meal[];
  removeMealFromCart: (name: string) => void;
}) {
  const formattedPrice = (price: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);

  const cartTotal = useMemo(
    () =>
      pickedMeals.reduce((acc, meal) => acc + meal.price * meal.quantity, 0),
    [pickedMeals],
  );

  return (
    <div>
      {pickedMeals.map((meal) => (
        <div
          key={meal.name}
          className="flex items-center justify-between border-b border-solid border-b-rose-300 py-6"
        >
          <div>
            <span className="mb-4 font-medium">{meal.name}</span>
            <br />
            <p className="inline-flex items-center gap-x-2 lg:gap-x-4">
              <span className="text-red lg:mr-4">{meal.quantity}x</span>
              <span className="text-rose-400">
                @ {formattedPrice(meal.price)}
              </span>
              <span className="text-rose-500">
                {formattedPrice(meal.price * meal.quantity)}
              </span>
            </p>
          </div>
          <button
            type="button"
            onClick={() => removeMealFromCart(meal.name)}
            className="rounded-[50%] border border-solid border-rose-300 p-1 text-rose-300 hover:border-rose-900 hover:text-rose-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              fill="none"
              viewBox="0 0 10 10"
            >
              <path
                fill="currentColor"
                d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"
              />
            </svg>
          </button>
        </div>
      ))}
      <div className="my-4 flex items-center justify-between">
        <span>Order Total</span>
        <span className="text-2xl font-bold text-rose-900">
          {formattedPrice(cartTotal)}
        </span>
      </div>
      <div className="flex w-full items-center justify-center rounded-xl bg-rose-50 p-4">
        <img src="/images/icon-carbon-neutral.svg" alt="carbon-neutral" />
        <span className="ml-2 text-xs">
          This is a <span className="font-bold">carbon-neutral</span> delivery.
        </span>
      </div>
      <button
        type="submit"
        className="mt-4 w-full rounded-full bg-red py-3 text-center text-white"
      >
        Confirm Order
      </button>
    </div>
  );
}

function EmptyCart() {
  return (
    <figure>
      <img
        src="/images/illustration-empty-cart.svg"
        alt="Empty Cart"
        className="mx-auto mb-6 mt-14"
      />
      <figcaption className="w-full text-center">
        Your added items will appear here
      </figcaption>
    </figure>
  );
}
