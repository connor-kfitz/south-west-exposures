import { ProductImage } from "@/types/admin-products";
import { DndContext, DragEndEvent, MouseSensor, TouchSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, useSortable, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./NewProductForm";
import Image from "next/image";

interface SortableImageProps {
  image: ProductImage;
  removeImage: (id: string) => void;
}

function SortableImage({ image, removeImage }: SortableImageProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="relative w-24 h-24 border border-border rounded-md overflow-hidden cursor-grab">
      <Image src={(image.file && image.file instanceof File) ? URL.createObjectURL(image.file) : image.src} alt="Uploaded" width={100} height={100} className="object-cover w-full h-full"/>
      <button
        type="button"
        onClick={() => removeImage(image.id)}
        className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full cursor-pointer"
      >
        <Trash className="w-4 h-4" />
      </button>
    </div>
  );
};

interface SortableImagesProps {
  form: UseFormReturn<FormValues>;
  images: ProductImage[];
}

export function SortableImages({ form, images }: SortableImagesProps) {

  const handleRemove = (id: string) => {
    const updatedImages = images.filter((image) => image.id !== id);
    form.setValue("images", updatedImages, { shouldValidate: true });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      form.setValue(
        "images",
        arrayMove(images, images.findIndex(i => i.id === active.id), images.findIndex(i => i.id === over?.id))
      );
    }
  };

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      distance: 10
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);
  return (
    <DndContext
      collisionDetection={closestCenter}
      sensors={sensors}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={images.length > 0 ? images.map((image) => image.id) : []}>
        <div className="flex gap-2 flex-wrap mb-4">
          {images.map((image) => (
            <SortableImage key={image.id} image={image} removeImage={handleRemove} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}
