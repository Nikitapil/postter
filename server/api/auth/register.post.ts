import { sendError } from 'h3';
import { createUser } from '~/server/database/users';
import { userTransformer } from '~/server/transformers/user';
import formidable from 'formidable';
import { firstValues } from 'formidable/src/helpers/firstValues.js';
import { imageToBase64 } from '~/server/utils/images';
import { handleError } from '~/server/utils/ErrorHandler';
import { ApiError } from '~/server/utils/ApiError';

export default defineEventHandler(async (event) => {
  const form = formidable();
  try {
    const [fields, files] = await form.parse(event.node.req);

    const { username, email, password, repeatPassword, name } = firstValues(
      form,
      fields
    );

    // TODO validation
    if (!username || !email || !password || !repeatPassword || !name) {
      return sendError(
        event,
        createError({ statusCode: 400, statusMessage: 'Invalid Params' })
      );
    }

    if (password !== repeatPassword) {
      throw ApiError.BadRequest('Passwords are not equal');
    }

    const { profileImage } = firstValues(form, files);

    const userData = {
      username,
      email,
      password,
      name,
      profileImage: profileImage ? imageToBase64(profileImage.filepath) : ''
    };

    console.log(userData);

    const user = await createUser(userData);

    //TODO set cookie here and implement this on frontend

    return userTransformer(user);
  } catch (e) {
    return handleError(event, e);
  }
});
