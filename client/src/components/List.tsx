import { Card, Input, Icon, Row, Col, Button, Table, Modal } from "antd";
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
  getList: (entityType: string, searchText?: string) => any;
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
      title: "Thumbnail",
      dataIndex: "thumbnail",
      key: "thumbnail",
      width: 100,
      render: (record: any) => {
        if (!record) {
          return;
        }
        const thumbnailUrl = `${record.path}.${record.extension}`;
        return RenderThumbnail(thumbnailUrl);
      }
    },
    {
      title: "Title",
      dataIndex: "",
      key: "title",
      width: 200,
      sorter: (a: any, b: any) => {
        return a.title.localeCompare(b.title);
      },
      render: (record: any) => {
        return RenderTitle(record);
      }
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      sorter: (a: any, b: any) => {
        return a.title.localeCompare(b.title);
      },
      render: (description: string) => {
        return RenderDescription(description);
      }
    },
    {
      title: "",
      dataIndex: "",
      key: "info",
      width: 50,
      render: (record: any) => {
        return (
          <Icon
            style={{ fontSize: "20px" }}
            type="info-circle"
            theme="twoTone"
          />
        );
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

  const onSearchClick = (value: string) => {
    getList(entityType, value);
  };
  const onRowClick = (record: any) => {
    setShowSingleObject(true);
    setSelectedSingleObject(record);
  };

  const onModalClose = () => {
    setShowSingleObject(false);
    setTimeout(() => {
      setSelectedSingleObject({});
    }, 500);
  };

  return (
    <Page>
      <div className="table-wrapper">
        <h1> {entityType} </h1>
        {RenderSearchButton(onSearchClick)}
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
        <ModalSingleObjectInfo
          onClose={onModalClose}
          singleObject={selectedSingleObject}
          visible={showSingleObject}
        />
      </div>
    </Page>
  );
};

const RenderThumbnail = (url: string) => {
  return <img className="thumbnail" src={url} />;
};

type ModalSingleObjectInfoProps = {
  singleObject?: any;
  visible: boolean;
  onClose: () => any;
};

const ModalSingleObjectInfo: React.SFC<ModalSingleObjectInfoProps> = ({
  visible,
  singleObject,
  onClose
}) => {
  if (!singleObject && !singleObject.title && !visible) {
    return <div />;
  }
  const thumbnailUrl =
    singleObject.thumbnail &&
    `${singleObject.thumbnail.path}.${singleObject.thumbnail.extension}`;
  return (
    <Modal
      onCancel={onClose}
      footer={[<Button onClick={onClose}>Close</Button>]}
      title={RenderTitle(singleObject)}
      visible={visible}
      width={750}
    >
      <div className="single-object-info">
        <Row>
          <Col span={6}>{RenderThumbnail(thumbnailUrl)}</Col>
          <Col span={18}>
            {RenderDescription(singleObject.description)}
            {RenderGenericItem("next", singleObject.next)}
            {RenderGenericItem("previous", singleObject.previous)}
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

const RenderSearchButton = (onSearchClick: (value: string) => any) => {
  return (
    <div className="search">
      <Input.Search
        placeholder="input search text"
        onSearch={value => onSearchClick(value)}
        size="large"
        enterButton
      />
    </div>
  );
};
const RenderDescription = (description: string) => {
  if (!description || description === "") {
    description = "No description found";
  }
  return <p className="description">{description}</p>;
};

const RenderTitle = (object: any) => {
  let title = "";
  if (object.title && object.title !== "") {
    title = object.title;
  }
  if (object.fullName && object.fullName !== "") {
    title = object.fullName;
  }
  if (object.name && object.name !== "") {
    title = object.name;
  }

  if (!title || title === "") {
    title = "No title found";
  }
  return <p className="title">{title}</p>;
};

const RenderGenericItem = (type: string, object: any) => {
  if (!object) {
    return;
  }
  return (
    <p>
      <strong className="label">{type}:</strong>
      <a href={object.resourceURI} target="_blank">
        {object.name}
      </a>
    </p>
  );
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
    getList: (entityType: string, searchText?: string) =>
      dispatch(getList(entityType, searchText) as any),
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
