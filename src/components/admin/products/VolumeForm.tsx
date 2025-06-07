import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormValues, volumeFormSchema } from "./NewProductForm";

interface VolumeFormProps {
  mainForm: UseFormReturn<FormValues>;
  formSchema: typeof volumeFormSchema;
  index: number;
  formSpacing: string;
  className: string;
}

export function VolumeForm({ mainForm, index, formSpacing, className }: VolumeFormProps) {

  const fields = [
    { name: "weight", label: "Weight" },
    { name: "height", label: "Height" },
    { name: "innerDiameter", label: "Inner Diameter" },
    { name: "outerDiameter", label: "Outer Diameter" },
    { name: "shieldingSide", label: "Shielding Side" },
    { name: "shieldingSidePbEquiv", label: "Shielding Side Pb Equiv" },
    { name: "topShield", label: "Top Shield" },
    { name: "topShieldPbEquiv", label: "Top Shield Pb Equiv" },
    { name: "bottom", label: "Bottom" },
    { name: "bottomPbEquiv", label: "Bottom Pb Equiv" },
    { name: "partNumber", label: "Part Number" }
  ];

  return (
    <div className={`space-y-5 mt-4 ${formSpacing + " " + className}`}>
      {fields.map(({ name, label }) => (
        <FormField
          key={name}
          control={mainForm.control}
          name={`specifications.${index}.${name}` as keyof FormValues}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormMessage>{fieldState?.error?.message}</FormMessage>
              <Input
                type="text"
                placeholder={label}
                {...field}
                value={String(field.value)}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
              />
            </FormItem>
          )}
        />
      ))}
    </div>
  )
}
