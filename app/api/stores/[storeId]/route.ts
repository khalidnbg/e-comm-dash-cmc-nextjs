import db from "@/prisma/client";
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function PATCH(
	req: Request,
	{params } : {params: {storeId : string}}
) {
	try {
      const {userId} = auth();
	  const body = await req.json();

	  const { name } = body

	  if (!userId) {
		return new NextResponse("Unauthorized", { status: 401 });
	  }

	  if (!name) {
		return new NextResponse("Name is required", { status: 400 });
	  }

	  if (!params.storeId) {
		return new NextResponse("Store is required", { status: 400 });
	  }

	  const store = await db.store.updateMany({
		where: {
			id: params.storeId,
			userId
		},
		data: {
			name
		}
	});

	return NextResponse.json(store);
	} catch (error) {
	  console.log("[PATCH_STORE]", error)
	  return new NextResponse("Internal error", { status: 500 });
	}
}

export async function DELETE(
	req: Request,
	{params } : {params: {storeId : string}}
) {
	try {
      const {userId} = auth();

	  if (!userId) {
		return new NextResponse("Unauthorized", { status: 401 });
	  }

	  if (!params.storeId) {
		return new NextResponse("Store is required", { status: 400 });
	  }

	  const store = await db.store.deleteMany({
		where: {
			id: params.storeId,
			userId
		},
	});

	return NextResponse.json(store);
	} catch (error) {
	  console.log("[DELETE_STORE]", error)
	  return new NextResponse("Internal error", { status: 500 });
	}
}