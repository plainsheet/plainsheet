"use server";

export async function submitNameFormData(formData: { name: string }) {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const succeeded = Math.random() > 0.5;

  if (succeeded) {
    return { message: formData.name };
  } else {
    return new Error("Failed to submit your name");
  }
}
