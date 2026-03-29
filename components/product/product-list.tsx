"use client";
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
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "@/lip/features/product/prodcuctApi";
import { MoreHorizontalIcon } from "lucide-react";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import { Dialog } from "radix-ui";
import React from "react";
import { da } from "zod/locales";

export function ProductlistClient() {
  const { data, isLoading, isSuccess, error } = useGetProductsQuery();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();



  const [selectedProduct, setSelectedProduct] = React.useState<any>(null);

  // const router = useRouter();
  const router = useRouter();

  const handleDelete = async (id: number) => {
    try {
      const data = await deleteProduct(id).unwrap();
      console.log(data);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleEdit = (id: number) => {
    router.push(`/dashboard/updateProduct/${id}`);
  };

  //  const [addProduct, { data, isLoading, isSuccess }] = useAddProductsMutation();

  console.log(data);

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
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => handleDelete(product.id)}
                    // disabled={isDeleting}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
