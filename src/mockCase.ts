import axios from "axios";

interface Comment{
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

async function fetchComments() {
    const response = await axios.get<Comment[]>('https://jsonplaceholder.typicode.com/comments');
    const comments = response.data;

    const countByPosts: Record<number, number> = {};

    for (const comment of comments) {
        const postId = comment.postId;
        countByPosts[postId] = (countByPosts[postId] || 0) + 1;
    }
    // Should show different counts for different postIds
    const sorted = Object.entries(countByPosts)
        .map(([postId,count])=>({postId:Number(postId),count}))
        .sort((a,b)=>b.count-a.count)
        .slice(0,5);
    for(const entry of sorted) {
        console.log(`Post [${entry.postId}] ${entry.count} comments`);
    }
}


fetchComments();