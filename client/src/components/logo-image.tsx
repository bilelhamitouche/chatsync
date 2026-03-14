import type { ComponentPropsWithoutRef } from "react";
import logoImage from "../assets/chatsync-logo.svg";

interface LogoImageProps extends ComponentPropsWithoutRef<"img"> {}

export default function LogoImage({ ...props }: LogoImageProps) {
  return <img src={logoImage} alt="Logo image" {...props} />;
}
