"use client";

import { Copy, Link } from "lucide-react";

import { IconButton } from "@/components/button";
import { InputField, InputIcon, InputRoot } from "@/components/input";

interface InviteLinkInputProps {
  inviteLink: string;
}

export function InviteLinkInput({ inviteLink }: InviteLinkInputProps) {
  function handleCopyInviteLink() {
    navigator.clipboard.writeText(inviteLink);
  }

  return (
    <InputRoot>
      <InputIcon>
        <Link className="size-5" />
      </InputIcon>

      <InputField readOnly defaultValue={inviteLink} />

      <IconButton className="-mr-2" onClick={handleCopyInviteLink}>
        <Copy className="size-5" />
      </IconButton>
    </InputRoot>
  );
}
