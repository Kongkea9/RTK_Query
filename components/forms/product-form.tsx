// "use client";
// import {
//   Select,
//   SelectTrigger,
//   SelectContent,
//   SelectItem,
//   SelectValue,
// } from "@/components/ui/select";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { Controller, useForm } from "react-hook-form";
// import { toast } from "sonner";
// import * as z from "zod";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Field,
//   FieldDescription,
//   FieldError,
//   FieldGroup,
//   FieldLabel,
// } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
// import {
//   InputGroup,
//   InputGroupAddon,
//   InputGroupText,
//   InputGroupTextarea,
// } from "@/components/ui/input-group";
// import { useAddProductsMutation } from "@/lip/features/product/prodcuctApi";
// import { useGetCategoriesQuery } from "@/lip/features/product/categoryApi";
// import { productRequst } from "@/lip/types/productType";
// import UploadFile from "@/lip/features/product/imagApi";
// import ImageUpload, { ImageFile } from "./image-form";

// const productSchema = z.object({
//   title: z
//     .string()
//     .min(5, "Title must be at least 5 characters")
//     .max(32, "Title must be at most 32 characters"),
//   description: z
//     .string()
//     .min(20, "Description must be at least 20 characters")
//     .max(100, "Description must be at most 100 characters"),
//   price: z.coerce.number().positive("Price must be greater than 0"),
//   categoryId: z.string().min(1, "Category is required"),
//   images: z
//     .array(
//       z.object({
//         id: z.string(),
//         file: z.instanceof(File).optional(), 
//         preview: z.string(),
//       }),
//     )
//     .nonempty("Must provide at least one image"),
// });

// export function ProductForm() {
//   const form = useForm<z.infer<typeof productSchema>>({
//     resolver: zodResolver(productSchema),
//     defaultValues: {
//       title: "ddddddddddddddddd",
//       price: 10,
//       description: "dddddddddddddddddddddddddddddddddd",
//       categoryId: "1",
//       images: [],
//     },
//   });

//   const [addProduct, { isLoading }] = useAddProductsMutation();
//   const { data: categories } = useGetCategoriesQuery();

//   async function onSubmit(data: z.infer<typeof productSchema>) {
//     try {
//       // assume only one file
//       const formData = new FormData();
//       formData.append("file", data.images[0].file); 

//       const res = await UploadFile(formData); 
//       const imageUrl = res.location; 

//       const payload = {
//         ...data,
//         categoryId: Number(data.categoryId),
//         images: [imageUrl],
//       };

//       const uploadedProduct = await addProduct(payload).unwrap();
//       toast.success("Product created successfully!");
//       form.reset();
//       console.log("Created Product:", uploadedProduct);
//     } catch (err: any) {
//       console.error("Error creating product:", err);
//       toast.error(err?.message || "Something went wrong");
//     }
//   }
//   return (
//     <Card className="w-full sm:max-w-md">
//       <CardHeader>
//         <CardTitle>Add Product</CardTitle>
//         <CardDescription>
//           Fill out the details below to add a new product.
//         </CardDescription>
//       </CardHeader>

//       <CardContent>
//         <form id="form-product" onSubmit={form.handleSubmit(onSubmit)}>
//           <FieldGroup>
//             <Controller
//               name="title"
//               control={form.control}
//               render={({ field, fieldState }) => (
//                 <Field data-invalid={fieldState.invalid}>
//                   <FieldLabel htmlFor="title">Product Title</FieldLabel>
//                   <Input
//                     {...field}
//                     id="title"
//                     placeholder="Nike Dunk Next Nature"
//                     autoComplete="off"
//                   />
//                   {fieldState.invalid && (
//                     <FieldError errors={[fieldState.error]} />
//                   )}
//                 </Field>
//               )}
//             />

//             {/* Price */}
//             <Controller
//               name="price"
//               control={form.control}
//               render={({ field, fieldState }) => (
//                 <Field data-invalid={fieldState.invalid}>
//                   <FieldLabel htmlFor="price">Price</FieldLabel>
//                   <Input
//                     {...field}
//                     id="price"
//                     type="number"
//                     placeholder="30"
//                     onChange={(e) => field.onChange(Number(e.target.value))}
//                   />
//                   {fieldState.invalid && (
//                     <FieldError errors={[fieldState.error]} />
//                   )}
//                 </Field>
//               )}
//             />

//             {/* Description */}
//             <Controller
//               name="description"
//               control={form.control}
//               render={({ field, fieldState }) => (
//                 <Field data-invalid={fieldState.invalid}>
//                   <FieldLabel htmlFor="description">Description</FieldLabel>
//                   <InputGroup>
//                     <InputGroupTextarea
//                       {...field}
//                       id="description"
//                       placeholder="Describe the product..."
//                       rows={6}
//                       className="min-h-24 resize-none"
//                     />
//                     <InputGroupAddon align="block-end">
//                       <InputGroupText className="tabular-nums">
//                         {field.value.length}/100 characters
//                       </InputGroupText>
//                     </InputGroupAddon>
//                   </InputGroup>
//                   <FieldDescription>
//                     Include product details and features.
//                   </FieldDescription>
//                   {fieldState.invalid && (
//                     <FieldError errors={[fieldState.error]} />
//                   )}
//                 </Field>
//               )}
//             />
//             <Controller
//               control={form.control}
//               name="categoryId"
//               render={({ field, fieldState }) => (
//                 <Field data-invalid={fieldState.invalid}>
//                   <FieldLabel className="flex w-auto! mt-3">
//                     Category
//                   </FieldLabel>

//                   <Select
//                     value={field.value ? String(field.value) : ""}
//                     onValueChange={(val) => field.onChange(val)}
//                   >
//                     <SelectTrigger className="w-full">
//                       <SelectValue placeholder="Select category" />
//                     </SelectTrigger>

//                     <SelectContent className="w-[--radix-select-trigger-width]">
//                       {categories?.map((cate) => (
//                         <SelectItem key={cate.id} value={String(cate.id)}>
//                           {cate.name}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>

//                   {fieldState.error && (
//                     <FieldError errors={[fieldState.error]} />
//                   )}
//                 </Field>
//               )}
//             />
//             <Controller
//               control={form.control}
//               name="images"
//               render={({ field, fieldState }) => (
//                 <Field data-invalid={fieldState.invalid}>
//                   <FieldLabel className="flex w-auto! mt-3">Images</FieldLabel>

//                   <ImageUpload
//                     images={field.value as ImageFile[]}
//                     onImagesChange={(imgs) => field.onChange(imgs)} 
//                   />
//                 </Field>
//               )}
//             />
//           </FieldGroup>
//         </form>
//       </CardContent>

//       <CardFooter>
//         <Field orientation="horizontal">
//           <Button type="button" variant="outline" onClick={() => form.reset()}>
//             Reset
//           </Button>
//           <Button type="submit" disabled={isLoading} form="form-product">
//             {isLoading ? "Submitting..." : "Submit"}
//           </Button>
//         </Field>
//       </CardFooter>
//     </Card>
//   );
// }





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
  CardDescription,
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
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { useAddProductsMutation, useUpdateProductMutation } from "@/lip/features/product/prodcuctApi";
import { useGetCategoriesQuery } from "@/lip/features/product/categoryApi";
import UploadFile from "@/lip/features/product/imagApi";
import ImageUpload, { ImageFile } from "./image-form";

import { productRequst, productResponse } from "@/lip/types/productType";

const productSchema = z.object({
  title: z.string().min(5).max(32),
  description: z.string().min(10).max(100),
  price: z.coerce.number().positive(),
  categoryId: z.string().min(1),
  images: z.array(
    z.object({
      id: z.string(),
      file: z.instanceof(File).optional(),
      preview: z.string(),
    })
  ).nonempty("Must provide at least one image"),
});

type ProductFormProps = {
  product?: productResponse;
};

export function ProductForm({ product }: ProductFormProps) {
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: product?.title || "",
      description: product?.description || "",
      price: product?.price || 0,
      categoryId: product?.category.id.toString() || "",
      images: product?.images.map((url, index) => ({
        id: `img-${index}`,
        file: undefined,
        preview: url,
      })) || [],
    },
  });

  const { data: categories } = useGetCategoriesQuery();
  const [addProduct, { isLoading: isAdding }] = useAddProductsMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const onSubmit = async (data: z.infer<typeof productSchema>) => {
    try {
   
      const imageUrls = await Promise.all(
        data.images.map(async (img) => {
          if (img.file) {
            const formData = new FormData();
            formData.append("file", img.file);
            const res = await UploadFile(formData);
            return res.location;
          }
          return img.preview; 
        })
      );

      const payload: productRequst = {
        title: data.title,
        description: data.description,
        price: Number(data.price),
        categoryId: Number(data.categoryId),
        images: imageUrls,
      };

      if (product) {
      
        await updateProduct({ id: product.id, data: payload }).unwrap();
        toast.success("Product updated successfully!");
      } else {
     
        await addProduct(payload).unwrap();
        toast.success("Product created successfully!");
        form.reset();
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Something went wrong");
    }
  };

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>{product ? "Edit Product" : "Add Product"}</CardTitle>
        {!product && <CardDescription>Fill out the details below to add a new product.</CardDescription>}
      </CardHeader>

      <CardContent>
        <form id="product-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* Title */}
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="title">Title</FieldLabel>
                  <Input {...field} id="title" placeholder="Product title" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="price"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="price">Price</FieldLabel>
                  <Input {...field} id="price" type="number" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

   
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="description">Description</FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea {...field} id="description" rows={5} />
                    <InputGroupAddon align="block-end">
                      <InputGroupText>{field.value.length}/100</InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

        
            <Controller
              name="categoryId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Category</FieldLabel>
                  <Select value={field.value || ""} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((cate) => (
                        <SelectItem key={cate.id} value={String(cate.id)}>
                          {cate.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

 
            <Controller
              name="images"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Images</FieldLabel>
                  <ImageUpload
                    images={field.value}
                    onImagesChange={(imgs) => field.onChange(imgs)}
                  />
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        <Button type="submit" form="product-form" disabled={isAdding || isUpdating}>
          {isAdding || isUpdating
            ? product
              ? "Updating..."
              : "Submitting..."
            : product
            ? "Update Product"
            : "Create Product"}
        </Button>
      </CardFooter>
    </Card>
  );
}