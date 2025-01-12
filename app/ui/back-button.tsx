"use client";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Button } from "./button";

export default function BackButton() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  if (!!params.id)
    return (
      <Button
        onClick={() => {
          router.back();
        }}
        className="bg-transparent text-lg hover:bg-gray-900 active:bg-gray-900"
      >
        <span className="mr-2.5">
          <ArrowLeftIcon width={20} height={20} />
        </span>
        Back
      </Button>
    );
  return null;
}
