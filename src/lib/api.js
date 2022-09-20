const FIREBASE_DOMAIN = `https://react-router-cc236-default-rtdb.firebaseio.com/`;

export const addComment = async (requestData) => {
    const response = await fetch(`${FIREBASE_DOMAIN}comments/${requestData.postId}.json`, {
        method: 'POST',
        body: JSON.stringify(requestData.commentData),
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'could not add comment !')
    }

    return {
        commentId: data.name
    };
}

export const getAllComments = async (postId) => {
    const response = await fetch(`${FIREBASE_DOMAIN}comments/${postId}.json`);
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message ?? 'Something went wrong!')
    }
    let loadedData = [];

    for (const key in data) {
        const commentObj = {
            id: key,
            ...data[key]
        }
        loadedData.push(commentObj)
    }
    return loadedData
}