import { useMany, useNavigation } from "@refinedev/core";

import {
  List,
  TextField,
  useTable,
  EditButton,
  ShowButton,
  CreateButton,
} from "@refinedev/antd";

import { Table, Space, Button } from "antd";

import { IPost, ICategory } from "../../interfaces";

export const PostList = () => {
  const { tableProps } = useTable<IPost>();
  const { push } = useNavigation();

  const categoryIds =
    tableProps?.dataSource?.map((item) => item.category.id) ?? [];
  const { data, isLoading } = useMany<ICategory>({
    resource: "categories",
    ids: categoryIds,
    queryOptions: {
      enabled: categoryIds.length > 0,
    },
  });

  return (
    <List
      headerProps={{
        extra: (
          <Space>
            <Button onClick={() => push("/authenticated-page")}>
              Review Posts
            </Button>
            <CreateButton />
          </Space>
        ),
      }}
    >
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column dataIndex="status" title="Status" />
        <Table.Column
          dataIndex={["category", "id"]}
          title="Category"
          render={(value) => {
            if (isLoading) {
              return <TextField value="Loading..." />;
            }

            return (
              <TextField
                value={data?.data.find((item) => item.id === value)?.title}
              />
            );
          }}
        />
        <Table.Column<IPost>
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
