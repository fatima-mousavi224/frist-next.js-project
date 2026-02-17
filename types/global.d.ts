interface Tag {
    _id: string;
    name: string;
}

interface Author {
    _id: string;
    name: string;
    image?: string;
}

interface Question {
    question?: string;
    _id: string;
    title: string;
    tags: Tag[];
    author: Author;
    createdAt: Date;
    upvotes: number;
    answers: number;
    views: number;
}