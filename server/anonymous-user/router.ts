import type { NextFunction, Request, Response } from 'express';
import express from 'express';
import AnonymousUserCollection from './collection';
import UserCollection from '../user/collection';
import * as userValidator from '../user/middleware';
import * as anonymousModeValidator from '../anonymous-fritter-mode/middleware';
import * as util from './util';

const router = express.Router();

/**
 * Get the associated anonymous user from public user
 *
 * @name GET /api/anonymousUsers/username
 *
 * @return {AnonymousUserResponse} - the associated anonymous user from public user
 * @throws {403} - if the user is not logged in
 * @throws {400} - if username is not given
 * @throws {404} - if username is not a recognized username of any public user
 */
router.get(
    '/:username',
    [
        userValidator.isUserLoggedIn,
        anonymousModeValidator.isAuthorExists
    ],
    async (req: Request, res: Response) => {
        const publicUser = await UserCollection.findOneByUsername(req.params.username as string);
        const anonymousUser = await AnonymousUserCollection.findOneByPublicUserId(publicUser._id);
        res.status(200).json({
            message: 'You have sucessfully found the assocated anonymous user!',
            anonymousUser: util.constructAnonymousUserResponse(anonymousUser)
        });
    }
);

export { router as anonymousUserRouter }