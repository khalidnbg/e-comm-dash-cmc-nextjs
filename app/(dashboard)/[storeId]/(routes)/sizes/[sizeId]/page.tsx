import db from "@/prisma/client";
import { SizeForm } from "./components/size-form";

const SizePage = async ({ params }: { params: { sizeId: string } }) => {
  // If the `sizeId` is "new", we do not query the database.
  if (params.sizeId === "new") {
    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <SizeForm initialData={null} />
        </div>
      </div>
    );
  }

  // Otherwise, query the database for the existing billboard.
  const size = await db.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });

  console.log(params.sizeId);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={size} />
      </div>
    </div>
  );
};

export default SizePage;
