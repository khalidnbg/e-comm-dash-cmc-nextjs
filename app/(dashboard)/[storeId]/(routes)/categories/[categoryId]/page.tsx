import db from "@/prisma/client";
import { CategoryForm } from "./components/category-form";

const CategoryPage = async ({
  params,
}: {
  params: { categoryId: string; storeId: string };
}) => {
  const billboards = await db.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  // If the `categoryId` is "new", we do not query the database.
  if (params.categoryId === "new" || params.storeId === "new") {
    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <CategoryForm billboards={billboards} initialData={null} />
        </div>
      </div>
    );
  }

  const category = await db.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  // Otherwise, query the database for the existing category.
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm billboards={billboards} initialData={category} />
      </div>
    </div>
  );
};

export default CategoryPage;
