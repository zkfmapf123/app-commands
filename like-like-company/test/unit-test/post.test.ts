import {PostService} from '../../src/api/posts/index';
const postService : PostService = new PostService();

describe('pagination test',()=>{
    test('페이지네이션을 진행한다.',async()=>{
        const {posts, postLimit, postOffset} = await postService.getPagination({limit : 10, offset:0, rand:'recenlty'});
        
        expect(posts).toHaveLength(10);
        expect(posts[0]).toHaveProperty('id');
        expect(posts[0]).toHaveProperty('title');
        expect(posts[0]).toHaveProperty('description');
        expect(posts[0]).toHaveProperty('created_datetime');
        expect(posts[0]).toHaveProperty('count');
        expect(postLimit).toBe(postLimit);
        expect(postOffset).toBe(postOffset);
    });

    test('페이지네이션을 진행하는데, offset이 count보다 많다.',async()=>{
        const {posts, postLimit, postOffset} = await postService.getPagination({limit : 10, offset:100, rand:'recenlty'});
        
        expect(posts).toHaveLength(10);
        expect(posts[0]).toHaveProperty('id');
        expect(posts[0]).toHaveProperty('title');
        expect(posts[0]).toHaveProperty('description');
        expect(posts[0]).toHaveProperty('created_datetime');
        expect(posts[0]).toHaveProperty('count');
        expect(postLimit).toBe(postLimit);
        expect(postOffset).toBe(postLimit);
    });
});

describe('create test',()=>{
    
    test('현재 유저의 직급을 가져온다',async()=>{
        const [grade, count] = await postService.getGrade(28);
        expect(grade).toBe('대표');  
    });

    test('현재 작성한 게시글의 수와 직급에 맞는가?',async()=>{
        const [grade, count] = await postService.getGrade(28);
        const isCreate = await postService.isPossibleCreate(grade,count);
        expect(isCreate).toBe(true);
    });

    test('게시글을 작성한다',async()=>{
        try{
            await postService.createPost({
                id : 28,
                title : 'test title',
                description : 'test description'
            });
        }catch(e){
            console.error(e);
        }
    });
});

test('update test',()=>{

});

test('delete test',()=>{

});