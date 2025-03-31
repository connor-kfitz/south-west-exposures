// "use client";

// import * as React from "react";
// import { X } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { Command as CommandPrimitive } from "cmdk";
// import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
// import { ProductAttributeTypes } from "@/types/admin-products";
// import { UseFormReturn } from "react-hook-form";
// import { FormValues } from "../admin/products/NewProductForm";
// import { toCamelCase } from "@/lib/utils";

// interface MultiSelectProps {
//   form: UseFormReturn<FormValues>;
//   options: string[];
//   type: ProductAttributeTypes;
//   addSpecification?: (name: string) => void;
//   removeSpecifcation?: (name: string) => void;
// }

// const InputComponent = CommandPrimitive.Input as React.ElementType;

// export function MultiSelect({ form, options, type, addSpecification, removeSpecifcation }: MultiSelectProps) {
//   const inputRef = React.useRef<HTMLInputElement>(null);
//   const [open, setOpen] = React.useState(false);
//   const [inputValue, setInputValue] = React.useState("");

//   const selected = form.watch(toCamelCase(type) as keyof FormValues) as string[];;

//   const handleUnselect = React.useCallback((framework: string) => {
//     const values = form.getValues(toCamelCase(type) as keyof FormValues);
//     if (Array.isArray(values) && values.every((value) => typeof value === "string")) {
//       const updatedValues = values.filter((value) => value !== framework);
//       form.setValue(toCamelCase(type) as keyof FormValues, updatedValues);
//     }
//     if (removeSpecifcation) removeSpecifcation(framework);
//   }, [form, type, removeSpecifcation]);

//   const handleKeyDown = React.useCallback(
//     (e: React.KeyboardEvent<HTMLDivElement>) => {
//       const input = inputRef.current;
//       if (input) {
//         if (e.key === "Delete" || e.key === "Backspace") {
//           if (input.value === "") {
//             const values = form.getValues(toCamelCase(type) as keyof FormValues);

//             if (Array.isArray(values)) {
//               const newValues = values.filter((v): v is string => typeof v === "string");
//               newValues.pop();
//               form.setValue(toCamelCase(type) as keyof FormValues, newValues);
//             }
//           }
//         }
//         if (e.key === "Escape") {
//           input.blur();
//         }
//       }
//     },
//     [form, type],
//   );

//   const selectables = options?.filter(
//     (framework) => !selected?.includes(framework),
//   );

//   return (
//     <Command
//       onKeyDown={handleKeyDown}
//       className="overflow-visible bg-transparent"
//     >
//       <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
//         <div className="flex flex-wrap gap-1">
//           {selected?.map((framework, index) => {
//             return (
//               <Badge key={index} variant="secondary">
//                 {framework}
//                 <button
//                   className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter") {
//                       handleUnselect(framework);
//                     }
//                   }}
//                   onMouseDown={(e) => {
//                     e.preventDefault();
//                     e.stopPropagation();
//                   }}
//                   onClick={() => handleUnselect(framework)}
//                 >
//                   <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
//                 </button>
//               </Badge>
//             );
//           })}
//           <InputComponent
//             ref={inputRef}
//             value={inputValue}
//             onValueChange={setInputValue}
//             onBlur={() => setOpen(false)}
//             onFocus={() => setOpen(true)}
//             placeholder={selected.length ? "" : `Add ${type} Before Using...`}
//             className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
//           />
//         </div>
//       </div>
//       <div className="relative mt-2">
//         <CommandList>
//           {open && selectables.length > 0 ? (
//             <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
//               <CommandGroup className="h-full overflow-auto">
//                 {selectables.map((framework, index) => {
//                   return (
//                     <CommandItem
//                       key={index}
//                       onMouseDown={(e) => {
//                         e.preventDefault();
//                         e.stopPropagation();
//                       }}
//                       onSelect={() => {
//                         setInputValue("");
//                         if (addSpecification) addSpecification(framework);
//                         const values = form.getValues(toCamelCase(type) as keyof FormValues);
//                         form.setValue(toCamelCase(type) as keyof FormValues, [...values as keyof FormValues, framework])
//                       }}
//                       className={"cursor-pointer"}
//                     >
//                       {framework}
//                     </CommandItem>
//                   );
//                 })}
//               </CommandGroup>
//             </div>
//           ) : <></>}
//         </CommandList>
//       </div>
//     </Command>
//   );
// }
