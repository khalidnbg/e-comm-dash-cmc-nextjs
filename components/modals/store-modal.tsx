"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";

export const StoreModal = () => {
  const StoreModal = useStoreModal();

  return (
    <Modal
      title="Create store"
      description="Add new store to manage products and categories"
      isOpen={StoreModal.isOpen}
      onClose={StoreModal.onClose}
    >
      Future Create Form
    </Modal>
  );
};
