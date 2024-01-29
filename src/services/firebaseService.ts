import { uploadImagesMessage } from '@/apis/admin/images';
import { db } from '@/configs/firebase';
import { IDetailOrder, IImageDefaultNotification, IMessage, INotification, IPet, IProfile } from '@/configs/interface';
import { ImageType, TypeNotification } from '@/configs/types';
import { links } from '@/datas/links';
import { contants } from '@/utils/contants';
import { generateKeywords } from '@/utils/firebaseUltils';
import { paseDataNotification, stringToUrl } from '@/utils/format';
import Validate from '@/utils/validate';
import { addDoc, doc, serverTimestamp, setDoc, collection, query, where, orderBy, and, or, OrderByDirection, limit, QueryFilterConstraint, getDoc } from 'firebase/firestore';

const setUserInBd = async (user: IProfile) => {
    try {
        await setDoc(
            doc(db, 'users', user.username),
            {
                username: user.username,
                lassSeen: serverTimestamp(),
                avartar: user.avatar || contants.avartarDefault,
                online: true,
                keywords: generateKeywords(user.username),
                displayname: user.displayName || user.username,
            },
            { merge: true }, // just update what is change
        );
    } catch (error) {
        console.log(error);
        console.log('LOGIN: Error setting user info in DB');
    }
};

const setLastseen = async (user: IProfile) => {
    try {
        await setDoc(
            doc(db, 'users', user.username),
            {
                lassSeen: serverTimestamp(),
                online: false,
            },
            { merge: true }, // just update what is change
        );
    } catch (error) {
        console.log('setLastseen: Error setting setLastseen info in DB');
    }
};

const setRead = async (notificationid: string, readArr: string[], newRead: string) => {
    try {
        await setDoc(
            doc(db, 'notifications', notificationid),
            {
                read: [...readArr, newRead],
            },
            { merge: true }, // just update what is change
        );
    } catch (error) {
        console.log('setRead: Error setting setRead info in DB');
    }
};

const setActionGimConversation = async (conversationId: string, gim = true) => {
    try {
        await setDoc(
            doc(db, 'conversations', conversationId),
            {
                gim,
            },
            { merge: true }, // just update what is change
        );
    } catch (error) {
        console.log('setActionGimConversation: Error setting setActionGimConversation info in DB');
    }
};

const setImageDefaultNotification = async (data: IImageDefaultNotification) => {
    try {
        await setDoc(
            doc(db, 'config-image-notification', data.id),
            {
                updatedAt: serverTimestamp(),
                photourl: data.photourl,
            },
            { merge: true }, // just update what is change
        );
    } catch (error) {
        console.log('setActionGimConversation: Error setting setActionGimConversation info in DB');
    }
};

const getNotification = async (notificationId: string) => {
    try {
        const notificationRef = doc(db, 'notifications', notificationId);
        const notificationRefShapshot = await getDoc(notificationRef);

        return notificationRefShapshot;
    } catch (error) {
        console.log('getNotification: Error setting getNotification info in DB');
    }
};

const getConstantNotification = async (notificationId: string) => {
    try {
        const notificationRef = doc(db, 'config-constant-notifications', notificationId);
        const notificationRefShapshot = await getDoc(notificationRef);

        return notificationRefShapshot;
    } catch (error) {
        console.log('getNotification: Error setting getNotification info in DB');
    }
};

const addConversation = async (usernameUser: string) => {
    const response = await addDoc(collection(db, 'conversations'), {
        users: [contants.usernameAdmin, usernameUser],
        newMessage: null,
        sendAt: null,
        gim: false,
        seenMessage: false,
    });

    try {
        await setDoc(
            doc(db, 'users', usernameUser),
            {
                conversationId: response.id,
            },
            { merge: true }, // just update what is change
        );
    } catch (error) {
        console.log('LOGIN: Error setting user info in DB');
    }

    return response;
};

const addNotification = async (data: INotification) => {
    console.log(data.options);
    const options = (() => {
        if (!data.options || !data.options.end || !data.options.start) {
            return {
                start: 0,
                end: 0,
            };
        }

        return data.options;
    })();

    try {
        await addDoc(collection(db, 'notifications'), {
            content: data.content,
            createdAt: serverTimestamp(),
            deleted: false,
            link: Validate.isBlank(data.link as string) ? null : data.link,
            photourl: data.photourl,
            read: [],
            target: data.target.length <= 0 ? ['all'] : data.target,
            title: data.title,
            type: data.type,
            options: options,
            public: true,
        });
    } catch (error) {
        console.log(error);
        console.log('AddNotification: Error setting addNotification info in DB');
    }
};

const addSuccessfulPurchaseNotification = async ({ orderId, photourl, username }: { orderId?: number | string; photourl: string; username: string }) => {
    try {
        const notificationRef = doc(db, 'config-constant-notifications', 'RPk9O04QQMTdMExcHUnK');
        const notificationRefShapshot = await getDoc(notificationRef);

        const constNotification = {
            id: notificationRefShapshot.id,
            ...notificationRefShapshot.data(),
        } as INotification;

        return await addDoc(collection(db, 'notifications'), {
            content: constNotification.content,
            createdAt: serverTimestamp(),
            deleted: false,
            link: orderId ? links.history.orderHistory + `/${orderId}` : links.history.orderHistory,
            photourl: photourl,
            read: [],
            target: [username],
            title: constNotification.title,
            type: constNotification.type,
            options: constNotification.options,
            public: false,
        });
    } catch (error) {
        console.log('addSuccessfulPurchaseNotification: Error setting addSuccessfulPurchaseNotification info in DB');
    }
};

const publistFavoriteNotification = async (pet: IPet, username: string) => {
    try {
        const notificationRef = doc(db, 'config-constant-notifications', 'NwgpAJynez1II8sylmKF');
        const notificationRefShapshot = await getDoc(notificationRef);

        const constNotification = {
            id: notificationRefShapshot.id,
            ...notificationRefShapshot.data(),
        } as INotification;

        return await addDoc(collection(db, 'notifications'), {
            // content: constNotification.content.replaceAll('&&', pet.name),
            content: paseDataNotification<IPet>(constNotification, pet),
            createdAt: serverTimestamp(),
            deleted: false,
            link: links.pet + `${pet.id}/${stringToUrl(pet.name)}`,
            photourl: pet.image,
            read: [],
            target: [username],
            title: constNotification.title,
            type: constNotification.type,
            options: constNotification.options,
            public: false,
        });
    } catch (error) {
        console.log('addSuccessfulPurchaseNotification: Error setting addSuccessfulPurchaseNotification info in DB');
    }
};

const publistStateOrder = async (order: IDetailOrder, username: string) => {
    try {
        const notificationRef = doc(db, 'config-constant-notifications', 'id order notifi');
        const notificationRefShapshot = await getDoc(notificationRef);

        const constNotification = {
            id: notificationRefShapshot.id,
            ...notificationRefShapshot.data(),
        } as INotification;

        return await addDoc(collection(db, 'notifications'), {
            // content: constNotification.content.replaceAll('&&', pet.name),
            content: paseDataNotification<IDetailOrder>(constNotification, order),
            createdAt: serverTimestamp(),
            deleted: false,
            link: links.history.orderHistory + `/${order.id}`,
            photourl: order.products[0].image,
            read: [],
            target: [username],
            title: constNotification.title,
            type: constNotification.type,
            options: constNotification.options,
            public: false,
        });
    } catch (error) {
        console.log('publistStateOrder: Error setting publistStateOrder info in DB');
    }
};

const setNotification = async (data: INotification, collectionName?: string) => {
    const collection = collectionName || 'notifications';

    const meta: INotification['meta'] = {};

    console.log(data.meta);
    if (data.meta) {
        if (data.meta.keys) {
            meta.keys = data.meta.keys;
        }
    }

    console.log(meta);

    try {
        await setDoc(
            doc(db, collection, data.id),
            {
                content: data.content,
                link: Validate.isBlank(data.link as string) ? null : data.link,
                photourl: data.photourl,
                target: data.target.length <= 0 || data.target[0] === 'all' ? ['all'] : data.target,
                title: data.title,
                type: data.type,
                options: data.options,
                meta: {
                    ...meta,
                },
            },
            {
                merge: true,
            },
        );
    } catch (error) {
        console.log(error);
        console.log('AddNotification: Error setting addNotification info in DB');
    }
};
const deleteNotification = async (id: string) => {
    try {
        await setDoc(
            doc(db, 'notifications', id),
            {
                deleted: true,
            },
            {
                merge: true,
            },
        );
    } catch (error) {
        console.log('AddNotification: Error setting addNotification info in DB');
    }
};

const setNewMessageConversation = async (conversationId: string, newMessageId: string) => {
    try {
        await setDoc(
            doc(db, 'conversations', conversationId),
            {
                newMessage: newMessageId,
                sendAt: serverTimestamp(),
                seenMessage: false,
            },
            { merge: true }, // just update what is change
        );
    } catch (error) {
        console.log('setNewMessageConversation: Error setting user info in DB');
    }
};

const setRecallMessage = async (id: string) => {
    try {
        await setDoc(
            doc(db, 'messages', id),
            {
                recall: true,
            },
            { merge: true }, // just update what is change
        );
    } catch (error) {
        console.log('setNewMessageConversation: Error setting user info in DB');
    }
};

const setSeenMessage = async (id: string) => {
    try {
        await setDoc(
            doc(db, 'messages', id),
            {
                seen: true,
            },
            { merge: true }, // just update what is change
        );
    } catch (error) {
        console.log(error);
        console.log('setSeenMessage: Error setting setSeenMessage info in DB');
    }
};

const queryGetConversationForCurrentUser = (usernameUser: string | undefined) => {
    return query(collection(db, 'conversations'), where('users', 'array-contains', usernameUser));
};

const generateQueryGetMessages = (conversationId: string) => {
    return query(collection(db, 'messages'), where('conversationId', '==', conversationId), orderBy('sendAt', 'asc'));
};

// just get conversations have message
const getConversations = (typeSort: OrderByDirection = 'desc') => {
    return query(collection(db, 'conversations'), where('sendAt', '!=', 'null'), orderBy('sendAt', typeSort));
};

const getNotifications = (username: string) => {
    return query(
        collection(db, 'notifications'),
        and(where('deleted', '==', false), or(where('target', 'array-contains', 'all'), where('target', 'array-contains', username))),
        orderBy('createdAt', 'desc'),
    );
};

const getAllNotification = (search?: string, type?: TypeNotification) => {
    const condition: QueryFilterConstraint[] = [];

    if (search && !Validate.isBlank(search)) {
        condition.push(where('title', '==', search));
    }

    if (type) {
        condition.push(where('type', '==', type));
    }

    return query(collection(db, 'notifications'), and(where('deleted', '==', false), where('public', '==', true), or(...condition)));
};

// just get conversations have message and gim

const getUserByUsername = (username: string | null) => {
    if (!username) return;
    return query(collection(db, 'users'), where('username', '==', username));
};

const getUsersByKeywords = (keyword: string) => {
    if (Validate.isBlank(keyword)) return;
    return query(collection(db, 'users'), where('keywords', 'array-contains', keyword), limit(4));
};

const getUsersToAddRecidient = (keyword: string) => {
    if (Validate.isBlank(keyword)) return query(collection(db, 'users'), limit(8));
    return query(collection(db, 'users'), where('keywords', 'array-contains', keyword), limit(4));
};

const getImageDefaultNotification = () => {
    return query(collection(db, 'config-image-notification'));
};

const getAllConstantNotification = () => {
    return query(collection(db, 'config-constant-notifications'));
};

const getMessageWithId = (id: string) => {
    if (!id) return;
    return query(collection(db, `messages`));
};

const handleSendMessage = async (value: string, conversationId: string, username: string, differentData?: { images?: ImageType[] }, type = 'message') => {
    let images: string[] | null = null;

    if (differentData && differentData.images) {
        images = await handleImages(differentData);
    }

    const newMessage = await addDoc(collection(db, 'messages'), {
        conversationId: conversationId,
        currentUser: username,
        message: value,
        sendAt: serverTimestamp(),
        username: contants.usernameAdmin,
        recall: false,
        seen: true,
        images: images,
        type,
    });

    const idNewMessage = newMessage.id;

    await firebaseService.setNewMessageConversation(conversationId, idNewMessage);
};

const handleSendMessageToUser = async (value: string, conversationId: string, username: string, differentData?: { images?: ImageType[]; orderId?: string }, type = 'message') => {
    let images: string[] | null = null;

    if (differentData && differentData.images) {
        images = await handleImages(differentData);
    }

    return await addDoc(collection(db, 'messages'), {
        conversationId: conversationId,
        currentUser: username,
        message: value,
        sendAt: serverTimestamp(),
        username: username,
        recall: false,
        seen: false,
        images: images,
        type: type,
    });
};

const handleSendOrder = async (conversationId: string, username: string, differentData?: { images?: ImageType[]; orderId?: string }, type = 'order') => {
    let images: string[] | null = null;

    if (differentData && differentData.images) {
        images = await handleImages(differentData);
    }

    return await addDoc(collection(db, 'messages'), {
        conversationId: conversationId,
        currentUser: username,
        message: null,
        sendAt: serverTimestamp(),
        username: username,
        recall: false,
        seen: false,
        images: images,
        orderId: differentData?.orderId,
        type: type,
    });
};

const handleSendMap = async (conversationId: string, username: string, data: { address: IMessage['address']; location: IMessage['location'] }, isAdmin = false) => {
    const newMessage = await addDoc(collection(db, 'messages'), {
        conversationId: conversationId,
        currentUser: username,
        message: null,
        sendAt: serverTimestamp(),
        username: isAdmin ? contants.usernameAdmin : username,
        recall: false,
        seen: false,
        images: null,
        orderId: null,
        type: 'map',
        ...data,
    });

    const idNewMessage = newMessage.id;

    await firebaseService.setNewMessageConversation(conversationId, idNewMessage);

    return newMessage;
};

const handleMarkAllAsRead = async (dataNotifications: INotification[], user: IProfile | null) => {
    if (!user) return;

    dataNotifications.forEach(async (item) => {
        if (!item.read.includes(user.username)) {
            await firebaseService.setRead(item.id, item.read, user.username);
        }
    });
};

const handleImages = async (differentData: { images?: ImageType[] }) => {
    let images: string[] | null = null;
    let linksResponse: string[] = [];

    if (differentData?.images && differentData.images.length > 0) {
        const imagesRaw = differentData.images.filter((item) => {
            return item.data;
        });

        if (imagesRaw.length > 0) {
            // call api here

            try {
                const response = await uploadImagesMessage(imagesRaw);

                if (!response.errors && response.data.length > 0) {
                    linksResponse = [...response.data];
                }
            } catch (error) {
                console.log('error in handleImages file firebase service: ', error);
            }
        }

        const imagesLink = differentData.images.filter((item) => {
            return !item.data;
        });

        if (linksResponse.length > 0) {
            images = [...linksResponse];
        }

        const imageLinkAfterMap = imagesLink.map((item) => {
            return item.link;
        });

        if (!images) {
            images = [...imageLinkAfterMap];
        } else {
            images = [...images, ...imageLinkAfterMap];
        }
    }

    return images;
};

const firebaseService = {
    setRead,
    setLastseen,
    setUserInBd,
    handleSendMap,
    setSeenMessage,
    handleSendOrder,
    addNotification,
    addConversation,
    setNotification,
    setRecallMessage,
    publistStateOrder,
    handleSendMessage,
    deleteNotification,
    handleMarkAllAsRead,
    handleSendMessageToUser,
    setActionGimConversation,
    setNewMessageConversation,
    setImageDefaultNotification,
    publistFavoriteNotification,
    addSuccessfulPurchaseNotification,
    querys: {
        getNotification,
        getNotifications,
        getConversations,
        getMessageWithId,
        getUserByUsername,
        getUsersByKeywords,
        getAllNotification,
        getUsersToAddRecidient,
        getConstantNotification,
        generateQueryGetMessages,
        getAllConstantNotification,
        getImageDefaultNotification,
        queryGetConversationForCurrentUser,
    },
};

export default firebaseService;
