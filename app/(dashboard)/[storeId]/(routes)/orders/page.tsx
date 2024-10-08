import React from "react";
import db from "@/prisma/client";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";

import { OrderClient } from "./components/client";
import { OrderColumn } from "./components/columns";

const OrdersPage = async ({ params }: { params: { storeId: string } }) => {
  const orders = await db.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formatedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    products: item.orderItems
      .map((ordersItem) => ordersItem.product.name)
      .join(", "),
    totalPrice: formatter.format(
      item.orderItems.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0)
    ),
    isPaid: item.isPaid,
    createdAt: format(item.createdAt, "MMMM do, yyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt6">
        <OrderClient data={formatedOrders} />
      </div>
    </div>
  );
};

export default OrdersPage;
