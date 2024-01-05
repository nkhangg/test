import { uploadImagesMessage } from '@/apis/admin/images';
import { db } from '@/configs/firebase';
import { IProfile } from '@/configs/interface';
import { ImageType } from '@/configs/types';
import { contants } from '@/utils/contants';
import { generateKeywords } from '@/utils/firebaseUltils';
import Validate from '@/utils/validate';
import { addDoc, doc, serverTimestamp, setDoc, collection, query, where, orderBy, and, or, OrderByDirection, limit } from 'firebase/firestore';

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

// just get conversations have message and gim

const getUserByUsername = (username: string | null) => {
    if (!username) return;
    return query(collection(db, 'users'), where('username', '==', username));
};

const getUsersByKeywords = (keyword: string) => {
    if (Validate.isBlank(keyword)) return;
    return query(collection(db, 'users'), where('keywords', 'array-contains', keyword), limit(4));
};

const getMessageWithId = (id: string) => {
    if (!id) return;
    return query(collection(db, `messages`));
};

const handleSendMessage = async (value: string, conversationId: string, username: string, differentData?: { images?: ImageType[] }) => {
    let images: string[] | null = null;

    if (differentData) {
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
    });

    const idNewMessage = newMessage.id;

    await firebaseService.setNewMessageConversation(conversationId, idNewMessage);
};

const handleSendMessageToUser = async (value: string, conversationId: string, username: string, differentData?: { images?: ImageType[] }) => {
    let images: string[] | null = null;

    if (differentData) {
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
    setLastseen,
    setUserInBd,
    setSeenMessage,
    addConversation,
    setRecallMessage,
    handleSendMessage,
    handleSendMessageToUser,
    setActionGimConversation,
    setNewMessageConversation,
    querys: {
        getConversations,
        getMessageWithId,
        getUserByUsername,
        getUsersByKeywords,
        generateQueryGetMessages,
        queryGetConversationForCurrentUser,
    },
};

export default firebaseService;
