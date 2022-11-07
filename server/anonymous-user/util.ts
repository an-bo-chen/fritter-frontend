import type { HydratedDocument } from 'mongoose';
import moment from 'moment';
import type { AnonymousUser } from './model';

type AnonymousUserResponse = {
    _id: string;
    dateJoined: string;
};

/**
 * Encode a date as an unambiguous string
 *
 * @param {Date} date - A date object
 * @returns {string} - formatted date as string
 */
const formatDate = (date: Date): string => moment(date).format('MMMM Do YYYY, h:mm:ss a');

/**
 * Transform a raw User object from the database into an object
 * with all the information needed by the frontend
 * (in this case, removing the password for security)
 *
 * @param {HydratedDocument<AnonymousUser>} anonymousUser - An anonymous user object
 * @returns {AnonymousUserResponse} - The anonymous user object without the public user
 */
const constructAnonymousUserResponse = (anonymousUser: HydratedDocument<AnonymousUser>): AnonymousUserResponse => {
    const anonymousUserCopy: AnonymousUser = {
        ...anonymousUser.toObject({
            versionKey: false // Cosmetics; prevents returning of __v property
        })
    };
    delete anonymousUserCopy.publicUserId;
    return {
        ...anonymousUserCopy,
        _id: anonymousUserCopy._id.toString(),
        dateJoined: formatDate(anonymousUser.dateJoined)
    };
};

export {
    constructAnonymousUserResponse
};
