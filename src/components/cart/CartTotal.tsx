"use client";

import { currencyFormatter } from "@/utils";
import { Game } from "@/database/models";

export function CartTotal({
  selected,
}: {
  selected: Pick<Game, "ID" | "sale_price">[];
}) {
  let totalPrice = 0;
  for (const game of selected) {
    totalPrice += game.sale_price;
  }

  return (
    <>
      <div className={"text-sm flex flex-col gap-2"}>
        <div className="flex justify-between">
          <p>Price</p>
          <p>{currencyFormatter(totalPrice)}</p>
        </div>
        <div hidden className="flex justify-between">
          <p>Sale Discount</p>
          <p>{currencyFormatter(0)}</p>
        </div>
      </div>
      <hr className="border-white/60" />
      <div className="flex justify-between text-sm">
        <p className="font-bold">Total</p>
        <p className="font-bold">{currencyFormatter(totalPrice)}</p>
      </div>
    </>
  );
}
