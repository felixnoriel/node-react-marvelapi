import * as React from "react";
import { Layout } from "antd";
import { Header } from "./Header";
import "antd/dist/antd.css";

// Basic whole page component. Holds the header etc.
const Page: React.SFC<{}> = ({ children }) => (
  <Layout>
    <Header />
    <Layout.Content style={{ padding: 24, background: "white" }}>
      {children}
    </Layout.Content>
    <Layout.Footer>Copyright 2019 Marvel API</Layout.Footer>
  </Layout>
);

export default Page;
