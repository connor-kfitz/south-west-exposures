import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormValues, volumeFormSchema } from "./NewProductForm";
import { useEffect, useMemo } from "react";

interface VolumeFormProps {
  mainForm: UseFormReturn<FormValues>;
  formSchema: typeof volumeFormSchema;
  index: number;
  formSpacing: string;
  className: string;
}

export function VolumeForm({ mainForm, index, formSpacing, className }: VolumeFormProps) {
  const values = useMemo(() => mainForm.watch(`specifications.${index}`), [mainForm, index]);

  useEffect(() => {
    if (values) {
      mainForm.reset(
        {
          ...mainForm.getValues(),
          specifications: mainForm.getValues().specifications.map((spec, i) =>
            i === index ? values : spec
          ),
        },
        {
          keepErrors: true,
          keepDirty: true,
          keepTouched: true
        }
      );
    }
  }, [values, mainForm, index]);

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
