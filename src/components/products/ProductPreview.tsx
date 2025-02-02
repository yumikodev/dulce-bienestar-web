"use client";

import Subtitle from "@/components/Subtitle";
import data from "@/data/products.json";
import ProductCard from "./ProductCard";
import { MouseEvent, useEffect, useState } from "react";

function ProductPreview() {
  const [filter, setFilter] = useState<"general" | "stevia">("general");

  useEffect(() => {
    setFilter("general");
  }, []);

  const handleSwitch = (e: MouseEvent<HTMLButtonElement>) => {
    const category = e.currentTarget.getAttribute("data-category") as
      | "general"
      | "stevia";

    if (category) setFilter(category);
  };

  return (
    <section id="products" className="p-4 w-full">
      <div className="container mx-auto">
        <Subtitle> Productos </Subtitle>

        <div className="w-full h-0.5 bg-linear-90 from-transparent via-rose-950 via-50% to-transparent"></div>

        <div
          id="category-selector"
          className="w-full flex gap-2 justify-center mt-6 mb-2"
        >
          <button
            className={`px-4 py-2 rounded-3xl border-2 border-rose-500 ${
              filter === "general"
                ? "bg-rose-50 text-rose-500"
                : "bg-rose-500 text-rose-50"
            } uppercase hover:bg-rose-600 hover:border-rose-600 transition-colors duration-500 shadow`}
            data-category="general"
            onClick={handleSwitch}
          >
            Con Azúcar
          </button>
          <button
            className={`px-4 py-2 rounded-3xl border-2 border-rose-500 ${
              filter === "stevia"
                ? "bg-rose-50 text-rose-500"
                : "bg-rose-500 text-rose-50"
            } uppercase hover:bg-rose-600 hover:border-rose-600 transition-colors duration-500 shadow`}
            data-category="stevia"
            onClick={handleSwitch}
          >
            Con Stevia
          </button>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 mt-5 max-w-screen-xl mx-auto">
          {data
            .filter((p) => p.category === filter)
            .slice(0, 6)
            .map(({ category, id, name, price, img }) => (
              <ProductCard
                key={id}
                id={id}
                img={img}
                category={category}
                name={name}
                price={price}
              />
            ))}
        </div>
      </div>
    </section>
  );
}

export default ProductPreview;
