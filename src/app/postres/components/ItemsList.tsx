"use client";

import ProductCard from "@/components/products/ProductCard";
import data from "@/data/products.json";
import { MouseEventHandler, useMemo, useState } from "react";
import CategorySwitcher from "./CategorySwitcher";

interface Props {
  search: string | undefined;
  category: string | undefined;
}

export default function ItemsList({ search, category }: Props) {
  const [filter, setFilter] = useState<string>(category || "general");

  const handleSwitch: MouseEventHandler = (e) => {
    const category = e.currentTarget.getAttribute("data-category");

    if (category) {
      setFilter(category);
      const url = new URL(window.location.toString());
      url.searchParams.set("category", category);
      window.history.pushState({}, "", url);
    }
  };

  const parsedData = useMemo(() => {
    if (search) {
      const regex = RegExp(search, "i");

      return data
        .filter((p) => p.category === filter)
        .filter((p) => regex.test(p.name) || regex.test(p.description));
    }

    return data.filter((p) => p.category === filter);
  }, [search, filter]);

  return (
    <div>
      <CategorySwitcher filter={filter} handleSwitch={handleSwitch} />

      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 mt-5 mx-auto max-w-screen-xl">
        {parsedData.map(({ id, category, img, name, price }) => (
          <ProductCard
            key={id}
            id={id}
            category={category}
            img={img}
            name={name}
            price={price}
          />
        ))}
      </div>
    </div>
  );
}
