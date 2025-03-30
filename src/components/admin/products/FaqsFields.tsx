import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./NewProductForm";
import { ProductFaq } from "@/types/admin-products";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface FaqsFieldsProps {
  mainForm: UseFormReturn<FormValues>;
  faqs: ProductFaq[];
}

export function FaqsFields({ mainForm, faqs }: FaqsFieldsProps) {

  function addFaq(): void {
    const currentValues = mainForm.getValues("faqs");
    mainForm.setValue("faqs", [...currentValues, { question: "", answer: "" }]);
  }

  function deleteFaq(index: number): void {
    const currentValues = mainForm.getValues("faqs");
    currentValues.splice(index, 1);
    mainForm.setValue("faqs", currentValues);
  }

  return (
    <div className="grid gap-2 mb-4">
      <FormLabel>Frequently Asked Questions</FormLabel>
      {faqs.map((_, index) => (
        <div key={index} className="grid gap-2">
          <FormField
            control={mainForm.control}
            name={`faqs.${index}.question`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question</FormLabel>
                <FormMessage />
                <FormControl>
                  <div className="flex gap-x-2">
                    <Input placeholder={`Question ${index + 1}`} {...field} />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => deleteFaq(index)}
                      disabled={faqs.length === 1}
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={mainForm.control}
            name={`faqs.${index}.answer`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Answer</FormLabel>
                <FormMessage />
                <FormControl>
                  <Textarea
                    className="max-h-[80px] resize-none bg-[transparent]"
                    placeholder={`Answer ${index + 1}`} {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      ))}
      <Button
        type="button"
        variant="secondary"
        size="sm"
        onClick={addFaq}
        className="flex items-center gap-2"
      >
        <Plus className="w-4 h-4" /> Add FAQ
      </Button>
    </div>
  );
}
