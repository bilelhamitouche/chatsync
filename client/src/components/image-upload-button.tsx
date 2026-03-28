import { Button, FileUpload } from "@chakra-ui/react";
import { ImageUploadList } from "./image-upload-list";
import { LuFileImage } from "react-icons/lu";

export default function ImageUploadButton() {
  return (
    <FileUpload.Root accept="image/*">
      <ImageUploadList />
      <FileUpload.HiddenInput />
      <FileUpload.Trigger asChild>
        <Button variant="subtle">
          <LuFileImage />
        </Button>
      </FileUpload.Trigger>
    </FileUpload.Root>
  );
}
