export type AttributeTypes = "Shields" | "Volumes" | "Isotopes" 

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

export type AttributeInput = Shield | Volume | Isotope;
