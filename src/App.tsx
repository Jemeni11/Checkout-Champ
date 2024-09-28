import { MealGrid, Cart } from "./components";

export default function App() {
  return (
    <div className="mx-auto grid min-h-screen w-full max-w-[1440px] grid-cols-1 gap-8 px-[5%] py-14 sm:gap-x-6 min-[896px]:grid-cols-[70%_30%] min-[1440px]:px-[4.5rem]">
      <MealGrid />
      <Cart />
    </div>
  );
}
