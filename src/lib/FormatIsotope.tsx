interface FormatIsotopeProps {
  isotope: string;
}

export default function FormatIsotope({ isotope }: FormatIsotopeProps) {
  const letters = isotope.replace(/\d/g, '');
  const digits = isotope.replace(/\D/g, '');

  if (!letters || !digits) return isotope;

  const element = letters.charAt(0).toUpperCase() + letters.slice(1).toLowerCase();

  return (
    <>
      {element}<sup>{digits}</sup>
    </>
  )
}
