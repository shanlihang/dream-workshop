import { Avatar, Badge, Flex, Typography } from 'antd';
import { useState } from 'react';

interface ChatCardProps {
  unread_num?: number;
}

const { Text } = Typography;

const ChatCard: React.FC<ChatCardProps> = (props) => {
  const { unread_num = 0 } = props;
  const [mouseEnterChatCard, setMouseEnterChatCard] = useState<boolean>(false);

  return (
    <Flex
      align="center"
      gap={10}
      style={{
        width: '100%',
        height: '60px',
        padding: '0 12px',
        cursor: 'pointer',
        backgroundColor: mouseEnterChatCard ? '#f0f2f5' : 'white',
      }}
      onMouseEnter={() => setMouseEnterChatCard(true)}
      onMouseLeave={() => setMouseEnterChatCard(false)}
    >
      <Badge count={unread_num} size="small">
        <Avatar size={40}>USER</Avatar>
      </Badge>

      <Flex vertical style={{ flex: 1, overflow: 'hidden' }}>
        <Text strong>123</Text>
        <Text type="secondary" ellipsis style={{ width: '100%' }}>
          uniform the user interface specs for internal background projects, lower the unnecessary cost of design differences and implementation and liberate the resources of design and front-end
          development
        </Text>
      </Flex>
    </Flex>
  );
};
export default ChatCard;
