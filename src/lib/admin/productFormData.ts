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
  (values.erp.primarySubVariants || []).forEach((row, index) => {
    (row.drafts || []).forEach((draft) => {
      form.append(`primarySubImage_${index}`, draft.file);
    });
  });
  if (values.erp.variant === "Yes") {
    values.erp.variantDetails.forEach((row, index) => {
      (row.drafts || []).forEach((draft) => {
        form.append(`variantImage_${index}`, draft.file);
      });
      (row.subVariants || []).forEach((sub, subIndex) => {
        (sub.drafts || []).forEach((draft) => {
          form.append(`subImage_${index}_${subIndex}`, draft.file);
        });
      });
    });
  }
  return form;
}
