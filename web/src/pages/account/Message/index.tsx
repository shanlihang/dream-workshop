import ChatCard from '@/components/ChatCard';
import { SearchOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { Flex, Input } from 'antd';
import React from 'react';

const Message: React.FC = () => {
  return (
    <ProCard style={{ height: '100%' }} split="vertical">
      <Flex
        vertical
        style={{
          width: '300px',
          height: '100%',
          overflowY: 'auto',
          borderRight: '1px solid #f0f0f0',
        }}
      >
        <Flex
          style={{
            padding: '12.5px 16px',
            borderBottom: '1px solid #f0f0f0',
          }}
        >
          <Input placeholder="搜索" prefix={<SearchOutlined />} />
        </Flex>

        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map((item, index) => (
          <ChatCard key={index}></ChatCard>
        ))}
      </Flex>
      <ProCard title="Fix" headerBordered>
        右侧内容
      </ProCard>
    </ProCard>
  );
};

export default Message;
