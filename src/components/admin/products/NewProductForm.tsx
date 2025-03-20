import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus, Trash } from "lucide-react";
import { Control, FieldValues, Path, useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { MultiSelect } from "@/components/shared/MultiSelect";
import { Filter, Product, ProductAttribute, ProductImage } from "@/types/admin-products";
import { Badge } from "@/components/ui/badge";
import { SortableImages } from "./SortableImages";
import { generateUUID } from "@/lib/utils";
import { VolumeForm } from "./VolumeForm";
import { FaqsFields } from "./FaqsFields";
import z from "zod";

export const volumeFormSchema = z.object({
  volume: z.string(),
  weight: z.string()
    .refine(val => /^(-?\d*\.?\d+)$/.test(val), {
      message: "Weight must be a valid number"
    })
    .transform(val => val.trim()),

  height: z.string()
    .refine(val => /^(-?\d*\.?\d+)$/.test(val), {
      message: "Height must be a valid number"
    })
    .transform(val => val.trim()),

  innerDiameter: z.string()
    .refine(val => /^(-?\d*\.?\d+)$/.test(val), {
      message: "Inner diameter must be a valid number"
    })
    .transform(val => val.trim()),

  outerDiameter: z.string()
    .refine(val => /^(-?\d*\.?\d+)$/.test(val), {
      message: "Outer diameter must be a valid number"
    })
    .transform(val => val.trim()),

  shieldingSide: z.string()
    .refine(val => /^(-?\d*\.?\d+)$/.test(val), {
      message: "Shielding side must be a valid number"
    })
    .transform(val => val.trim()),

  shieldingSidePbEquiv: z.string()
    .refine(val => /^(-?\d*\.?\d+)$/.test(val), {
      message: "Shielding side Pb equivalent must be a valid number"
    })
    .transform(val => val.trim()),

  topShield: z.string()
    .refine(val => /^(-?\d*\.?\d+)$/.test(val), {
      message: "Top shield must be a valid number"
    })
    .transform(val => val.trim()),

  topShieldPbEquiv: z.string()
    .refine(val => /^(-?\d*\.?\d+)$/.test(val), {
      message: "Top shield Pb equivalent must be a valid number"
    })
    .transform(val => val.trim()),

  bottom: z.string()
    .refine(val => /^(-?\d*\.?\d+)$/.test(val), {
      message: "Bottom must be a valid number"
    })
    .transform(val => val.trim()),

  bottomPbEquiv: z.string()
    .refine(val => /^(-?\d*\.?\d+)$/.test(val), {
      message: "Bottom Pb equivalent must be a valid number"
    })
    .transform(val => val.trim())
});

export const faqFormSchema = z.object({
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required"),
});

const productImageSchema = z.object({
  id: z.string().optional(),
  file: z.unknown().refine((value: unknown) => {
    if (typeof window !== 'undefined') {
      return value instanceof File;
    }
    return true;
  }, {
    message: 'File must be a valid File object in the browser or a string on the server',
  }),
  src: z.string().optional()
});

const formSchema = z.object({
  name: z.string().min(1, "Name is required").transform(val => val.trim()), 
  description: z.string().min(1, "Description is required").transform(val => val.trim()),
  material: z.string().min(1, "Material is required").transform(val => val.trim()),
  features: z.array(z.string().min(1, "Feature cannot be empty").transform(val => val.trim())),
  usages: z.array(z.string().min(1, "At least one usage is required")).min(1, "Select at least one option"),
  isotopes: z.array(z.string().min(1, "At least one isotope is required")).min(1, "Select at least one option"),
  shields: z.array(z.string().min(1, "At least one shield is required")).min(1, "Select at least one option"),
  accessories: z.array(z.string().min(1, "At least one accessory is required")).min(1, "Select at least one option"),
  volumes: z.array(z.string().min(1, "At least one volume is required")).min(1, "Select at least one option"),
  images: z.array(productImageSchema).min(1, "At least one image is required"),
  specifications: z.array(volumeFormSchema).min(1, "At least one volume is required"),
  faqs: z.array(faqFormSchema).min(1, "At least one FAQ is required"),
  relatedProducts: z.array(z.string()).optional()
});

export type FormValues = z.infer<typeof formSchema>;

interface NewProductFormProps {
  usageOptions: ProductAttribute[];
  isotopeOptions: ProductAttribute[];
  shieldOptions: ProductAttribute[];
  accessoryOptions: ProductAttribute[];
  volumeOptions: ProductAttribute[];
  productOptions: Product[];
  filters: Filter[];
}

export default function NewProductForm({ 
  usageOptions,
  isotopeOptions,
  shieldOptions,
  accessoryOptions,
  volumeOptions,
  productOptions,
  filters
}: NewProductFormProps) {

  const [selectedVolume, setSelectedVolume] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      material: "",
      features: [""],
      usages: [],
      isotopes: [],
      shields: [],
      accessories: [],
      volumes: [],
      images: [],
      specifications: [],
      faqs: [{question: "", answer: ""}],
      relatedProducts: []
    },
  });

  const images = form.watch("images");
  const formFeatures = form.watch("features")
  const formVolumes = form.watch("volumes");
  const faqs = form.watch("faqs");

  useEffect(() => {
    if (!selectedVolume && formVolumes.length) setSelectedVolume(formVolumes[0]);
    if (!formVolumes.includes(selectedVolume) && formVolumes.length) setSelectedVolume(formVolumes[0]);
    if (!formVolumes.includes(selectedVolume) && !formVolumes.length) setSelectedVolume("")
  }, [formVolumes, selectedVolume])

  const formSpacing = "mb-4";

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newImages = files.map((file) => ({
      id: generateUUID(),
      file: file,
      src: ""
    }));
    form.setValue("images", [...images, ...newImages]);
    event.target.value = "";
    if (newImages.length > 0) {
      form.clearErrors("images");
    }
    if (newImages.length === 0) {
      form.setError("images", {
        type: "manual",
        message: "At least one image is required",
      });
    }
  };

  function handleAddVolume(name: string): void {
    const specifications = form.getValues("specifications");
    const newSpecifications: z.infer<typeof volumeFormSchema> = {
      volume: name,
      weight: "",
      height: "",
      innerDiameter: "",
      outerDiameter: "",
      shieldingSide: "",
      shieldingSidePbEquiv: "",
      topShield: "",
      topShieldPbEquiv: "",
      bottom: "",
      bottomPbEquiv: ""
     }
    form.setValue("specifications", [...specifications, newSpecifications])
  }

  function handleRemoveVolume(name: string): void {
    const specifications = form.getValues("specifications");
    specifications.filter(spec => spec.volume !== name);
    form.setValue("specifications", specifications);
  }

  async function postProduct(form: UseFormReturn<FormValues>): Promise<void> {
    const formData = prepareFormData();

    try {
      const response = await fetch("/api/admin/products/postProduct", {
        method: "POST",
        body: formData
      });

      if (!response.ok) throw new Error();
      form.reset();
    } catch (error) {
      console.error("Error posting product:", error);
    }
  }

  function prepareFormData() {
    const data = form.getValues();
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("features", JSON.stringify(data.features));
    formData.append("material", data.material);
    formData.append("usages", JSON.stringify(getAttributeIds(data.usages, usageOptions)));
    formData.append("usageFilterId", getIdFromName("Usages", filters));
    formData.append("isotopes", JSON.stringify(getAttributeIds(data.isotopes, isotopeOptions)));
    formData.append("isotopeFilterId", getIdFromName("Isotopes", filters));
    formData.append("volumes", JSON.stringify(getAttributeIds(data.volumes, volumeOptions)));
    formData.append("volumeFilterId", getIdFromName("Volumes", filters));
    formData.append("shields", JSON.stringify(getAttributeIds(data.shields, shieldOptions)));
    formData.append("shieldFilterId", getIdFromName("Shields", filters));
    formData.append("accessories", JSON.stringify(getAttributeIds(data.accessories, accessoryOptions)));
    formData.append("accessoryFilterId", getIdFromName("Accessories", filters));
    formData.append("specifications", JSON.stringify(updateSpecifcationIds(data.specifications, volumeOptions)));
    formData.append("faqs", JSON.stringify(data.faqs));
    formData.append("relatedProducts", JSON.stringify(getAttributeIds(data.relatedProducts || [], productOptions)));
    formData.append("images", JSON.stringify(data.images));

    if (data.images && data.images.length > 0) {
      data.images.forEach((image) => {
        formData.append(`imageFiles`, image.file as File);
      });
    }

    return formData;
  }

  function getIdFromName(name: string, object: Filter[]): string {
    const filter = object.find((filter) => filter.name === name);
    return filter ? filter.id : "";
  }

  function getAttributeIds(formValues: string[], attributeValues: ProductAttribute[]) {
    return attributeValues
      .filter((attr) => formValues.includes(attr.name))
      .map((attr) => ({ name: attr.name, id: attr.id }));
  }

  function updateSpecifcationIds(formValues: z.infer<typeof volumeFormSchema>[], volumeOptions: ProductAttribute[]) {
    return formValues.map(value => {
      const matchedItem = volumeOptions.find(volume => volume.name === value.volume);
      return matchedItem ? { ...value, volume: matchedItem.id } : value;
    });
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    await postProduct(form);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-x-5">
          <section className="w-1/2">
            <NameField control={form.control} formSpacing={formSpacing}/>
            <DescriptionField control={form.control} formSpacing={formSpacing}/>
            <MaterialField control={form.control} formSpacing={formSpacing}/>
            <FeaturesField
              form={form}
              formFeatures={formFeatures}
              formSpacing={formSpacing}
            />
            <FaqsFields
              mainForm={form}
              faqs={faqs}
            />
            <UsagesField
              control={form.control}
              formSpacing={formSpacing}
              usageOptions={usageOptions}
            />
            <IsotopesField
              control={form.control}
              formSpacing={formSpacing}
              isotopeOptions={isotopeOptions}
            />
            <ShieldsField
              control={form.control}
              formSpacing={formSpacing}
              shieldOptions={shieldOptions}
            />
            <AccessoriesField
              control={form.control}
              formSpacing={formSpacing}
              accessoryOptions={accessoryOptions}
            />
            <VolumesField
              control={form.control}
              volumeOptions={volumeOptions}
              handleRemoveVolume={handleRemoveVolume}
              handleAddVolume={handleAddVolume}
            />
          </section>
          <section className="w-1/2">
            <ImagesField
              form={form}
              images={images}
              handleUpload={handleUpload}
            />
            <SpecificationsField 
              form={form}
              formSpacing={formSpacing}
              formVolumes={formVolumes}
              selectedVolume={selectedVolume}
              setSelectedVolume={setSelectedVolume}
            />
            <RelatedProducts 
              form={form}
              productOptions={productOptions}
            />
          </section>
        </div>
        <Button className="block ml-auto mt-4 cursor-pointer" type="submit">Submit</Button>
      </form>
    </Form>
  )
}

type FormFieldProps<T extends FieldValues> = {
  control: Control<T>;
  formSpacing: string;
};

function NameField<T extends FieldValues>({ control, formSpacing }: FormFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={`name` as Path<T>}
      render={({ field }) => (
        <FormItem className={formSpacing}>
          <FormLabel>Name</FormLabel>
          <FormMessage />
          <FormControl>
            <Input placeholder="Product Name" {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

function DescriptionField<T extends FieldValues>({ control, formSpacing }: FormFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={`description` as Path<T>}
      render={({ field }) => (
        <FormItem className={formSpacing}>
          <FormLabel>Description</FormLabel>
          <FormMessage />
          <FormControl>
            <Textarea
              className="max-h-[80px] resize-none bg-[transparent]"
              placeholder="Product Description"
              {...field}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

function MaterialField<T extends FieldValues>({ control, formSpacing }: FormFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={`material` as Path<T>}
      render={({ field }) => (
        <FormItem className={formSpacing}>
          <FormLabel>Material</FormLabel>
          <FormMessage />
          <FormControl>
            <Input placeholder="Material Type" {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

type FeaturesFieldProps = {
  form: UseFormReturn<FormValues>;
  formFeatures: string[];
  formSpacing: string;
};

function FeaturesField({ form, formFeatures, formSpacing }: FeaturesFieldProps) {
  return (
    <div className="grid gap-2">
      <FormLabel>Features</FormLabel>
      {formFeatures.map((_, index) => (
        <FormField
          key={index}
          control={form.control}
          name={`features.${index}`}
          render={({ field }) => (
            <FormItem>
              <FormMessage />
              <div className="flex gap-x-2">
                <FormControl>
                  <Input placeholder={`Feature ${index + 1}`} {...field} />
                </FormControl>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="cursor-pointer"
                  onClick={() => {
                    const features = form.getValues("features");
                    features.splice(index, 1);
                    form.setValue("features", features);
                  }}
                  disabled={formFeatures.length === 1}
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            </FormItem>
          )}
        />
      ))}
      <Button
        type="button"
        variant="secondary"
        size="sm"
        onClick={() => form.setValue("features", [...formFeatures, ""])}
        className={`flex items-center gap-2 cursor-pointer ${formSpacing}`}
      >
        <Plus className="w-4 h-4" /> Add Feature
      </Button>
    </div>
  );
}

type UsagesFieldProps<T extends FieldValues> = {
  control: Control<T>;
  formSpacing: string;
  usageOptions: ProductAttribute[];
};

function UsagesField<T extends FieldValues>({ control, formSpacing, usageOptions }: UsagesFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={`usages` as Path<T>}
      render={({ field }) => (
        <FormItem className={`${formSpacing}`}>
          <FormLabel>Usages</FormLabel>
          <FormMessage />
          <FormControl>
            <MultiSelect
              options={usageOptions}
              type="Usages"
              onValueChange={field.onChange}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

type IsotopesFieldProps<T extends FieldValues> = {
  control: Control<T>;
  formSpacing: string;
  isotopeOptions: ProductAttribute[];
};

function IsotopesField<T extends FieldValues>({ control, formSpacing, isotopeOptions }: IsotopesFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={`isotopes` as Path<T>}
      render={({ field }) => (
        <FormItem className={`${formSpacing}`}>
          <FormLabel>Isotopes</FormLabel>
          <FormMessage />
          <FormControl>
            <MultiSelect
              options={isotopeOptions}
              type="Isotopes"
              onValueChange={field.onChange}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

type ShieldsFieldProps<T extends FieldValues> = {
  control: Control<T>;
  formSpacing: string;
  shieldOptions: ProductAttribute[];
};

function ShieldsField<T extends FieldValues>({ control, formSpacing, shieldOptions }: ShieldsFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={`shields` as Path<T>}
      render={({ field }) => (
        <FormItem className={`${formSpacing}`}>
          <FormLabel>Shields</FormLabel>
          <FormMessage />
          <FormControl>
            <MultiSelect
              options={shieldOptions}
              type="Shields"
              onValueChange={field.onChange}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

type AccessoriesFieldProps<T extends FieldValues> = {
  control: Control<T>;
  formSpacing: string;
  accessoryOptions: ProductAttribute[];
};

function AccessoriesField<T extends FieldValues>({ control, formSpacing, accessoryOptions }: AccessoriesFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={`accessories` as Path<T>}
      render={({ field }) => (
        <FormItem className={`${formSpacing}`}>
          <FormLabel>Accessories</FormLabel>
          <FormMessage />
          <FormControl>
            <MultiSelect
              options={accessoryOptions}
              type="Accessories"
              onValueChange={field.onChange}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

type VolumesFieldProps<T extends FieldValues> = {
  control: Control<T>;
  volumeOptions: ProductAttribute[];
  handleRemoveVolume: (name: string) => void;
  handleAddVolume: (name: string) => void;
};

function VolumesField<T extends FieldValues>({ control, volumeOptions, handleRemoveVolume, handleAddVolume }: VolumesFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={`volumes` as Path<T>}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Volumes</FormLabel>
          <FormMessage />
          <FormControl>
            <MultiSelect
              options={volumeOptions}
              type="Volumes"
              onValueChange={field.onChange}
              addSpecification={handleAddVolume}
              removeSpecifcation={handleRemoveVolume}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

type ImagesFieldProps = {
  form: UseFormReturn<FormValues>;
  images: ProductImage[];
  handleUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function ImagesField({ form, images, handleUpload }: ImagesFieldProps) {
  return (
    <FormField
      control={form.control}
      name="images"
      render={() => (
        <FormItem>
            <FormLabel>Product Images</FormLabel>
            <FormMessage />
            <FormControl>
              <div>
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleUpload}
                  className="mb-2 block max-w-[212px] cursor-pointer"
                />
                <SortableImages form={form} images={images} />
              </div>
            </FormControl>
        </FormItem>
      )}
    />
  );
}

interface SpecificationsFieldProps {
  form: UseFormReturn<FormValues>;
  formSpacing: string;
  formVolumes: string[];
  selectedVolume: string;
  setSelectedVolume: React.Dispatch<React.SetStateAction<string>>;
}

function SpecificationsField({ form, formSpacing, formVolumes, selectedVolume, setSelectedVolume }: SpecificationsFieldProps) {

  const index = form.getValues("specifications").findIndex(spec => spec.volume === selectedVolume);
  const specificationErrors = form.formState.errors.specifications;

  return (
    <>
      <FormField
        control={form.control}
        name="specifications"
        render={() => {
          const hasError = form.formState.errors.specifications;

          return (
            <FormItem>
              <FormLabel className="mb-1">Volume Specifications</FormLabel>
              {formVolumes.length ? (
                <div className={`flex gap-x-2`}>
                  {formVolumes.map((volume, volumeIndex) => (
                    <button
                      key={volume}
                      type="button"
                      onClick={() => {
                        setSelectedVolume(volume);
                      }}
                    >
                      <Badge
                        className={`cursor-pointer ${selectedVolume === volume ? "border-white" : ""} ${specificationErrors && specificationErrors[volumeIndex] ? "text-red-500" : "text-white"}`}
                        variant="secondary"
                      >
                        {volume}
                      </Badge>
                    </button>
                  ))}
                </div>
              ) : null}

              {!selectedVolume && (
                <div
                  className={`text-sm ${formSpacing} ${hasError ? "text-red-500" : "text-white"}`}
                >
                  <div>Add Volumes to Access Specifications</div>
                </div>
              )}
            </FormItem>
          );
        }}
      />
      {selectedVolume && (
        <VolumeForm
          mainForm={form}
          formSchema={volumeFormSchema}
          index={index}
          formSpacing={formSpacing}
          className={selectedVolume ? "block" : "hidden"}
        />
      )}
    </>
  );
}

interface RelatedProductsProps {
  form: UseFormReturn<FormValues>;
  productOptions: ProductAttribute[];
}

function RelatedProducts({ form, productOptions }: RelatedProductsProps) {
  return (
    <FormField
      control={form.control}
      name="relatedProducts"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Related Products</FormLabel>
          <FormMessage />
          <FormControl>
            <MultiSelect
              options={productOptions}
              type="Related Products"
              onValueChange={field.onChange}
            />
          </FormControl>
        </FormItem>
      )}
    />
  )
}
