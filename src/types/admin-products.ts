export type AttributeTypes = "Shields" | "Volumes" | "Isotopes" | "Accessories" | "Usages";

export type Shield = {
  id: string;
  name: string;
}

export type Volume = {
  id: string;
  value: string;
}

export type Isotope = {
  id: string;
  name: string;
}

export type Accessory = {
  id: string;
  name: string;
}

export type Usage = {
  id: string;
  name: string;
}

export type AttributeInput = Shield | Volume | Isotope | Accessory | Usage;
