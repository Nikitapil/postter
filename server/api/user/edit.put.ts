import { handleError } from '~/server/utils/ErrorHandler';
import { firstValues } from 'formidable/src/helpers/firstValues.js';
import { imageToBase64 } from '~/server/utils/images';
import formidable from 'formidable';
import { editUser } from '~/server/services/users';
import { getUserIdFromContext } from '~/server/utils/context';

export default defineEventHandler(async (event) => {
  try {
    const userId = getUserIdFromContext(event);
    const form = formidable();
    const [fields, files] = await form.parse(event.node.req);

    const { username, email, name, about = '' } = firstValues(form, fields);

    const { profileImage } = firstValues(form, files);

    const userData = {
      userId,
      username,
      email,
      name,
      about,
      profileImage: profileImage ? imageToBase64(profileImage.filepath) : ''
    };

    const user = await editUser(userData);
    return { user };
  } catch (e) {
    return handleError(event, e);
  }
});
