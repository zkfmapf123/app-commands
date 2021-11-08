import { gradeType } from "../../api/auths/index";

export const RankMap = new Map<gradeType,number>();

RankMap.set('인턴',1);
RankMap.set('수습',4);
RankMap.set('사원',8);
RankMap.set('주임',13);
RankMap.set('대리',30);
RankMap.set('과장',55);
RankMap.set('차장',100);
RankMap.set('부장',150);
RankMap.set('이사',1300);
RankMap.set('대표',1000);

