import { Button, Flex } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';

import { FormInput, FormTextArea } from '@app/components';

import styles from '../Forum.module.css';

type TopicType = {
  id: number | string /* пока что добавляю string для создания топика */;
  name: string;
  creationDate: Date | string;
  commentsCount: number;
};

type CreateTopicProperties = {
  onClose: () => void;
  onConfirm: (data: TopicType) => void;
};

export function CreateTopic({ onConfirm, onClose }: CreateTopicProperties) {
  const [formState, setFormState] = useState({ topicName: '', topicDescription: '' });

  const onConfirmWithData = () => {
    const { topicName } = formState;
    onConfirm({
      id: topicName,
      name: topicName,
      creationDate: new Date().toISOString(),
      commentsCount: 0,
    });
  };

  const onChange = (e: ChangeEvent) => {
    const element = e.target as HTMLInputElement;
    if (element.name === 'topic-name') {
      setFormState((previousState) => ({
        ...previousState,
        topicName: element.value,
      }));
    } else if (element.name === 'topic-description') {
      setFormState((previousState) => ({
        ...previousState,
        topicDescription: element.value,
      }));
    }
  };

  return (
    <>
      <FormInput
        name="topic-name"
        placeholder="Enter topic name"
        isInvalid={false}
        onChange={onChange}
        mb={5}
      />
      <FormTextArea
        name="topic-description"
        placeholder="Enter topic description"
        isInvalid={false}
        height="150px"
        value={formState.topicDescription}
        onChange={onChange}
      />
      <Flex mt={20} mb={10} className={styles.modal_footer}>
        <Button onClick={onConfirmWithData} colorScheme="whatsapp">
          Create
        </Button>
        <Button onClick={onClose} colorScheme="gray" variant="outline">
          Cancel
        </Button>
      </Flex>
    </>
  );
}
