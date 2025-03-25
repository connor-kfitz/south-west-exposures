import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus, Trash } from "lucide-react";
import { Control, FieldValues, Path, useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { MultiSelect } from "@/components/shared/MultiSelect";
import { Filter, Product, ProductAttribute, ProductImage, ProductSpecification } from "@/types/admin-products";
import { Badge } from "@/components/ui/badge";
import { SortableImages } from "./SortableImages";
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
  file: z.unknown().optional(),
  src: z.string().optional(),
}).refine((data) => data.file !== undefined || data.src !== undefined, {
  message: "Image is required",
  path: ["file", "src"]
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
  editProduct: Product | null;
  fetchProducts: () => Promise<void>;
  setEditProduct: (product: Product | null) => void;
}

export default function NewProductForm({ 
  usageOptions,
  isotopeOptions,
  shieldOptions,
  accessoryOptions,
  volumeOptions,
  productOptions,
  filters,
  editProduct,
  fetchProducts,
  setEditProduct
}: NewProductFormProps) {

  const [selectedVolume, setSelectedVolume] = useState<string>("");

  const defaultFormValues = {
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
    faqs: [{ question: "", answer: "" }],
    relatedProducts: []
  }
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultFormValues
  });

  useEffect(() => {
    if (!editProduct) return;

    function setFormValues(product: Product) {
      form.setValue("name", product.name);
      form.setValue("description", product.description);
      form.setValue("material", product.material);
      form.setValue("features", product.features);
      form.setValue("usages", product.usages.map((usage => usage.name)));
      form.setValue("isotopes", product.isotopes.map((isotope => isotope.name)));
      form.setValue("shields", product.shields.map((shield => shield.name)));
      form.setValue("accessories", product.accessories.map((accessory => accessory.name)));
      form.setValue("volumes", product.volumes.map((volume => volume.name)));
      form.setValue("images", product.images.map((image) => ({
        id: image.id,
        file: null,
        src: image.src
      })));
      form.setValue(
        "specifications",
        product.specifications.map((specification) => getSpecification(specification, volumeOptions))
      );
      form.setValue("faqs", product.faqs);
      form.setValue("relatedProducts", product.relatedProducts.map(product => product.name));
    }

    function getSpecification(
      specification: ProductSpecification,
      volumeOptions: ProductAttribute[]
    ): z.infer<typeof volumeFormSchema> {
      const volume = volumeOptions.find(v => v.id === specification.volumeId);
      const modifiedSpecification: z.infer<typeof volumeFormSchema> = {
        volume: volume?.name ?? "",
        weight: String(specification.weight),
        height: String(specification.height),
        innerDiameter: String(specification.innerDiameter),
        outerDiameter: String(specification.outerDiameter),
        shieldingSide: String(specification.shieldingSide),
        shieldingSidePbEquiv: String(specification.shieldingSidePbEquiv),
        topShield: String(specification.topShield),
        topShieldPbEquiv: String(specification.topShieldPbEquiv),
        bottom: String(specification.bottom),
        bottomPbEquiv: String(specification.bottomPbEquiv)
      }
      return modifiedSpecification
    }

    setFormValues(editProduct);

  }, [editProduct, form, volumeOptions, productOptions]);

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
      id: "",
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
    form.setValue("specifications", [...specifications, newSpecifications]);
  }

  function handleRemoveVolume(name: string): void {
    const specifications = form.getValues("specifications");
    const updatedSpecifications = specifications.filter(spec => spec.volume !== name);
    form.setValue("specifications", updatedSpecifications);
  }

  async function postProduct(form: UseFormReturn<FormValues>): Promise<void> {
    const formData = prepareFormData();

    const endpoint = editProduct ? "/api/admin/products/updateProduct" : "/api/admin/products/postProduct";
    const method = editProduct ? "PUT" : "POST";

    try {
      const response = await fetch(endpoint, {
        method: method,
        body: formData
      });

      if (!response.ok) throw new Error();
      if (editProduct) setEditProduct(null);
      form.reset(defaultFormValues);
      fetchProducts();
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
    formData.append("productId", editProduct?.id ?? "");

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

  async function onSubmit() {
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
              form={form}
              formSpacing={formSpacing}
              usageOptions={usageOptions}
            />
            <IsotopesField
              form={form}
              formSpacing={formSpacing}
              isotopeOptions={isotopeOptions}
            />
            <ShieldsField
              form={form}
              formSpacing={formSpacing}
              shieldOptions={shieldOptions}
            />
            <AccessoriesField
              form={form}
              formSpacing={formSpacing}
              accessoryOptions={accessoryOptions}
            />
            <VolumesField
              form={form}
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
              productOptions={productOptions.filter(product => product.id !== editProduct?.id).map(product => product.name)}
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

type UsagesFieldProps = {
  form: UseFormReturn<FormValues>;
  formSpacing: string;
  usageOptions: ProductAttribute[];
};

function UsagesField({ form, formSpacing, usageOptions }: UsagesFieldProps) {

  return (
    <FormField
      control={form.control}
      name="usages"
      render={() => (
        <FormItem className={`${formSpacing}`}>
          <FormLabel>Usages</FormLabel>
          <FormMessage/>
          <FormControl>
            <MultiSelect
              form={form}
              options={usageOptions.map(obj => obj.name)}
              type="Usages"
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

type IsotopesFieldProps = {
  form: UseFormReturn<FormValues>;
  formSpacing: string;
  isotopeOptions: ProductAttribute[];
};

function IsotopesField({ form, formSpacing, isotopeOptions }: IsotopesFieldProps) {
  return (
    <FormField
      control={form.control}
      name="isotopes"
      render={() => (
        <FormItem className={`${formSpacing}`}>
          <FormLabel>Isotopes</FormLabel>
          <FormMessage />
          <FormControl>
            <MultiSelect
              form={form}
              options={isotopeOptions.map(obj => obj.name)}
              type="Isotopes"
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

type ShieldsFieldProps = {
  form: UseFormReturn<FormValues>;
  formSpacing: string;
  shieldOptions: ProductAttribute[];
};

function ShieldsField({ form, formSpacing, shieldOptions }: ShieldsFieldProps) {
  return (
    <FormField
      control={form.control}
      name="shields"
      render={() => (
        <FormItem className={`${formSpacing}`}>
          <FormLabel>Shields</FormLabel>
          <FormMessage />
          <FormControl>
            <MultiSelect
              form={form}
              options={shieldOptions.map(obj => obj.name)}
              type="Shields"
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

type AccessoriesFieldProps = {
  form: UseFormReturn<FormValues>;
  formSpacing: string;
  accessoryOptions: ProductAttribute[];
};

function AccessoriesField({ form, formSpacing, accessoryOptions }: AccessoriesFieldProps) {
  return (
    <FormField
      control={form.control}
      name="accessories"
      render={() => (
        <FormItem className={`${formSpacing}`}>
          <FormLabel>Accessories</FormLabel>
          <FormMessage />
          <FormControl>
            <MultiSelect
              form={form}
              options={accessoryOptions.map(obj => obj.name)}
              type="Accessories"
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

type VolumesFieldProps = {
  form: UseFormReturn<FormValues>;
  volumeOptions: ProductAttribute[];
  handleRemoveVolume: (name: string) => void;
  handleAddVolume: (name: string) => void;
};

function VolumesField({ form, volumeOptions, handleRemoveVolume, handleAddVolume }: VolumesFieldProps) {
  return (
    <FormField
      control={form.control}
      name="volumes"
      render={() => (
        <FormItem>
          <FormLabel>Volumes</FormLabel>
          <FormMessage />
          <FormControl>
            <MultiSelect
              form={form}
              options={volumeOptions.map(obj => obj.name)}
              type="Volumes"
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
  productOptions: string[];
}

function RelatedProducts({ form, productOptions }: RelatedProductsProps) {

  return (
    <FormField
      control={form.control}
      name="relatedProducts"
      render={() => (
        <FormItem>
          <FormLabel>Related Products</FormLabel>
          <FormMessage />
          <FormControl>
            <MultiSelect
              form={form}
              options={productOptions}
              type="Related Products"
            />
          </FormControl>
        </FormItem>
      )}
    />
  )
}
