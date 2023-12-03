import { Button, Flex } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';

import { FormInput } from '@app/components';

import styles from '../Forum.module.css';

type TopicType = {
  title: string;
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
      title: topicName,
    });
  };

  const onChange = (e: ChangeEvent) => {
    const element = e.target as HTMLInputElement;
    setFormState((previousState) => ({
      ...previousState,
      topicName: element.value,
    }));
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
