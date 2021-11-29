import * as validateTokenRepository from '../repositories/validateTokenRepository.js';

export default async function validateToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(400).send('Missing token');

  try {
    const user = await validateTokenRepository.fetchToken(token);
    if (!user) return res.sendStatus(401);

    res.locals.userId = user.user_id;
    next();
  } catch (err) {
    res.sendStatus(500);
  }
}
