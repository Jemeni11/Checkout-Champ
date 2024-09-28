import { Meal } from "../types";
import { useSetAtom } from "jotai";
import cartAtom from "../store";

function MealItem({ quantity, name, category, price, image }: Meal) {
  const setCart = useSetAtom(cartAtom);
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

  const handleCartItemChange = (operation: "+" | "-") => {
    setCart((prev) =>
      prev.map((p) =>
        p.name === name
          ? {
              ...p,
              quantity: Math.max(0, p.quantity + (operation === "+" ? 1 : -1)),
            }
          : p,
      ),
    );
  };

  return (
    <div>
      <picture>
        <source
          media="(min-width: 768px)"
          sizes="100%"
          srcSet={image?.desktop}
        />
        <source
          media="(min-width: 320px)"
          sizes="100%"
          srcSet={image?.mobile}
        />
        {/* <img src={image?.mobile} alt={name} className="mb-6 rounded-lg" /> */}
        <img
          src={image?.mobile}
          alt={name}
          className={`${quantity > 0 ? "outline outline-2 outline-red sm:outline-none" : ""} mb-6 rounded-lg bg-rose-300`}
        />
      </picture>
      <div className="relative mb-6 w-full">
        <div className="absolute -top-12 w-full px-[17.5%]">
          {quantity === 0 ? (
            <button
              type="button"
              onClick={() => handleCartItemChange("+")}
              className="flex w-full items-center justify-center gap-x-2 rounded-full border border-solid border-rose-300 bg-white px-6 py-2 text-center hover:border-red"
            >
              <img src="/images/icon-add-to-cart.svg" alt="Add to Cart" />
              <span className="hover:text-red">Add to Cart</span>
            </button>
          ) : (
            <div className="flex items-center justify-between rounded-full bg-red px-4 py-2 text-white">
              <QuantityModifierButton
                handlerFunction={handleCartItemChange}
                operation="-"
              />
              <span>{quantity}</span>
              <QuantityModifierButton
                handlerFunction={handleCartItemChange}
                operation="+"
              />
            </div>
          )}
        </div>
      </div>
      <span className="text-xs text-rose-400">{category}</span>
      <p className="text-base font-semibold text-rose-900">{name}</p>
      <span className="font-medium text-red">{formattedPrice}</span>
    </div>
  );
}

export default MealItem;

function QuantityModifierButton({
  handlerFunction,
  operation,
}: {
  handlerFunction: (operation: "+" | "-") => void;
  operation: "+" | "-";
}) {
  return (
    <button
      type="button"
      onClick={() => handlerFunction(operation)}
      className="aspect-square rounded-[50%] border border-white p-1 text-white hover:bg-white hover:text-red"
    >
      {operation === "+" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          fill="none"
          viewBox="0 0 10 10"
        >
          <path
            fill="currentColor"
            d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="2"
          fill="none"
          viewBox="0 0 10 2"
        >
          <path fill="currentColor" d="M0 .375h10v1.25H0V.375Z" />
        </svg>
      )}
    </button>
  );
}
