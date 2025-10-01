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

export async function sendEmail(name: string, email: string, phone?: string, message?: string, website?: string, product?: string) {
  try {
    const body = `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #444;">New ${product ? "Inquiry" : "Contact"} Form Submission</h2>

          <p><strong>Email:</strong> ${email}</p>
          ${website ? `<p><strong>Website:</strong> <a href="${website}" target="_blank">${website}</a></p>` : ""}
          ${product ? `<p><strong>Product:</strong> ${product}</p>` : ""}
          <p><strong>Phone:</strong> ${phone}</p>

          <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />

          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `;

    const res = await fetch('/api/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, message: body }),
    });

    if (!res.ok) {
      console.error('Email send failed with status:', res.status);
      return false;
    }

    const result = await res.json();
    return result.success ?? false;

  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}
