"use client";

import { useCallback, useEffect } from "react";
import { useState } from "react";
import { RenderError } from "next/dist/next-devtools/dev-overlay/container/runtime-error/render-error";
import { cn } from "@/lib/utils";
import { FileRejection, useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { Card, CardContent } from "../ui/card";
import {
  RenderEmptyState,
  RenderErrorState,
  RenderUploadedState,
  RenderUploadingState,
} from "./render-state";

interface UploaderStateProps {
  id: string | null;
  file: File | null;
  uploading: boolean;
  progress: number;
  key?: string;
  isDeleting: boolean;
  error: boolean;
  objectUrl?: string;
  fileType: "image" | "video";
}

interface UploaderProps {
  value?: string;
  onChange?: (value: string) => void;
}

export function Uploader({ value, onChange }: UploaderProps) {
  const [fileState, setFileState] = useState<UploaderStateProps>({
    id: null,
    file: null,
    uploading: false,
    error: false,
    progress: 0,
    isDeleting: false,
    fileType: "image",
    key: value,
  });

  async function uploadFile(file: File) {
    setFileState((prev) => ({
      ...prev,
      uploading: true,
      progress: 0,
    }));

    try {
      const presignedResponse = await fetch("/api/s3/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: file.name,
          contentType: file.type,
          size: file.size,
          isImage: true,
        }),
      });

      if (!presignedResponse.ok) {
        toast.error("Failed to generate presigned URL");
        setFileState((prev) => ({
          ...prev,
          uploading: false,
          error: true,
        }));
        return;
      }

      const { presignedUrl, key } = await presignedResponse.json();

      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const progress = Math.round((event.loaded / event.total) * 100);
            setFileState((prev) => ({
              ...prev,
              progress,
            }));
          }
        };
        xhr.onload = () => {
          if (xhr.status === 200 || xhr.status === 204) {
            setFileState((prev) => ({
              ...prev,
              uploading: false,
              progress: 100,
              key,
            }));

            onChange?.(key);

            toast.success("File uploaded successfully");
            resolve();
          } else {
            reject(new Error(`Upload failed: ${xhr.statusText}`));
          }
        };

        xhr.onerror = () => {
          reject(new Error("Network error during upload"));
        };

        xhr.open("PUT", presignedUrl);
        xhr.setRequestHeader("Content-Type", file.type);
        xhr.send(file);
      });
    } catch (error) {
      toast.error("Failed to generate presigned URL");
      setFileState((prev) => ({
        ...prev,
        progress: 0,
        uploading: false,
        error: true,
      }));
    }
  }

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];

        if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
          URL.revokeObjectURL(fileState.objectUrl);
        }

        setFileState({
          file: file,
          uploading: false,
          progress: 0,
          objectUrl: URL.createObjectURL(file),
          error: false,
          id: uuidv4(),
          isDeleting: false,
          fileType: file.type.startsWith("image/") ? "image" : "video",
        });

        uploadFile(file);
      }
    },
    [fileState.objectUrl],
  );

  async function handleRemoveFile() {
    if (fileState.isDeleting && !fileState.objectUrl) return;

    try {
      setFileState((prev) => ({
        ...prev,
        isDeleting: true,
      }));

      const response = await fetch("/api/s3/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: fileState.key,
        }),
      });

      if (!response.ok) {
        toast.error("Failed to remove file from storage");
        setFileState((prev) => ({
          ...prev,
          isDeleting: true,
          error: true,
        }));
        return;
      }

      if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
        URL.revokeObjectURL(fileState.objectUrl);
      }

      onChange?.("");

      setFileState((prev) => ({
        ...prev,
        file: null,
        uploading: false,
        progress: 0,
        objectUrl: undefined,
        error: false,
        id: null,
        isDeleting: false,
        fileType: "image",
      }));

      toast.success("File deleted successfully");
    } catch (error) {
      toast.error("Failed to remove file. Please try again later.");

      setFileState((prev) => ({
        ...prev,
        error: true,
        isDeleting: false,
      }));
    }
  }

  function rejectedFiles(files: FileRejection[]) {
    if (files.length > 0) {
      const tooManyFiles = files.find(
        (file) => file.errors[0].code === "too_many_files",
      );
      if (tooManyFiles) {
        toast.error("Too many files selected, only 1 file is allowed");
      }
      const fileTooLarge = files.find(
        (file) => file.errors[0].code === "file_too_large",
      );
      if (fileTooLarge) {
        toast.error("File too large, maximum file size is 10MB");
      }
      const fileInvalidType = files.find(
        (file) => file.errors[0].code === "file_invalid_type",
      );
      if (fileInvalidType) {
        toast.error("Invalid file type, only PNG, JPG, JPEG are allowed");
      }
    }
  }

  function renderContent() {
    if (fileState.uploading) {
      return (
        <RenderUploadingState
          progress={fileState.progress}
          file={fileState.file as File}
        />
      );
    }

    if (fileState.error) {
      return <RenderErrorState />;
    }

    if (fileState.objectUrl) {
      return (
        <RenderUploadedState
          previewUrl={fileState.objectUrl}
          isDeleting={fileState.isDeleting}
          handleRemoveFile={handleRemoveFile}
        />
      );
    }

    return <RenderEmptyState isDragActive={isDragActive} />;
  }

  useEffect(() => {
    return () => {
      if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
        URL.revokeObjectURL(fileState.objectUrl);
      }
    };
  }, [fileState.objectUrl]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
    },
    maxFiles: 1,
    multiple: false,
    maxSize: 10 * 1024 * 1024,
    onDropRejected: rejectedFiles,
    disabled: fileState.uploading || !!fileState.objectUrl,
  });

  return (
    <Card
      {...getRootProps()}
      className={cn(
        "relative border-2 border-dashed transition-colors duration-200 ease-in-out w-full h-64",
        isDragActive
          ? "border-primary bg-primary/10 border-solid  "
          : "border-border hover:border-primary",
      )}
    >
      <CardContent className="flex items-center justify-center h-full w-full p-4">
        <input {...getInputProps()} />
        {renderContent()}
      </CardContent>
    </Card>
  );
}
