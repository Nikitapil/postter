import formidable from 'formidable';
import { createPost } from '~/server/services/posts';
import { IPostDto } from '~/server/types/post-types';
import { firstValues } from 'formidable/src/helpers/firstValues.js';
import { handleError } from '~/server/utils/ErrorHandler';

export default defineEventHandler(async (event) => {
  const form = formidable({});

  try {
    const [fields, files] = await form.parse(event.node.req);

    const userId = event.context?.auth?.user?.id as string;

    const { text = '', replyToId = '' } = firstValues(form, fields);
    const filesValues = firstValues(form, files);

    const postData: IPostDto = {
      authorId: userId,
      text,
      mediaFilesUrls: Object.keys(filesValues).map(
        (key) => filesValues[key].filepath
      )
    };

    if (replyToId) {
      postData.replyToId = replyToId;
    }

    const post = await createPost(postData);

    return {
      post
    };
  } catch (e) {
    return handleError(event, e);
  }
});
