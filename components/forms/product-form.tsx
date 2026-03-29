

"use client";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { useAddProductsMutation } from "@/lip/features/product/prodcuctApi";
import { useGetCategoriesQuery } from "@/lip/features/product/categoryApi";
import { productRequst } from "@/lip/types/productType";
import { useUploadFileMutation } from "@/lip/features/product/imagApi";
import ImageUpload from "./image-form";

const productSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(32, "Title must be at most 32 characters"),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(100, "Description must be at most 100 characters"),
  price: z.coerce.number().positive("Price must be greater than 0"),
  categoryId: z.string().min(1, "Category is required"),
  images: z.array(z.string()).nonempty("Must provide at least one image"),
});

export function ProductForm() {
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      price: 0,
      description: "",
      categoryId: "",
      images: [],
    },
  });

  const [addProduct, { isLoading }] = useAddProductsMutation();
  const { data: categories } = useGetCategoriesQuery();
  const [uploadFile] = useUploadFileMutation();

  console.log("cate: " + categories);
  async function onSubmit(data: z.infer<typeof productSchema>) {
    try {
      let uploadedUrls: string[] = [];

  
      if (data.images && data.images.length > 0 && data.images[0]) {
        for (const file of data.images as unknown as File[]) {
          const formData = new FormData();
          formData.append("files", file);

          const result = await uploadFile(formData).unwrap();
          uploadedUrls.push(...result.urls);
        }
      } else {

        uploadedUrls = data.images as string[];
      }

   
      const payload: z.infer<typeof productSchema> = {
        ...data,
        images: uploadedUrls,
        categoryId: data.categoryId, 
      };

      const response = await addProduct(payload).unwrap();

      if (response.id) {
        toast.success("Product created successfully!");
        form.reset();
      } else {
        toast.error("Failed to create product");
      }
    } catch (err) {
      console.error("Error creating product:", err);
      toast.error("Something went wrong");
    }
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Add Product</CardTitle>
        <CardDescription>
          Fill out the details below to add a new product.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form id="form-product" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="title">Product Title</FieldLabel>
                  <Input
                    {...field}
                    id="title"
                    placeholder="Nike Dunk Next Nature"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Price */}
            <Controller
              name="price"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="price">Price</FieldLabel>
                  <Input
                    {...field}
                    id="price"
                    type="number"
                    placeholder="30"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Description */}
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="description">Description</FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="description"
                      placeholder="Describe the product..."
                      rows={6}
                      className="min-h-24 resize-none"
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value.length}/100 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <FieldDescription>
                    Include product details and features.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="categoryId"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="flex w-auto! mt-3">
                    Category
                  </FieldLabel>

                  <Select
                    value={field.value ? String(field.value) : ""}
                    onValueChange={(val) => field.onChange(val)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>

                    <SelectContent className="w-[--radix-select-trigger-width]">
                      {categories?.map((cate) => (
                        <SelectItem key={cate.id} value={String(cate.id)}>
                          {cate.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="images"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="flex w-auto! mt-3">Images</FieldLabel>

                  <ImageUpload
                    images={(field.value as string[]).map((url, index) => ({
                      id: `img-${index}`, // unique id for the component
                      file: null, // no actual File, just URL
                      preview: url, // preview is the URL itself
                    }))}
                    onImagesChange={(imgs) =>
                      // convert back to strings when updating the form value
                      field.onChange(imgs.map((img) => img.preview))
                    }
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" disabled={isLoading} form="form-product">
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
