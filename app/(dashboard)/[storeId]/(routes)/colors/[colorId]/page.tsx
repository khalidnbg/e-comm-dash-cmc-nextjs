import db from "@/prisma/client";
import { ColorForm } from "./components/color-form";

const ColorPage = async ({ params }: { params: { colorId: string } }) => {
  // If the `colorId` is "new", we do not query the database.
  if (params.colorId === "new") {
    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ColorForm initialData={null} />
        </div>
      </div>
    );
  }

  // Otherwise, query the database for the existing billboard.
  const color = await db.color.findUnique({
    where: {
      id: params.colorId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={color} />
      </div>
    </div>
  );
};

export default ColorPage;
