import type { ImageDraft } from "@/components/admin/products/ImageUploader";
import { toErpPayload } from "./erp";
import type { ProductFormValues } from "./types";

export function buildProductFormData(
  values: ProductFormValues,
  images: ImageDraft[],
  mode: "create" | "update"
) {
  const form = new FormData();
  form.append("productCode", values.productCode.trim());
  form.append("name", values.name.trim());
  form.append("title", values.title.trim());
  form.append("description", values.description.trim());
  form.append("category", values.category);
  form.append("attributes", JSON.stringify(values.attributes || []));
  form.append("infoSections", JSON.stringify(values.infoSections || []));
  form.append("erp", JSON.stringify(toErpPayload(values.erp)));
  if (mode === "update") {
    form.append(
      "existingImages",
      JSON.stringify(images.filter((image) => image.kind === "existing").map((image) => image.url))
    );
  }
  images.forEach((image) => {
    if (image.kind === "new") {
      form.append("images", image.file);
    }
  });
  return form;
}
