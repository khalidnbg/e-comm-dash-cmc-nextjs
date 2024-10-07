import db from "@/prisma/client";
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function GET(
	req: Request,
	{params } : {params: { sizeId: string}}
) {
	try {
	  if (!params.sizeId) {
		return new NextResponse("Size id is required", { status: 400 });
	  }

	  const size = await db.size.findUnique({
		where: {
			id: params.sizeId,
		},
	});

	return NextResponse.json(size);
	} catch (error) {
	  console.log("[GET_SIZE]", error)
	  return new NextResponse("Internal error", { status: 500 });
	}
}

export async function PATCH(
	req: Request,
	{params } : {params: { storeId: string, sizeId : string }}
) {
	try {
      const {userId} = auth();
	  const body = await req.json();

	  const { name, value } = body

	  if (!userId) {
		return new NextResponse("Unauthorized", { status: 401 });
	  }

	  if (!name) {
		return new NextResponse("Name is required", { status: 400 });
	  }

	  if (!value) {
		return new NextResponse("Value is required", { status: 400 });
	  }

	  if (!params.sizeId) {
		return new NextResponse("sizeId is required", { status: 400 });
	  }

	  const storeByUserId = await db.store.findFirst({
		where: {
			id: params.storeId,
			userId,
		}
	  })

	  if (!storeByUserId) {
		return new NextResponse("Unauthorized", { status: 403 });
	  }

	  const size = await db.size.updateMany({
		where: {
			id: params.sizeId,
		},
		data: {
			name,
			value
		}
	});

	return NextResponse.json(size);
	} catch (error) {
	  console.log("[PATCH_SiZE]", error)
	  return new NextResponse("Internal error", { status: 500 });
	}
}

export async function DELETE(
	req: Request,
	{params } : {params: {storeId : string, sizeId: string}}
) {
	try {
      const {userId} = auth();

	  if (!userId) {
		return new NextResponse("Unauthorized", { status: 401 });
	  }

	  if (!params.sizeId) {
		return new NextResponse("SizeId is required", { status: 400 });
	  }

	  const storeByUserId = await db.store.findFirst({
		where: {
			id: params.storeId,
			userId,
		}
	  })

	  if (!storeByUserId) {
		return new NextResponse("Unauthorized", { status: 403 });
	  }

	  const size = await db.size.deleteMany({
		where: {
			id: params.sizeId,
		},
	});

	return NextResponse.json(size);
	} catch (error) {
	  console.log("[DELETE_SIZE]", error)
	  return new NextResponse("Internal error", { status: 500 });
	}
}

