import { Volume } from "@/types/admin-products";
import { useState, useEffect } from "react";

interface useVolumesReturn {
  volumes: Volume[];
  loading: boolean;
  error: string;
  addError: string;
  postVolume: (value?: string) => Promise<boolean>;
  deleteVolume: (id: string) => Promise<boolean>;
}

export function useVolumes(): useVolumesReturn {
  const [volumes, setVolumes] = useState<Volume[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [addError, setAddError] = useState<string>("");

  useEffect(() => {
    fetchVolumes();
  },[]);

  async function fetchVolumes(): Promise<void> {
    try {
      const response = await fetch("/api/admin/products/getVolumes");
      if (!response.ok) throw new Error(`${response.status}`);
      const volumes = await response.json();
      setVolumes(volumes);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  }

  async function postVolume(value?: string): Promise<boolean> {
    try {
      console.log(value)
      const response = await fetch("/api/admin/products/postVolume", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: value })
      });
      if (!response.ok) throw new Error(`${response.status}`);
      await fetchVolumes();
      setAddError("");
      return true;
    } catch (error) {
      if (error instanceof Error) {
        const statusCode = parseInt(error.message, 10);
        switch (statusCode) {
          case 400:
            setAddError("Volume value is required");
            break;
          case 409:
            setAddError("Duplicate value");
            break;
        }
      }
      return false;
    }
  }

  async function deleteVolume(id: string): Promise<boolean> {
    if (!id) return false;
    try {
      const response = await fetch(`/api/admin/products/deleteVolume/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error(`${response.status}`);
      await fetchVolumes();
      return true;
    } catch {
      return false;
    }
  }

  return {
    volumes,
    loading,
    error,
    addError,
    postVolume,
    deleteVolume
  }
}
