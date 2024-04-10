import { Button, ButtonProps } from "@tarojs/components";
import { ReactNode } from "react";

type TProps = {
  children: ReactNode;
  openType?: ButtonProps.OpenType;
};

export function EmptyButton({ children, openType }: TProps) {
  return (
    <Button
      plain
      style={{
        border: 0,
        padding: 0,
        margin: 0,
      }}
      openType={openType}
    >
      {children}
    </Button>
  );
}
