// import supertest from 'supertest';
// import request from 'supertest';

// describe('jsonwebtoken http test', () => {

//     it('기간만료', (done) => {
//         supertest('http://localhost:4000/api').post('/auth/another')
//             .send({
//                 data: {
//                     token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImVtYWlsIjoiemtmbWFwZjEyM0BuYXZlci5jb20iLCJuYW1lIjoi7J2064-Z6recIiwiaWF0IjoxNjM2NDY5NzMyLCJleHAiOjE2MzY0Njk3NDIsImlzcyI6Imxpa2UtbGlrZS1jb21wYW55In0.Z6wPLx2lfnaQzUTYvySi0Q-0dYw34Y21eXNSCLqg0mI"
//                 }
//             })
//             .end((err, res) => {
//                 expect(res.status).toBe(401);
//                 done();
//             });
//     });

//     it('유효성검증 실패', (done) => {
//         supertest('http://localhost:4000/api').post('/auth/another')
//             .send({
//                 data: {
//                     token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImVtYWlsIjoiemtmbWFwZjEyM0BuYXZlci5jb20iLCJuYW1lIjoi7J2064-Z6recIiwiaWF0IjoxNjM2NDY5NzMyLCJleHAiOjE2MzY0Njk3NDIsImlzcyI6Imxpa2UtbGlrZS1jb21wYW55In0.Z6wPLx2lfnaQzUTYvySi0Q-0dYw34Y21eXNSCLqg0asdfmI"
//                 }
//             })
//             .end((err, res) => {
//                 expect(res.status).toBe(401);
//                 done();
//             })
//     });

//     it('토큰이 없으나, 다른 url 접근', (done) => {
//         supertest('http://localhost:4000/api').post('/anotherurl')
//             .send({
//                 data: {
//                     token: ''
//                 }
//             })
//             .end((err, res) => {
//                 expect(res.body.status).toBe(401);
//                 expect(res.body.message).toBe('허가되지 않은 유저입니다');
//                 done();
//             })
//     });

// });

// describe('login http test', () => {

//     it('이메일이 유효하지 않는다', (done) => {
//         supertest('http://localhost:4000/api').post('/auth/login')
//             .send({
//                 data: {
//                     email: 'asdf'
//                 }
//             })
//             .end((err, res) => {
//                 expect(res.status).toBe(202);
//                 expect(res.body.message).toBe('이메일이 유효하지 않습니다');
//                 done();
//             })
//     });

//     it('비밀번호가 맞지 않는다', (done) => {
//         supertest('http://localhost:4000/api').post('/auth/login')
//             .send({
//                 data: {
//                     email: 'zkfmapf123@naver.com',
//                     password: '123'
//                 }
//             })
//             .end((err, res) => {
//                 expect(res.status).toBe(202);
//                 expect(res.body.message).toBe('비밀번호가 맞지 않습니다');
//                 done();
//             })
//     });

//     it('로그인 성공 token 발급', (done) => {
//         supertest('http://localhost:4000/api').post('/auth/login')
//             .send({
//                 data: {
//                     email: 'zkfmapf123@naver.com',
//                     password: '1234'
//                 }
//             })
//             .end((err, res) => {
//                 expect(res.status).toBe(200);
//                 expect(res.body.token).not.toBeNull();
//                 done();
//             })
//     });
// });

// // test 겹쳐서 보류
// describe('join http test', () => {

// });
