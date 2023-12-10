import formidable from 'formidable';
import { firstValues } from 'formidable/src/helpers/firstValues.js';
import { IEditPostParams } from '~/server/types/post-types';
import { editPost } from '~/server/services/posts';
import { handleError } from '~/server/utils/ErrorHandler';
import { getUserIdFromContext } from '~/server/utils/context';

export default defineEventHandler(async (event) => {
  const form = formidable({});

  try {
    const [fields, files] = await form.parse(event.node.req);

    const userId = getUserIdFromContext(event);

    const { text = '', postId = '' } = firstValues(form, fields);
    const filesValues = firstValues(form, files);

    const postData: IEditPostParams = {
      userId,
      postId,
      text,
      mediaFilesUrls: Object.keys(filesValues).map(
        (key) => filesValues[key].filepath
      )
    };

    const post = await editPost(postData);

    return {
      post
    };
  } catch (e) {
    return handleError(event, e);
  }
});
