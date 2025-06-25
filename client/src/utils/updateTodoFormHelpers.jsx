export function formatDateValues(formData) {
  let nextFormData = {
    ...formData,
  };

  if (formData.day === "Day") nextFormData.day = "";
  if (formData.month === "Month") nextFormData.month = "";
  if (formData.year === "Year") nextFormData.year = "";

  return nextFormData;
}