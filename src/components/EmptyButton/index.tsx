import { Button, ButtonProps } from "@tarojs/components";
import { FC } from "react";

interface TProps extends ButtonProps {}

export const EmptyButton: FC<TProps> = ({ children, openType, ...args }) => {
  return (
    <Button
      plain
      style={{
        border: 0,
        padding: 0,
      }}
      openType={openType}
      {...args}
    >
      {children}
    </Button>
  );
};
