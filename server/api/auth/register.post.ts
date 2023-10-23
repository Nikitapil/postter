import { createUser } from '~/server/database/users';
import formidable from 'formidable';
import { firstValues } from 'formidable/src/helpers/firstValues.js';
import { imageToBase64 } from '~/server/utils/images';
import { handleError } from '~/server/utils/ErrorHandler';

export default defineEventHandler(async (event) => {
  const form = formidable();
  try {
    const [fields, files] = await form.parse(event.node.req);

    const { username, email, password, repeatPassword, name } = firstValues(
      form,
      fields
    );

    const { profileImage } = firstValues(form, files);

    const userData = {
      username,
      email,
      password,
      name,
      repeatPassword,
      profileImage: profileImage ? imageToBase64(profileImage.filepath) : ''
    };

    const user = await createUser(userData);

    //TODO set cookie here and implement this on frontend

    return user;
  } catch (e) {
    console.log(e);
    return handleError(event, e);
  }
});
