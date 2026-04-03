"use client";
import ProductDeleteItem from "@/app/dashboard/deleteProduct/page";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteProductById } from "@/lip/features/product/imagApi";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "@/lip/features/product/prodcuctApi";
import { MoreHorizontalIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { Dialog } from "radix-ui";
import React from "react";
import { toast } from "sonner";
import { da } from "zod/locales";

export function ProductlistClient() {
  const { data, isLoading, isSuccess, error } = useGetProductsQuery();

  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async (id: number) => {
    try {
      console.log("id: ", id);
      const response = await deleteProduct(id).unwrap();
      console.log("delete: ", response);
      if (response) {
        toast.success("Product deleted successfully");
      } else {
        toast.error("Failed to delete product");
      }
    } catch (err: any) {
      console.error("Delete failed", err);
      toast.error(err?.data?.message || "Failed to delete");
    }
  };
  const [selectedProduct, setSelectedProduct] = React.useState<any>(null);

  const router = useRouter();

  const handleEdit = (id: number) => {
    router.push(`/dashboard/updateProduct/${id}`);
  };


  console.log(data);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium">{product.title}</TableCell>
            <TableCell>${product.price}</TableCell>
            <TableCell>{product.category.name}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-8">
                    <MoreHorizontalIcon />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleEdit(product.id)}>
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuSeparator />
              

                  <ProductDeleteItem
                    productId={product.id}
                    onDelete={handleDelete}
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
