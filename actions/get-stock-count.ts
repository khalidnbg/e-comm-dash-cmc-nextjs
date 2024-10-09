import db from '@/prisma/client'
import React from 'react'

export const getStockCount = async (storeId: string) => {
	const stockCount = await db.product.count({
		where: {
			storeId,
			isArchived: false, 
		},
	});

	return stockCount;
}

