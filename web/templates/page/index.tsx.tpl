{% raw %}
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { request } from '@umijs/max';
import { Button, Flex, Form, Input, message, Modal, Space, Tag, Typography } from 'antd';
import React, { useRef, useState } from 'react';

const { Text } = Typography;
const { confirm } = Modal;

type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

const columns: ProColumns<GithubIssueItem>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'index',
    width: 50,
    align: 'center',
  },
  {
    title: '标题',
    dataIndex: 'title',
    copyable: true,
    ellipsis: true,
    tooltip: '标题过长会自动收缩',
    align: 'center',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    disable: true,
    title: '状态',
    align: 'center',
    dataIndex: 'state',
    filters: true,
    onFilter: true,
    ellipsis: true,
    valueType: 'select',
    valueEnum: {
      all: { text: '超长'.repeat(50) },
      open: {
        text: '未解决',
        status: 'Error',
      },
      closed: {
        text: '已解决',
        status: 'Success',
        disabled: true,
      },
      processing: {
        text: '解决中',
        status: 'Processing',
      },
    },
  },
  {
    disable: true,
    title: '标签',
    dataIndex: 'labels',
    search: false,
    renderFormItem: (_, { defaultRender }) => {
      return defaultRender(_);
    },
    render: (_, record) => (
      <Space>
        {record.labels.map(({ name, color }) => (
          <Tag color={color} key={`${record.id}-${name}`}>
            {name}
          </Tag>
        ))}
      </Space>
    ),
  },
  {
    title: '创建时间',
    align: 'center',
    key: 'showTime',
    dataIndex: 'created_at',
    valueType: 'date',
    sorter: true,
    hideInSearch: true,
  },
  {
    title: '创建时间',
    align: 'center',
    dataIndex: 'created_at',
    valueType: 'dateRange',
    hideInTable: true,
    search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1],
        };
      },
    },
  },
  {
    title: '操作',
    align: 'center',
    valueType: 'option',
    key: 'option',
    render: (_text, record, _, _action) => [
      <Flex key={record.id} justify="center" style={{ width: '100%' }}>
        <Button color="primary" variant="text">
          详情
        </Button>
      </Flex>,
    ],
  },
];

const User: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [selected, setSelected] = useState<GithubIssueItem[]>([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<GithubIssueItem | null>(null);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  // 处理表单提交
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (currentRecord) {
        await request(`/api/issues/${currentRecord.id}`, { method: 'PUT', data: values });
        messageApi.open({
          type: 'success',
          content: '修改成功',
        });
      } else {
        await request('/api/issues', { method: 'POST', data: values });
        messageApi.open({
          type: 'success',
          content: '新增成功',
        });
      }
      setModalVisible(false);
      actionRef.current?.reload(); // 刷新表格
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: '操作失败',
      });
    }
  };

  // 处理新增
  const handleAdd = () => {
    setCurrentRecord(null);
    form.resetFields();
    setModalVisible(true);
  };

  // 处理编辑
  const handleEdit = (record: GithubIssueItem) => {
    setCurrentRecord(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  // 处理删除
  const handleDelete = () => {
    confirm({
      title: '删除提示',
      content: (
        <>
          <Text>
            已选中
            <Text strong type="danger" style={{ margin: '0 6px', fontSize: 'large' }}>
              {selected.length}
            </Text>
            项，确认要将其删除吗？
          </Text>
        </>
      ),
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
    });
  };

  return (
    <PageContainer ghost>
      {contextHolder}
      <ProTable<GithubIssueItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params, sort, filter) => {
          return request<{
            data: GithubIssueItem[];
          }>('https://proapi.azurewebsites.net/github/issues', {
            params,
          });
        }}
        rowKey={(record) => record.id.toString()}
        rowSelection={{
          selectedRowKeys: selected.map((item) => item.id.toString()),
          onSelect: (record, selectedState) => {
            if (selectedState) {
              setSelected((prev) => [...prev, record]);
            } else {
              setSelected((prev) => prev.filter((item) => item.id !== record.id));
            }
          },
          onSelectAll: (selectedState, _selectedRows, changeRows) => {
            if (selectedState) {
              setSelected((prev) => [...prev, ...changeRows]);
            } else {
              setSelected((prev) => prev.filter((item) => !changeRows.some((row) => row.id === item.id)));
            }
          },
        }}
        tableAlertRender={false}
        tableAlertOptionRender={false}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          defaultValue: {
            option: { fixed: 'right', disable: true },
          },
        }}
        options={{
          density: true,
          fullScreen: true,
          reload: true,
          setting: {
            draggable: true,
            checkable: true,
            showListItemOption: false,
            checkedReset: true,
          },
        }}
        form={{
          colon: true,
          syncToUrl: true,
        }}
        pagination={{
          ...pagination,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ['10', '20', '50', '100'],
          showTotal: (total) => `共 ${total} 条`,
          onChange: (page, pageSize) => {
            setPagination((prev) => ({
              ...prev,
              current: page,
              pageSize,
            }));
          },
        }}
        dateFormatter="string"
        headerTitle={
          <Space>
            <Button color="primary" variant="filled" icon={<PlusOutlined />} onClick={handleAdd}>
              新增
            </Button>
            <Button
              color="primary"
              variant="filled"
              disabled={selected.length !== 1}
              icon={<EditOutlined />}
              onClick={() => {
                handleEdit(selected[0]);
              }}
            >
              修改
            </Button>
            <Button color="danger" variant="filled" disabled={selected.length === 0} icon={<DeleteOutlined />} onClick={handleDelete}>
              删除
            </Button>
            {selected && selected.length !== 0 && (
              <Text type="secondary">
                已选中
                <Text code type="danger">
                  {selected.length}
                </Text>
                项
              </Text>
            )}
          </Space>
        }
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary">
            更多操作
          </Button>,
        ]}
      />
      <Modal title={currentRecord ? '修改记录' : '新增记录'} open={modalVisible} onCancel={() => setModalVisible(false)} onOk={handleSubmit}>
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="标题" rules={[{ required: true, message: '请输入标题' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="state" label="状态" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default User;
{% endraw %}