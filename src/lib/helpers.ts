import { Filter as FilterValue } from "@/types/admin-products";

export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function parseIsotopeName(name: string): { element: string; mass: number } {
  const match = name.match(/^(\d+)?([A-Za-z]+)(\d+)?$/);
  if (!match) return { element: name, mass: Number.MAX_VALUE };

  const [, prefixNumber, elementPart, suffixNumber] = match;
  const element = elementPart.charAt(0).toUpperCase() + elementPart.slice(1).toLowerCase();
  const mass = parseInt(prefixNumber || suffixNumber || "", 10);

  return { element, mass: isNaN(mass) ? Number.MAX_VALUE : mass };
}

export function sortIsotopeValues(values: FilterValue[]): FilterValue[] {
  return [...values].sort((a, b) => {
    const parsedA = parseIsotopeName(a.name);
    const parsedB = parseIsotopeName(b.name);

    if (parsedA.element === parsedB.element) {
      return parsedA.mass - parsedB.mass;
    }
    return parsedA.element.localeCompare(parsedB.element);
  });
}

function parseVolumeValue(name: string): number {
  const match = name.match(/^(\d+)(\s*-\s*(\d+))?$/);
  if (!match) return Number.MAX_VALUE;

  const min = parseInt(match[1], 10);
  return isNaN(min) ? Number.MAX_VALUE : min;
}

export function sortVolumeValues(values: FilterValue[]): FilterValue[] {
  return [...values].sort((a, b) => parseVolumeValue(a.name) - parseVolumeValue(b.name));
}
