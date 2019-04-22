import * as React from "react";
import { connect } from "react-redux";
import { Layout, Menu, Row, Col } from "antd";
import Link from "next/link";
import * as _ from "lodash";
import Router from "next/router";
import { withRouter, WithRouterProps } from "next/router";

import { RootState } from "../store";

import "./Header.scss";

type Props = {} & WithRouterProps;

function currentPath(router: any): string {
  return (router || {}).pathname || "";
}

export const Header: React.SFC<Props> = ({ router }) => {
  console.log(currentPath(router));
  return (
    <Layout.Header>
      <Row type="flex" justify="space-between">
        <Col span={3}>
          <div className="logo" />
          <h1 className="logo-text">BöB</h1>
        </Col>
        <Col span={19}>
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[currentPath(router)]}
            style={{ lineHeight: "64px" }}
          >
            <Menu.Item title="Comics" key="/">
              <Link href="/">
                <a>Comics</a>
              </Link>
            </Menu.Item>
            <Menu.Item title="Characters" key="/characters">
              <Link href="/characters">
                <a>Characters</a>
              </Link>
            </Menu.Item>
            <Menu.Item title="Events" key="/events">
              <Link href="/events">
                <a>Events</a>
              </Link>
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
    </Layout.Header>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    ...state
  };
};

export const HeaderConnected = connect(mapStateToProps)(withRouter(Header));
