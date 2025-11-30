// @Injectable()
// export class HelloService {
//   constructor(
//     private readonly diaryModel: ...
//   ) {}

//   method1() {
//     const result = this.diaryModel.~~ // DB가 변경되면 이 코드의 응답 타입도 변경됨

//   }
// }

// @Injectable()
// export class HelloService {

//   constructor(
//     @Inject(DiaryPersistenceV2)
//     private readonly diaryRepository: DiaryRepository,
//   ) {}

//   method1() {
//     const a = this.diaryRepository.findByDiaryId(...);
//   }
// }

// // interface 파일
// export interface DiaryRepository {
//   findByDiaryId(...): {
//     id: string;
//     content: string;
//   } {}
// }

// // model 파일 (mongo)
// @Injectable()
// export class DiaryPersistence implements DiaryRepository {
//   findByDiaryId(...) {

//   }
// }

// @Injectable()
// export class DiaryPersistenceV2 implements DiaryRepository {
//   findByDiaryId(...) {

//   }
// }


// MSA
// 다른팀의 서비스를 호출하는 API
// 회사 외부의 API를 호출해야하는 경우

// 우리팀의 DB
