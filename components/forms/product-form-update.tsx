"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
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

import { useUpdateProductMutation } from "@/lip/features/product/prodcuctApi";

import { productRequst, productResponse } from "@/lip/types/productType";

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(100, "Description must be at most 100 characters."),
});
type Props = {
  product: productResponse;
};

export function UpdateProductForm({ product }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: product.title,
      description: product.description,
    },
  });

  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const updatedProduct: productRequst = {
      title: values.title,
      description: values.description,
      price: product.price,
      categoryId: product.category.id,
      images: product.images,
    };

    try {
      await updateProduct({
        id: product.id,
        data: updatedProduct,
      }).unwrap();

      toast.success("Product updated 🎉");
    } catch (err) {
      console.error(err);
      toast.error("Update failed ❌");
    }
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Edit Product</CardTitle>
      </CardHeader>

      <CardContent>
        <form id="update-product-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Title</FieldLabel>
                  <Input {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Description</FieldLabel>

                  <InputGroup>
                    <InputGroupTextarea {...field} rows={5} />
                    <InputGroupAddon align="block-end">
                      <InputGroupText>{field.value.length}/100</InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="price"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Price</FieldLabel>
                  <Input {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        <Button type="submit" form="update-product-form" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update Product"}
        </Button>
      </CardFooter>
    </Card>
  );
}
