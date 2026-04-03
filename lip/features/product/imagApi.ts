
const BASE_URL = process.env.NEXT_PUBLIC_API;

export default async function UploadFile(files: FormData) {
  console.log("This is file from fetching to upload", files);
  const data = await fetch(`${BASE_URL}/files/upload`, {
    method: "POST",

    body: files,
  });
  const fileUrls = await data.json();
  return fileUrls;
}


export async function deleteProductById(id: number | string) {
  if (!id) throw new Error("Invalid product ID");

  const res = await fetch(`${BASE_URL}/products/${id}`, 
    
    { method: "DELETE" });
 
  if (!res.ok) throw new Error(await res.text() || "Failed to delete product");

  return res.json(); // true on success
}