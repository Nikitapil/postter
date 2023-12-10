import { createUser } from '~/server/services/users';
import formidable from 'formidable';
import { firstValues } from 'formidable/src/helpers/firstValues.js';
import { imageToBase64 } from '~/server/utils/images';
import { handleError } from '~/server/utils/ErrorHandler';
import { setRefreshTokenCookie } from '~/server/utils/cookies';

export default defineEventHandler(async (event) => {
  const form = formidable();
  try {
    const [fields, files] = await form.parse(event.node.req);

    const {
      username,
      email,
      password,
      repeatPassword,
      name,
      about = ''
    } = firstValues(form, fields);

    const { profileImage } = firstValues(form, files);

    const userData = {
      username,
      email,
      password,
      name,
      repeatPassword,
      about,
      profileImage: profileImage ? imageToBase64(profileImage.filepath) : ''
    };

    const { accessToken, refreshToken, user } = await createUser(userData);

    setRefreshTokenCookie(event, refreshToken);

    return { accessToken, user };
  } catch (e) {
    return handleError(event, e);
  }
});
