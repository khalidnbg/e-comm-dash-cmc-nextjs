import db from '@/prisma/client'
import React from 'react'

export const getSalesCount = async (storeId: string) => {
	const salesCount = await db.order.count({
		where: {
			storeId,
			isPaid: true, 
		},
	});

	return salesCount;
}

