import { Button, ButtonProps, View } from "@tarojs/components";
import { FC } from "react";

interface TProps extends ButtonProps {}

export const EmptyButton: FC<TProps> = ({ children, openType, ...args }) => {
  return (
    <View {...args}>
      <Button
        plain
        style={{
          border: 0,
          padding: 0,
        }}
        openType={openType}
      >
        {children}
      </Button>
    </View>
  );
};
