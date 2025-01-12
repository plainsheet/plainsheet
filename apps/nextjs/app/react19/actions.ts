"use server";

export async function submitNameFormData(formData: { name: string }) {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return { message: formData.name };
}
