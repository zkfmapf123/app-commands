import {AuthService} from '../../src/api/index';

const authService = new AuthService();  

describe('로그인 테스트',()=>{
    test('이메일을 이용하여 정보를 가져온다',()=>{
                
    });
    
    test('두개의 비밀번호를 비교한다. 맞음',()=>{
    
    });
    
    test('두개의 비밀번호를 비교한다. 맞지 않는다',()=>{
    
    });
});

describe('회원가입 테스트',()=>{
    test('해당 이메일은 사용가능하다',async()=>{
        const isPossibleEmail = await authService.isUniqueEmail('asdf@naver.com');
        expect(isPossibleEmail).toBeTruthy();
    });

    test('해당 이메일은 사용 불가능하다',async()=>{
        const isPossibleEmail = await authService.isUniqueEmail('zkfmapf123@naver.com');
        expect(isPossibleEmail).toBeFalsy();
    });

    test('해당 닉네임은 사용가능하다',async()=>{
        const isPossibleName = await authService.isUniqueName('이동규스');
        expect(isPossibleName).toBeTruthy();
    });

    test('해당 닉네임은 사용 불가능 하다',async()=>{
        const isPossibleName = await authService.isUniqueName('이동규');
        expect(isPossibleName).toBeFalsy();
    });

    test('비밀번호를 암호화 한다',async()=>{
        const password = '123';
        const hashingPassword= await authService.getCryptoPassword(password);
        expect(hashingPassword).not.toBeUndefined();
    });
})



