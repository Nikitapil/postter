import {
  ICreateMessageParams,
  ICreateMessageResponse
} from '~/types/messages-client-types';

export default () => {
  const createMessage = async ({ userToId, text }: ICreateMessageParams) => {
    try {
      const message = await useFetchApi<ICreateMessageResponse>(
        '/api/messages/message',
        {
          method: 'POST',
          body: {
            userToId,
            text
          }
        }
      );
      return message;
    } catch (e: any) {
      const { $toast } = useNuxtApp();
      $toast.error(e?.statusMessage || 'Error on create message');
    }
  };

  return { createMessage };
};
