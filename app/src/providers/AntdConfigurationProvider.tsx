import { ConfigProvider } from "antd";
import { PropsWithChildren } from "react";

import locale from "antd/locale/pt_BR";

export const AntdConfigurationProvider = ({ children }: PropsWithChildren) => {
  return (
    <ConfigProvider locale={locale}>
      {children}
    </ConfigProvider>
  )
}