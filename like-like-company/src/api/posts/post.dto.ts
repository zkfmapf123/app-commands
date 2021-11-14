type PostDto = {
    id :number;
    title :string;
    description :string;
    offset : number;
    limit : number;
    rand : 'recenlty' | 'good';
};

export type PaginationType = {
    id : number;
    title : string;
    description : string;
    created_datetime : string;
    count : number;
};

export type PaginationUnionType = {
    posts : PaginationType[];
    postLimit : number;
    postOffset : number;
};


export type CreatePostDto = Pick<PostDto, 'id' | 'title' | 'description'>;
export type UpdatePostDto = Pick<PostDto, 'id' | 'title' | 'description'>;
export type ReadPostDto = Pick<PostDto, 'offset' | 'limit' | 'rand'>;
export type DeletePostDto = Pick<PostDto, 'id'>;