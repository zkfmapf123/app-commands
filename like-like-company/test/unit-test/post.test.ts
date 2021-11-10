import {PostService} from '../../src/api/posts/index';
const postService : PostService = new PostService();

describe('pagination test',()=>{

    test('pagination 0 ~ 10',async()=>{

    });

    test('pagination end-1 ~ 10',async()=>{

    });
});

describe('create test',()=>{
    
    test('현재 유저의 직급을 가져온다',async()=>{
        const [grade, count] = await postService.getGrade(28);
        expect(grade).toBe('대표');
        expect(count).toBe(26);  
    });

    test('현재 작성한 게시글의 수와 직급에 맞는가?',async()=>{
        const [grade, count] = await postService.getGrade(28);
        const isCreate = await postService.isPossibleCreate(grade,count);
        expect(isCreate).toBe(true);
    });

    test('게시글을 작성한다',async()=>{
    
    });
});

test('update test',()=>{

});

test('delete test',()=>{

});