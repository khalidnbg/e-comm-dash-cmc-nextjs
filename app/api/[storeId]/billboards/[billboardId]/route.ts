import db from "@/prisma/client";
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function GET(
	req: Request,
	{params } : {params: { billboardId: string}}
) {
	try {
	  if (!params.billboardId) {
		return new NextResponse("Billboard is required", { status: 400 });
	  }

	  const billboard = await db.billboard.findUnique({
		where: {
			id: params.billboardId,
		},
	});

	return NextResponse.json(billboard);
	} catch (error) {
	  console.log("[GET_Billboard]", error)
	  return new NextResponse("Internal error", { status: 500 });
	}
}

export async function PATCH(
	req: Request,
	{params } : {params: { storeId: string, billboardId : string }}
) {
	try {
      const {userId} = auth();
	  const body = await req.json();

	  const { label, imageUrl } = body

	  if (!userId) {
		return new NextResponse("Unauthorized", { status: 401 });
	  }

	  if (!label) {
		return new NextResponse("Label is required", { status: 400 });
	  }

	  if (!imageUrl) {
		return new NextResponse("Image Url is required", { status: 400 });
	  }

	  if (!params.billboardId) {
		return new NextResponse("Billboard is required", { status: 400 });
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

	  const billboard = await db.billboard.updateMany({
		where: {
			id: params.billboardId,
		},
		data: {
			label,
			imageUrl
		}
	});

	return NextResponse.json(billboard);
	} catch (error) {
	  console.log("[PATCH_Billboard]", error)
	  return new NextResponse("Internal error", { status: 500 });
	}
}

export async function DELETE(
	req: Request,
	{params } : {params: {storeId : string, billboardId: string}}
) {
	try {
      const {userId} = auth();

	  if (!userId) {
		return new NextResponse("Unauthorized", { status: 401 });
	  }

	  if (!params.billboardId) {
		return new NextResponse("Billboard is required", { status: 400 });
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

	  const billboard = await db.billboard.deleteMany({
		where: {
			id: params.billboardId,
		},
	});

	return NextResponse.json(billboard);
	} catch (error) {
	  console.log("[DELETE_Billboard]", error)
	  return new NextResponse("Internal error", { status: 500 });
	}
}

