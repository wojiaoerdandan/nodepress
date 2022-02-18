export declare const DISQUS_OAUTH_CALLBACK_URL: string;
export declare const COMMENT_POST_ID_EXTEND_KEY = "disqus-post-id";
export declare const COMMENT_THREAD_ID_EXTEND_KEY = "disqus-thread-id";
export declare const COMMENT_AUTHOR_ID_EXTEND_KEY = "disqus-author-id";
export declare const COMMENT_AUTHOR_USERNAME_EXTEND_KEY = "disqus-author-username";
export declare const COMMENT_ANONYMOUS_EXTEND_KEY = "disqus-anonymous";
export declare const ARTICLE_THREAD_ID_EXTEND_KEY = "disqus-thread-id";
export declare const getThreadIdentifierByID: (postID: number) => string;
export declare const getIDByThreadIdentifier: (id: string) => string | 0;
