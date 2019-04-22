import { Card, Button, Table, Modal } from "antd";
import * as React from "react";
import { connect } from "react-redux";
import Page from "../page/Page";
import { RootState } from "../store";
import { Dispatch } from "redux";
import { getList, getObject, resetData } from "../store/default/state";
import "./List.scss";

type ListOwnProps = {
  entityType: string;
  list?: Array<any>;
};

type ListReduxProps = {
  getList: (entityType: string) => any;
  getObject: (entityType: string, entityId: number) => any;
  resetData: () => any;
  loadingList: boolean;
};

type ListProps = ListOwnProps & ListReduxProps;

const List: React.SFC<ListProps> = ({
  entityType,
  list,
  getList,
  getObject,
  resetData,
  loadingList
}) => {
  const [showSingleObject, setShowSingleObject] = React.useState(false);
  const [selectedSingleObject, setSelectedSingleObject] = React.useState({});
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title"
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description"
    },
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (record: any) => {
        const thumbnailUrl = `${record.path}.${record.extension}`;
        return <img className="thumbnail" src={thumbnailUrl} />;
      }
    }
  ];

  React.useEffect(() => {
    getList(entityType);

    // component will unmount
    // reset the state / data
    return () => {
      resetData();
    };
  }, []);

  const onRowClick = (record: any) => {
    setShowSingleObject(true);
    setSelectedSingleObject(record);
  };

  return (
    <Page>
      <div className="table-wrapper">
        <h1> {entityType} </h1>
        <Table
          bordered
          loading={loadingList}
          dataSource={list}
          onRowClick={onRowClick}
          rowKey={record => record.id!}
          columns={columns}
          pagination={{
            position: "bottom"
          }}
        />
        <SingleObject
          singleObject={selectedSingleObject}
          visible={showSingleObject}
        />
      </div>
    </Page>
  );
};

type SingleObjectProps = {
  singleObject?: any;
  visible: boolean;
};

const SingleObject: React.SFC<SingleObjectProps> = ({
  visible,
  singleObject
}) => {
  console.log(singleObject);
  return <Modal title={singleObject.title} visible={visible} width={750} />;
};

const mapStateToProps = (state: RootState) => {
  return {
    list: state.reducer.list,
    loadingList: state.reducer.loadingList,
    loadingSingleObject: state.reducer.loadingSingleObject,
    singleObject: state.reducer.singleObject
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getList: (entityType: string) => dispatch(getList(entityType) as any),
    getObject: (entityType: string, entityId: number) =>
      dispatch(getObject(entityType, entityId) as any),
    resetData: () => dispatch(resetData() as any)
  };
};

const ConnectedList = connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
export default ConnectedList;
