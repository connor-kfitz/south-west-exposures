export type AttributeTypes = "Shields" | "Volumes" 

export type Shield = {
  id: string;
  name: string;
}

export type Volume = {
  id: string;
  value: string;
}

export type AttributeInput = Shield | Volume;
