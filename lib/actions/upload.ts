"use server"

import cloudinary from "@/lib/cloudinary";

export async function uploadToCloudinary(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file) {
      console.error("No file found in formData");
      return { error: "No file provided" };
    }

    console.log(`Processing upload for file: ${file.name}, size: ${file.size} bytes`);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "university-portal/passports",
          resource_type: "auto",
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload stream error:", error);
            reject(error);
          } else {
            console.log("Cloudinary upload successful:", result?.secure_url);
            resolve(result);
          }
        }
      );
      uploadStream.end(buffer);
    });

    return (result as any).secure_url;
  } catch (error: any) {
    console.error("Detailed Server Action Error:", error);
    // Return a structured error so the client can handle it instead of a generic 500
    return { 
      error: error.message || "Failed to upload to Cloudinary",
      details: error.toString()
    };
  }
}
