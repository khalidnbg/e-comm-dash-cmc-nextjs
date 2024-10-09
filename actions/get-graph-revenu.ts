import db from '@/prisma/client';
import React from 'react';

interface GraphData {
  name: string;
  total: number;
}

export const getGraphRevenue = async (storeId: string) => {
  const paidOrders = await db.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  // Correctly declare the monthlyRevenue object
  const monthlyRevenue: { [key: number]: number } = {};

  for (const order of paidOrders) {
    const month = order.createdAt.getMonth(); // Zero-based month
    let revenueForOrder = 0;

    for (const item of order.orderItems) {
      revenueForOrder += item.product.price; // Assume price is a number
    }

    // Accumulate revenue for the month
    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
  }

  // Prepare the graph data
  const graphData: GraphData[] = Array.from({ length: 12 }, (_, index) => ({
    name: new Date(0, index).toLocaleString('default', { month: 'short' }),
    total: 0,
  }));

  for (const month in monthlyRevenue) {
    graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
  }

  return graphData;
};
